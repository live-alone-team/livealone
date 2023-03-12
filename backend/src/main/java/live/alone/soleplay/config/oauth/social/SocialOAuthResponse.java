package live.alone.soleplay.config.oauth.social;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SocialOAuthResponse {
    private String jwtToken;
    private String accessToken;
    private String tokenType;
}
