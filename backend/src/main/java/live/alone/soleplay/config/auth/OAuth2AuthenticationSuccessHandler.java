package live.alone.soleplay.config.auth;

import live.alone.soleplay.config.auth.dto.OAuthAttributes;
import live.alone.soleplay.config.jwt.JwtTokenProvider;
import live.alone.soleplay.config.jwt.UserDetailsImpl;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuthAttributes oAuthAttributes = (OAuthAttributes) authentication.getAuthorities();
        String targetUrl;
        String jwtToken = jwtTokenProvider.createToken(oAuthAttributes.getEmail(), Role.ROLE_USER);

        memberRepository.saveToken(jwtToken, oAuthAttributes.getEmail());

        /*targetUrl = UriComponentsBuilder.fromUriString("/auth/oauth2/success")
                .queryParam("jwtToken",jwtToken)
                .queryParam("email", oAuthAttributes.getEmail())
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);*/
    }

}
