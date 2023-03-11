package live.alone.soleplay.controller;

import live.alone.soleplay.config.openapi.MovieApiClient;
import live.alone.soleplay.config.openapi.TvApiClient;
import live.alone.soleplay.config.openapi.YouTubeApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class ApiController {
    private final MovieApiClient movieApiClient;
    private final TvApiClient tvApiClient;
    private final YouTubeApiClient youTubeApiClient;

    @GetMapping("/chart/{type}")
    public ResponseEntity<?> getTrending(@PathVariable String type) {
        if (type.equals("movies"))
            return ResponseEntity.ok(movieApiClient.getTrendingMovies());
        else if (type.equals("tv"))
            return ResponseEntity.ok(tvApiClient.getTrendingTvShows());
        else
            return ResponseEntity.ok(youTubeApiClient.getPopularVideosList());
    }

    @GetMapping("/search/{type}/{keyword}")
    public ResponseEntity<?> search(@PathVariable String type, @PathVariable String keyword) {
        if (type.equals("movies"))
            return ResponseEntity.ok(movieApiClient.searchMovies(keyword));
        else if (type.equals("tv"))
            return ResponseEntity.ok(tvApiClient.searchTv(keyword));
        else
            return ResponseEntity.ok(youTubeApiClient.searchOnYoutube(keyword));
    }

    @GetMapping("/{type}/{id}")
    public ResponseEntity<?> getDetails(@PathVariable String type, @PathVariable Long id) {
        if (type.equals("movies"))
            return ResponseEntity.ok(movieApiClient.getMovieDetails(id));
        else
            return ResponseEntity.ok(tvApiClient.getTvDetails(id));
    }

}
