package live.alone.soleplay.controller;

import live.alone.soleplay.config.jwt.UserDetailsImpl;
import live.alone.soleplay.dto.PollListResponse;
import live.alone.soleplay.dto.PollRequest;
import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.Poll;
import live.alone.soleplay.service.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/user/poll")
public class PollController {
    private final PollService pollService;

    @PostMapping("/save")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PollRequest> createPoll(@RequestBody PollRequest pollRequest,
                                                  @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(pollService.createPoll(pollRequest, memberId));
    }

    @GetMapping("")
    public ResponseEntity<List<PollListResponse>> findAllPolls() {
        return ResponseEntity.ok(pollService.findAllPolls());
    }

    @GetMapping("{pollId}")
    public ResponseEntity<PollResponseDetail> getPollBy(@PathVariable Long pollId) {
        return ResponseEntity.ok(pollService.getPollBy(pollId));
    }

    @PostMapping("{pollId}/votes")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PollResponse> castVote(@PathVariable Long pollId,
                                                 @RequestBody VoteRequest voteRequest,
                                                 @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(pollService.castVoteAndGetUpdatedPoll(pollId, voteRequest, memberId));
    }

    @PatchMapping("/{pollId}")
    public ResponseEntity<Poll> updatePoll(@RequestBody PollUpdateRequest pollUpdateRequest,
                                           @PathVariable Long pollId,
                                           @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(pollService.updatePoll(pollUpdateRequest, pollId, memberId));
    }

    @DeleteMapping("/{pollId}")
    public ResponseEntity<String> deletePoll(@PathVariable Long pollId,
                                             @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        pollService.deletePoll(pollId, memberId);
        return ResponseEntity.ok("투표 " + pollId + "번이 삭제되었습니다.");
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<PollSearchList>> getPollContaining(@PathVariable String keyword) {
        return ResponseEntity.ok(pollService.getPollContaining(keyword));
    }

    @GetMapping("/like/{pollId}")
    public ResponseEntity<String> likeOnPoll(@PathVariable Long pollId,
                                             @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(pollService.likeOnPoll(pollId, memberId));
    }
}
