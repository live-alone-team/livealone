package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class TrendingMovieResponse {
    private Result[] results;

    @Data
    static class Result {
        private int id;
        private String title;
        private String overview;
        private String poster_path;
        private String release_date;
        private float vote_average;
    }
}
