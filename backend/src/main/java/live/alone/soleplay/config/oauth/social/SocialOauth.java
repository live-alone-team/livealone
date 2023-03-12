package live.alone.soleplay.config.oauth.social;

import live.alone.soleplay.entity.enums.SocialLoginType;
import org.springframework.http.ResponseEntity;

public interface SocialOauth {
    String getOauthRedirectURL();
    ResponseEntity<String> requestAccessToken(String code);

    default SocialLoginType type() {
        if (this instanceof GoogleOauth) {
            return SocialLoginType.GOOGLE;
        } else {
            return null;
        }
    }
}
