package live.alone.soleplay.controller;

import live.alone.soleplay.config.jwt.UserDetailsImpl;
import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MemberProfile> getProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(memberService.getProfile(memberId));
    }

    @PatchMapping("/profile")
    public ResponseEntity<Member> updateProfile(@RequestBody MemberUpdateRequest memberUpdateRequest,
                                                @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(memberService.updateProfile(memberUpdateRequest, memberId));
    }

    @GetMapping("/profile/polls")
    public ResponseEntity<List<PollHistoryResponse>> findAllPollsBy(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(memberService.findPollHistory(memberId));
    }

    @GetMapping("/profile/likes")
    public ResponseEntity<List<PollHistoryResponse>> findLikedPolls(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(memberService.findLikedPoll(memberId));
    }

    @PostMapping("/profile/image")
    public ResponseEntity<Member> uploadProfile(@RequestPart MultipartFile file,
                                                @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();

        // 경로를 어떻게 할지 고민 좀 하겠습니다.
        String fileDir = "C:\\Users\\ab338\\Desktop\\live-alone\\livealone\\backend\\src\\main\\resources\\static\\profile\\";
        String original = file.getOriginalFilename();
        String savedPath = fileDir + original;

        try {
            file.transferTo(new File(savedPath));
        } catch (IOException e) {
            throw new CustomException(ErrorCode.NOT_FOUND_IMAGE);
        }

        return ResponseEntity.ok(memberService.uploadProfile(original, memberId));
    }

    @DeleteMapping("/withdrawal")
    public ResponseEntity<String> withdrawal(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        memberService.withdrawal(memberId);
        String withdrawalMessage = "회원번호: " + memberId + "번\n이름: " + userDetails.getMember().getName()
                + "\n탈퇴하였습니다.";
        return ResponseEntity.ok(withdrawalMessage);
    }
}
