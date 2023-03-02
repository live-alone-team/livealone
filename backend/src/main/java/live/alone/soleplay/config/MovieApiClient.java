package live.alone.soleplay.config;

import live.alone.soleplay.dto.SearchMovieRequest;
import live.alone.soleplay.dto.TrendingMovieResponse;
import live.alone.soleplay.dto.TrendingTvResponse;

import live.alone.soleplay.dto.TvSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MovieApiClient {
    private final RestTemplate restTemplate;

    private final String ClientId = "CiNvnS2Q7_AFbocYOdWA";
    private final String ClientSecret = "fyVNrDHCAa";
    private final String TMDB_KEY = "3201b7c0835e166642b793c241b359e4";

    private final String movieUrl = "https://openapi.naver.com/v1/search/movie.json?query={keyword}";
    private final String trendingMovieUrl = "https://api.themoviedb.org/3/trending/movie/week?region=ko-KR&language=ko-KR&api_key=" + TMDB_KEY;
    private final String trendingTvUrl = "https://api.themoviedb.org/3/trending/tv/week?region=ko-KR&language=ko-KR&api_key=" + TMDB_KEY;
    private final String tvSearchUrl = "";

    public TrendingMovieResponse getTrendingMovies() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(trendingMovieUrl, HttpMethod.GET, entity, TrendingMovieResponse.class)
                .getBody();
    }

    public TrendingTvResponse getTrendingTvShows() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(trendingTvUrl, HttpMethod.GET, entity, TrendingTvResponse.class)
                .getBody();
    }

     public SearchMovieRequest searchMovies(String keyword) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-Naver-Client-Id", ClientId);
        httpHeaders.set("X-Naver-Client-Secret", ClientSecret);

        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(movieUrl, HttpMethod.GET, entity, SearchMovieRequest.class, keyword)
                .getBody();
    }

    public TvSearchResponse searchTv(String keyword) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(tvSearchUrl, HttpMethod.GET, entity, TvSearchResponse.class, keyword)
                .getBody();
    }

}
