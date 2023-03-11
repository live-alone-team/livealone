package live.alone.soleplay.config.openapi;

import live.alone.soleplay.dto.openapi.TrendingTvResponse;
import live.alone.soleplay.dto.openapi.TvDetailResponse;
import live.alone.soleplay.dto.openapi.TvSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class TvApiClient {
    private final RestTemplate restTemplate;

    private final String TMDB_KEY = "3201b7c0835e166642b793c241b359e4";
    private final String trendingTvUrl = "https://api.themoviedb.org/3/trending/tv/week?region=ko-KR&language=ko-KR&api_key=" + TMDB_KEY;
    private final String tvSearchUrl = "https://api.themoviedb.org/3/search/tv?language=ko-KR&query={keyword}&api_key=" + TMDB_KEY;
    private final String tvDetailsUrl = "https://api.themoviedb.org/3/tv/{id}?language=ko-KR&api_key=" + TMDB_KEY;
    public TrendingTvResponse getTrendingTvShows() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(trendingTvUrl, HttpMethod.GET, entity, TrendingTvResponse.class)
                .getBody();
    }

    public TvSearchResponse searchTv(String keyword) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(tvSearchUrl, HttpMethod.GET, entity, TvSearchResponse.class, keyword)
                .getBody();
    }

    public TvDetailResponse getTvDetails(Long id) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(tvDetailsUrl, HttpMethod.GET, entity, TvDetailResponse.class, id)
                .getBody();
    }
}
