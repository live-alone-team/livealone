package live.alone.soleplay.config.openapi;

import live.alone.soleplay.dto.openapi.MovieDetailResponse;
import live.alone.soleplay.dto.openapi.MovieSearchResponse;
import live.alone.soleplay.dto.openapi.TrendingMovieResponse;

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


    private final String TMDB_KEY = "3201b7c0835e166642b793c241b359e4";
    private final String trendingMovieUrl = "https://api.themoviedb.org/3/trending/movie/week?region=ko-KR&language=ko-KR&api_key=" + TMDB_KEY;
    private final String movieSearchUrl = "https://api.themoviedb.org/3/search/movie?region=ko-KR&language=ko-KR&query={keyword}&api_key=" + TMDB_KEY;
    private final String movieDetailsUrl = "https://api.themoviedb.org/3/movie/{id}?language=ko-KR&api_key=" + TMDB_KEY;

    public TrendingMovieResponse getTrendingMovies() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(trendingMovieUrl, HttpMethod.GET, entity, TrendingMovieResponse.class)
                .getBody();
    }

     public MovieSearchResponse searchMovies(String keyword) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(movieSearchUrl, HttpMethod.GET, entity, MovieSearchResponse.class, keyword)
                .getBody();
    }

    public MovieDetailResponse getMovieDetails(Long id) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        final HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        return restTemplate
                .exchange(movieDetailsUrl, HttpMethod.GET, entity, MovieDetailResponse.class, id)
                .getBody();
    }

}
