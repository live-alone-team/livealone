package live.alone.soleplay.controller;

import live.alone.soleplay.dto.PollListResponse;
import live.alone.soleplay.dto.PollRequest;
import live.alone.soleplay.dto.ProfileListResponse;
import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.Poll;
import live.alone.soleplay.service.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/poll")
public class PollController {
    private final PollService pollService;

    @PostMapping("/save/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PollRequest> createPoll(@RequestBody PollRequest pollRequest, @PathVariable Long id) {
        return ResponseEntity.ok(pollService.createPollAndChoice(pollRequest, id));
    }

    @GetMapping("")
    public ResponseEntity<List<PollListResponse>> findAllPolls() {
        return ResponseEntity.ok(pollService.findAllPolls());
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<List<ProfileListResponse>> findAllPollsBy(@PathVariable Long id) {
        return ResponseEntity.ok(pollService.findPollsBy(id));
    }

    @PostMapping("{pollId}/votes/{memberId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PollResponse> castVote(@PathVariable Long pollId
            , @RequestBody VoteRequest voteRequest, @PathVariable Long memberId) {
        return ResponseEntity.ok(pollService.castVoteAndGetUpdatedPoll(pollId, voteRequest, memberId));
    }

    @DeleteMapping("/{pollId}")
    public ResponseEntity<String> deletePoll(@PathVariable Long pollId) {
        pollService.deletePoll(pollId);
        return ResponseEntity.ok("투표 " + pollId + "번이 삭제되었습니다.");
    }

    @PatchMapping("/{pollId}/{memberId}")
    public ResponseEntity<Poll> updatePoll(@RequestBody PollRequest pollRequest, @PathVariable Long pollId,
                                           @PathVariable Long memberId) {
        return ResponseEntity.ok(pollService.updatePoll(pollRequest, pollId, memberId));
    }
}
