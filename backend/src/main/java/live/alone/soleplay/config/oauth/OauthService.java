package live.alone.soleplay.config.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import live.alone.soleplay.config.jwt.JwtTokenProvider;
import live.alone.soleplay.config.oauth.social.GoogleOauth;
import live.alone.soleplay.config.oauth.social.SocialOauth;
import live.alone.soleplay.config.oauth.social.GoogleOAuthToken;
import live.alone.soleplay.config.oauth.social.GoogleUser;
import live.alone.soleplay.config.oauth.social.SocialOAuthResponse;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.entity.enums.SocialLoginType;
import live.alone.soleplay.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OauthService {
    private final List<SocialOauth> socialOauthList;
    private final HttpServletResponse response;
    private final GoogleOauth googleOauth;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public void request(SocialLoginType socialLoginType) throws IOException {
        SocialOauth socialOauth = this.findSocialOauthByType(socialLoginType);
        String redirectURL = socialOauth.getOauthRedirectURL();

        response.sendRedirect(redirectURL);
    }

    public SocialOAuthResponse requestAccessToken(SocialLoginType socialLoginType, String code) throws JsonProcessingException {
        switch (socialLoginType) {
            case GOOGLE: {
                ResponseEntity<String> accessTokenResponse = googleOauth.requestAccessToken(code);
                GoogleOAuthToken googleOAuthToken = googleOauth.getAccessToken(accessTokenResponse);

                ResponseEntity<String> userInfoResponse = googleOauth.requestUserInfo(googleOAuthToken);
                GoogleUser googleUser = googleOauth.getUserInfo(userInfoResponse);

                System.out.println(googleUser.getEmail());
                System.out.println(googleUser.getName());
                System.out.println(googleUser.getPicture());

                if (memberRepository.findByEmail(googleUser.getEmail()).isEmpty()) {
                    saveOrUpdate(googleUser);
                }
                String jwtToken = jwtTokenProvider.createToken(googleUser.getEmail(), Role.ROLE_USER);
                memberRepository.saveToken(jwtToken, googleUser.getEmail());
                return new SocialOAuthResponse(jwtToken,
                        googleOAuthToken.getAccess_token(), googleOAuthToken.getToken_type());
            } default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
    }

    public SocialOauth findSocialOauthByType(SocialLoginType socialLoginType) {
        return socialOauthList.stream()
                .filter(x -> x.type() == socialLoginType)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("알 수 없는 SocialLoginType 입니다."));
    }

    private Member saveOrUpdate(GoogleUser googleUser) {
        Member member = memberRepository.findByEmail(googleUser.getEmail())
                .map(entity -> entity.update(googleUser.getName(), googleUser.getPicture()))
                .orElse(googleUser.toEntity());

        return memberRepository.save(member);
    }
}
