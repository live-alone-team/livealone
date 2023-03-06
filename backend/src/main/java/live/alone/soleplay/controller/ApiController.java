package live.alone.soleplay.controller;

import live.alone.soleplay.config.MovieApiClient;
import live.alone.soleplay.config.TvApiClient;
import live.alone.soleplay.config.YouTubeApiClient;
import live.alone.soleplay.dto.openapi.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

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

    /*public String getDetailTV(String title) {
        tvApiClient.searchTv(title);

    }

    public void getId() {
        TvSearchResponse tvSearchResponse = new TvSearchResponse();
        System.out.println(tvSearchResponse.getResults());
    }*/

}
