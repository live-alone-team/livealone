package live.alone.soleplay.controller;

import live.alone.soleplay.config.MovieApiClient;
import live.alone.soleplay.config.YouTubeApiClient;
import live.alone.soleplay.dto.*;
import live.alone.soleplay.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class ApiController {
    private final MovieApiClient movieApiClient;
    private final YouTubeApiClient youTubeApiClient;
    private final CommentService commentService;

    @GetMapping("/chart/movies")
    public ResponseEntity<TrendingMovieResponse> getTrendingMovies() {
        return ResponseEntity.ok(movieApiClient.getTrendingMovies());
    }

    @GetMapping("/chart/tv")
    public ResponseEntity<TrendingTvResponse> getTrendingTvShows() {
        return ResponseEntity.ok(movieApiClient.getTrendingTvShows());
    }

    @GetMapping("/chart/youtube")
    public ResponseEntity<YoutubeResponse> getYouTubeList() {
        return ResponseEntity.ok(youTubeApiClient.getPopularVideosList());
    }

    @GetMapping("/search/movies/{keyword}")
    public ResponseEntity<SearchMovieRequest> searchMovie(@PathVariable String keyword) {
        return ResponseEntity.ok(movieApiClient.searchMovies(keyword));
    }

    @GetMapping("/search/youtube/{keyword}")
    public ResponseEntity<YoutubeSearchResponse> searchOnYoutube(@PathVariable String keyword) {
        return ResponseEntity.ok(youTubeApiClient.searchOnYoutube(keyword));
    }

    @GetMapping("/search/all/{type}/{keyword}")
    public ResponseEntity<?> searchAll(@PathVariable String type, @PathVariable String keyword) {
        if (type.equals("movie"))
            return ResponseEntity.ok(movieApiClient.searchMovies(keyword));
        else if (type.equals("tv"))
            return ResponseEntity.ok(movieApiClient.searchTv(keyword));
        else
            return ResponseEntity.ok(youTubeApiClient.searchOnYoutube(keyword));
    }

    @PostMapping("/chart/{type}/{keyword}/comment/{memberId}")
    public ResponseEntity<CommentRequest> saveComment(@RequestBody CommentRequest commentRequest
            , @PathVariable String type, @PathVariable String keyword, @PathVariable Long memberId) {
        return ResponseEntity.ok(commentService.saveComment(commentRequest, type, keyword, memberId));
    }

    @GetMapping("/chart/{type}/{keyword}/comments")
    public ResponseEntity<List<CommentResponse>> findAllComments(@PathVariable String type, @PathVariable String keyword) {
        return ResponseEntity.ok(commentService.findAllComments());
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok(commentId + "번 댓글이 삭제되었습니다.");
    }

}
