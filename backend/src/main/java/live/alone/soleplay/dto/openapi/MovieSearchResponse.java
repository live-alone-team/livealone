package live.alone.soleplay.dto.openapi;

import lombok.Data;

import java.util.Date;

@Data
public class MovieSearchResponse {
    private int page;
    private Result[] results;
    private int total_pages;
    private int total_results;
    @Data
    static class Result {
        public int id;
        public String overview;
        public String poster_path;
        public String release_date;
        public String title;
        public float vote_average;
    }
}
