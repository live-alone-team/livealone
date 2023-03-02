package live.alone.soleplay.service;

import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.*;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.repository.MemberRepository;
import live.alone.soleplay.repository.PollRepository;
import live.alone.soleplay.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;
    private final VoteRepository voteRepository;
    private final MemberRepository memberRepository;

    public PollRequest createPollAndChoice(PollRequest pollRequest, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        LocalDateTime expirationDate = LocalDateTime.now()
                .plusDays(pollRequest.getDay())
                .plusHours(pollRequest.getHour())
                .plusMinutes(pollRequest.getMinute());
        List<ChoiceRequest> choiceRequests = pollRequest.getChoices();
        List<Choice> choices = new ArrayList<>();
        Poll poll = new Poll(member, pollRequest.getTitle(), pollRequest.getDescription(), expirationDate, 1);


        for (ChoiceRequest choiceRequest : choiceRequests) {
            Choice choice = new Choice(choiceRequest.getContent());
            choices.add(choice);
            choice.setPoll(poll);
        }

        poll.setChoices(choices);
        pollRepository.save(poll);
        pollRequest.setPollId(poll.getId());
        pollRequest.setMemberId(member.getId());
        return pollRequest;
    }

    @Transactional(readOnly = true)
    public List<PollListResponse> findAllPolls() {
        return pollRepository.findAll().stream()
                .map(PollListResponse::new)
                .collect(Collectors.toList());
    }

    public List<ProfileListResponse> findPollsBy(Long id) {
        return pollRepository.findAllBy(id).stream()
                .map(ProfileListResponse::new)
                .collect(Collectors.toList());
    }

    public PollResponse castVoteAndGetUpdatedPoll(Long pollId, VoteRequest voteRequest, Long memberId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)
        );

        if (poll.getExpirationDate().isBefore(LocalDateTime.now()))
            throw new CustomException(ErrorCode.EXPIRED_DATE);

        Member member = memberRepository.getOne(memberId);
        Choice selectedChoice = poll.getChoices().stream()
                .filter(choice -> choice.getId().equals(voteRequest.getChoiceId()))
                .findFirst()
                .orElseThrow();

        Vote vote = new Vote();
        vote.setChoice(selectedChoice);
        vote.setMember(member);
        vote.setPoll(poll);

        voteRepository.save(vote);

        // 여기서부터 투표 결과 반환

        List<ChoiceVoteCount> voteCounts = voteRepository.countByPollIdGroupByChoiceId(pollId);

        Map<Long, Long> choiceVoteMap = voteCounts.stream()
                .collect(Collectors.toMap(ChoiceVoteCount::getChoiceId, ChoiceVoteCount::getVoteCount));

        PollResponse pollResponse = new PollResponse();
        pollResponse.setPollId(poll.getId());
        pollResponse.setProfileImage(poll.getMember().getImage());
        pollResponse.setTitle(poll.getTitle());
        pollResponse.setDescription(poll.getDescription());
        pollResponse.setNickname(poll.getMember().getNickname());

        int min, hour, day;
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String end = poll.getExpirationDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            Date today = dateFormat.parse(now);
            Date d2 = dateFormat.parse(end);
            min = (int) (((d2.getTime() - today.getTime()) / 60000) % 60);
            hour = (int) ((d2.getTime() - today.getTime()) / 3600000) % 24;
            day = (int) (((d2.getTime() - today.getTime()) / 1000) / (24 * 60 * 60)) & 365;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String expiration = "";
        if (min == 0) {
            if (hour == 0 && day > 0)
                expiration = day + "일 남음";
            else if (hour > 0 && day == 0)
                expiration = hour + "시간 남음";
            else
                expiration = day + "일 " + hour + "시간 남음";
        }
        else if (hour == 0) {
            if (min == 0 && day > 0)
                expiration = day + "일 남음";
            else if (min > 0 && day == 0)
                expiration = min + "분 남음";
            else
                expiration = day + "일 " + min + "분 남음";
        }
        else if (day == 0) {
            if (min == 0 && hour > 0)
                expiration = hour + "시간 남음";
            else if (min > 0 && hour == 0)
                expiration = min + "분 남음";
            else
                expiration = hour + "시간 " + min + "분 남음";
        }
        else
            expiration = day + "일 " + hour + "시간 " + min + "분 남음";

        String createdDate = poll.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        pollResponse.setExpirationDate(expiration);
        pollResponse.setCreatedDate(createdDate);
        pollResponse.setExpired(poll.getExpirationDate().isBefore(LocalDateTime.now()));

        List<ChoiceResponse> choiceResponses = poll.getChoices().stream().map(choice -> {
            ChoiceResponse choiceResponse = new ChoiceResponse();
            choiceResponse.setId(choice.getId());
            choiceResponse.setContent(choice.getContent());

            if (choiceVoteMap.containsKey(choice.getId())) {
                choiceResponse.setVoteCount(choiceVoteMap.get(choice.getId()));
            } else {
                choiceResponse.setVoteCount(0);
            }
            return choiceResponse;
        }).collect(Collectors.toList());

        pollResponse.setChoices(choiceResponses);

        if (vote.getChoice().getId() != null)
            pollResponse.setSelectedChoice(vote.getChoice().getId());

        long totalVotes = pollResponse.getChoices().stream().mapToLong(ChoiceResponse::getVoteCount).sum();
        pollResponse.setTotalVotes(totalVotes);

        return pollResponse;
    }

    @Transactional
    public void deletePoll(Long pollId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(
                        () -> new CustomException(ErrorCode.NOT_FOUND_POLL));
        pollRepository.delete(poll);
    }

    // 날짜 수정 아직 안됨
    public Poll updatePoll(PollRequest pollRequest, Long pollId, Long memberId) {
        Optional<Poll> poll = pollRepository.findById(pollId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        if (member.getId() != poll.get().getMember().getId())
            throw new CustomException(ErrorCode.INVALID_USER);

        if (poll.isEmpty())
            throw new CustomException(ErrorCode.NOT_FOUND_POLL);

        Poll updatedPoll = poll.get();

        if (pollRequest.getTitle() != null)
            updatedPoll.setTitle(pollRequest.getTitle());
        else if (pollRequest.getDescription() != null)
            updatedPoll.setDescription(pollRequest.getDescription());

        pollRepository.save(updatedPoll);

        return updatedPoll;
    }
}
