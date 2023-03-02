package live.alone.soleplay.dto;

import lombok.Data;

@Data
public class TrendingMovieResponse {
    private int page;
    private Result[] results;
    private int total_pages;
    private int total_results;

    @Data
    static class Result {
        private String backdrop_path;
        private String title;
        private String overview;
        private String poster_path;
        private String release_date;
        private float vote_average;
    }
}
