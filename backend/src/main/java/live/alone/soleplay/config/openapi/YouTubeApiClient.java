package live.alone.soleplay.config.openapi;

import live.alone.soleplay.dto.openapi.YoutubeResponse;
import live.alone.soleplay.dto.openapi.YoutubeSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class YouTubeApiClient {
    private final RestTemplate restTemplate;

    private final String API_KEY = "AIzaSyDUqQFKz85SlQEVZOxo38fL79EDLEVPPjU";
    private final String VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=KR&key=" + API_KEY;
    private final String SEARCH_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q={keyword}&key=" + API_KEY;

    public YoutubeResponse getPopularVideosList() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(VIDEO_URL, HttpMethod.GET, entity, YoutubeResponse.class)
                .getBody();
    }

    public YoutubeSearchResponse searchOnYoutube(String keyword) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(SEARCH_URL, HttpMethod.GET, entity, YoutubeSearchResponse.class, keyword)
                .getBody();
    }
}
