package live.alone.soleplay.controller;

import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.config.jwt.JwtTokenProvider;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.repository.MemberRepository;
import live.alone.soleplay.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<Member> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(memberService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LogInResponse> login(@RequestBody LogInRequest logInRequest) {
        Member member = memberService.logIn(logInRequest);
        String email = member.getEmail();
        Role role = member.getRole();
        String jwtToken = jwtTokenProvider.createToken(email, role);
        memberRepository.saveToken(jwtToken, email);

        return ResponseEntity.ok(new LogInResponse(email, jwtToken));
    }

    @GetMapping("/user/profile/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MemberProfile> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.getProfile(id));
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<LogInResponse> loginSuccess(@RequestParam String jwtToken, @RequestParam String email) {
        memberRepository.saveToken(jwtToken, email);

        return ResponseEntity.ok(new LogInResponse(email, jwtToken));
    }

    @PatchMapping("/user/member/{id}")
    public ResponseEntity<Member> updateMemberInfo(@RequestBody MemberUpdateRequest memberUpdateRequest,
                                                   @PathVariable Long id) {
        return ResponseEntity.ok(memberService.updateMemberInfo(memberUpdateRequest, id));
    }

    @PostMapping("/user/image/{id}")
    public ResponseEntity<Member> uploadProfile(@RequestPart MultipartFile file, @PathVariable Long id) {
        String fileDir = "C:\\Users\\ab338\\Desktop\\soleplay\\soleplay\\src\\main\\resources\\static\\profile\\";
        String original = file.getOriginalFilename();
        String savedPath = fileDir + original;

        try {
            file.transferTo(new File(savedPath));
        } catch (IOException e) {
            throw new CustomException(ErrorCode.NOT_FOUND_IMAGE);
        }

        return ResponseEntity.ok(memberService.uploadProfile(original, id));
    }

}
