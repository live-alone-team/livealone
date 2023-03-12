package live.alone.soleplay.config.oauth.social;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class GoogleOauth implements SocialOauth {
    private final String BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private final String GOOGLE_CLIENT_ID = "524300461042-npklhi4n136fro90egrg2fc39mqq7e81.apps.googleusercontent.com";
    private final String GOOGLE_CLIENT_SECRET = "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";
    private final String REDIRECT_URI = "http://localhost:8080/auth/google/callback";
    private final String TOKEN_BASE_URL = "https://oauth2.googleapis.com/token";
    private final String SCOPE = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Override
    public String getOauthRedirectURL() {
        Map<String, Object> params = new HashMap<>();
        params.put("scope", SCOPE);
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("redirect_uri", REDIRECT_URI);
        params.put("response_type", "code");

        String parameterString = params.entrySet().stream()
                .map(x -> x.getKey() + "=" + x.getValue())
                .collect(Collectors.joining("&"));

        return BASE_URL + "?" + parameterString;
    }

    @Override
    public ResponseEntity<String> requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> params = new HashMap<>();
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("client_secret", GOOGLE_CLIENT_SECRET);
        params.put("code", code);
        params.put("grant_type", "authorization_code");
        params.put("redirect_uri", REDIRECT_URI);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(TOKEN_BASE_URL, params, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK)
            return responseEntity;
        return null;
    }

    public GoogleOAuthToken getAccessToken(ResponseEntity<String> response) throws JsonProcessingException {
        return objectMapper.readValue(response.getBody(),GoogleOAuthToken.class);
    }

    public ResponseEntity<String> requestUserInfo(GoogleOAuthToken googleOAuthToken) {
        String GOOGLE_USERINFO_REQUEST_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + googleOAuthToken.getAccess_token());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(httpHeaders);
        return restTemplate.exchange(GOOGLE_USERINFO_REQUEST_URL, HttpMethod.GET, request, String.class);
    }

    public GoogleUser getUserInfo(ResponseEntity<String> userInfoResponse) throws JsonProcessingException {
        return objectMapper.readValue(userInfoResponse.getBody(), GoogleUser.class);
    }
}
