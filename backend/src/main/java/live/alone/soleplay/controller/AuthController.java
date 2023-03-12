package live.alone.soleplay.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import live.alone.soleplay.config.jwt.JwtTokenProvider;
import live.alone.soleplay.config.oauth.OauthService;
import live.alone.soleplay.dto.LogInRequest;
import live.alone.soleplay.dto.LogInResponse;
import live.alone.soleplay.dto.RegisterRequest;
import live.alone.soleplay.config.oauth.social.SocialOAuthResponse;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.entity.enums.SocialLoginType;
import live.alone.soleplay.repository.MemberRepository;
import live.alone.soleplay.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final OauthService oauthService;

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
    @GetMapping("/auth/{socialLoginType}")
    public void getSocialLoginType(@PathVariable String socialLoginType) throws IOException {
        SocialLoginType loginType = SocialLoginType.valueOf(socialLoginType.toUpperCase());
        oauthService.request(loginType);
    }

    @GetMapping("/auth/{socialLoginType}/callback")
    public ResponseEntity<SocialOAuthResponse> callback(@PathVariable String socialLoginType,
                                                        @RequestParam String code) throws JsonProcessingException {
        SocialLoginType loginType = SocialLoginType.valueOf(socialLoginType.toUpperCase());
        return ResponseEntity.ok(oauthService.requestAccessToken(loginType, code));
    }
}
