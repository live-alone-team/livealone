package live.alone.soleplay.service;

import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.*;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.repository.LikesRepository;
import live.alone.soleplay.repository.MemberRepository;
import live.alone.soleplay.repository.PollRepository;
import live.alone.soleplay.repository.VoteRepository;
import live.alone.soleplay.util.DateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static live.alone.soleplay.util.DateMapper.calculateTime;

@RequiredArgsConstructor
@Service
public class PollService {
    private final PollRepository pollRepository;
    private final VoteRepository voteRepository;
    private final MemberRepository memberRepository;
    private final LikesRepository likesRepository;

    public PollRequest createPoll(PollRequest pollRequest, Long memberId) {
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
        List<Poll> polls = pollRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDate"));
        List<PollListResponse> pollListResponses = new ArrayList<>();

        for (Poll poll : polls) {
            PollListResponse pollListResponse = PollListResponse.builder()
                    .pollId(poll.getId())
                    .image(poll.getMember().getImage())
                    .nickname(poll.getMember().getNickname())
                    .title(poll.getTitle())
                    .description(poll.getDescription())
                    .expirationDate(DateMapper.calculateTime(poll.getExpirationDate()))
                    .totalLikes(likesRepository.sumLikes(poll.getId()))
                    .totalVotes(voteRepository.countByPollId(poll.getId()))
                    .createdTime(poll.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .build();
            pollListResponses.add(pollListResponse);
        }
        return pollListResponses;
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

        if (voteRepository.countByMemberIdAndPollId(memberId, pollId) > 0)
            throw new CustomException(ErrorCode.ALREADY_VOTED);
        else
            voteRepository.save(vote);

        // 여기서부터 투표 결과 반환

        List<ChoiceVoteCount> voteCounts = voteRepository.countByPollIdGroupByChoiceId(pollId);

        Map<Long, Long> choiceVoteMap = voteCounts.stream()
                .collect(Collectors.toMap(ChoiceVoteCount::getChoiceId, ChoiceVoteCount::getVoteCount));

        return mapPoll(poll, choiceVoteMap, vote.getChoice().getId());
    }

    public static PollResponse mapPoll(Poll poll, Map<Long, Long> choiceVoteMap, Long vote) {
        PollResponse pollResponse = new PollResponse();
        pollResponse.setPollId(poll.getId());

        pollResponse.setExpirationDate(calculateTime(poll.getExpirationDate()));
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

        if (vote != null)
            pollResponse.setSelectedChoice(vote);

        long totalVotes = pollResponse.getChoices().stream().mapToLong(ChoiceResponse::getVoteCount).sum();
        pollResponse.setTotalVotes(totalVotes);

        return pollResponse;
    }

    @Transactional
    public void deletePoll(Long pollId, Long memberId) {
        pollRepository.findById(pollId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POLL));
        pollRepository.deleteById(pollId, memberId);
    }

    public List<PollListResponse> getPollContaining(String keyword) {
        List<Poll> polls = pollRepository.findByTitleContainingOrderByCreatedDateDesc(keyword);
        if (polls.size() == 0)
            throw new CustomException(ErrorCode.NO_SUCH_POLL);

        List<PollListResponse> pollListResponses = new ArrayList<>();

        for (Poll poll : polls) {
            PollListResponse pollListResponse = PollListResponse.builder()
                    .pollId(poll.getId())
                    .image(poll.getMember().getImage())
                    .nickname(poll.getMember().getNickname())
                    .title(poll.getTitle())
                    .description(poll.getDescription())
                    .expirationDate(DateMapper.calculateTime(poll.getExpirationDate()))
                    .totalLikes(likesRepository.sumLikes(poll.getId()))
                    .totalVotes(voteRepository.countByPollId(poll.getId()))
                    .createdTime(poll.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .build();
            pollListResponses.add(pollListResponse);
        }
        return pollListResponses;
    }

    public String likeOnPoll(Long pollId, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Poll poll = pollRepository.findById(pollId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POLL));

        Optional<Likes> like = likesRepository.findLike(pollId, memberId);

        String command;
        if (like.isEmpty()) {
            Likes savedLike = new Likes(poll, member, 1);
            likesRepository.save(savedLike);
             command = "to like";
        }
        else{
            likesRepository.deleteLike(pollId, memberId);
            command = "to delete";
        }
        return "success " + command;
    }

    public PollResponseDetail getPollBy(Long pollId) {
        Poll poll = pollRepository.findById(pollId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POLL));

        PollResponseDetail responseDetail = new PollResponseDetail();
        responseDetail.setNickname(poll.getMember().getNickname());
        responseDetail.setProfileImage(poll.getMember().getImage());
        responseDetail.setTitle(poll.getTitle());
        responseDetail.setDescription(poll.getDescription());

        if (poll.getExpirationDate().isBefore(LocalDateTime.now()))
            responseDetail.setExpirationDate("마감");
        else
            responseDetail.setExpirationDate(calculateTime(poll.getExpirationDate()));
        responseDetail.setCreatedDate(poll.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")));
        responseDetail.setExpired(poll.getExpirationDate().isBefore(LocalDateTime.now()));

        List<ChoiceResponse> choiceResponses = poll.getChoices().stream().map(choice -> {
            ChoiceResponse choiceResponse = new ChoiceResponse();
            choiceResponse.setId(choice.getId());
            choiceResponse.setContent(choice.getContent());

            return choiceResponse;
        }).collect(Collectors.toList());

        responseDetail.setChoices(choiceResponses);
        responseDetail.setTotalLikes(likesRepository.sumLikes(pollId));
        responseDetail.setTotalVotes(voteRepository.countByPollId(pollId));
        return responseDetail;
    }

    public PollResponse getPollResult(Long pollId) {
        Poll poll = pollRepository.findById(pollId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POLL));

        List<ChoiceVoteCount> voteCounts = voteRepository.countByPollIdGroupByChoiceId(pollId);

        Map<Long, Long> choiceVoteMap = voteCounts.stream()
                .collect(Collectors.toMap(ChoiceVoteCount::getChoiceId, ChoiceVoteCount::getVoteCount));

        PollResponse pollResponse = new PollResponse();
        pollResponse.setPollId(poll.getId());

        pollResponse.setExpirationDate(calculateTime(poll.getExpirationDate()));
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

        long totalVotes = pollResponse.getChoices().stream().mapToLong(ChoiceResponse::getVoteCount).sum();
        pollResponse.setTotalVotes(totalVotes);

        return pollResponse;
    }
}
