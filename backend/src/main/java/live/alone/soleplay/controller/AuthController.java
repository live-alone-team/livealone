package live.alone.soleplay.controller;

import live.alone.soleplay.config.jwt.JwtTokenProvider;
import live.alone.soleplay.dto.LogInRequest;
import live.alone.soleplay.dto.LogInResponse;
import live.alone.soleplay.dto.RegisterRequest;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.repository.MemberRepository;
import live.alone.soleplay.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AuthController {
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

    @GetMapping("/oauth2/success")
    public ResponseEntity<LogInResponse> loginSuccess(@RequestParam String jwtToken, @RequestParam String email) {
        memberRepository.saveToken(jwtToken, email);

        return ResponseEntity.ok(new LogInResponse(email, jwtToken));
    }
}
