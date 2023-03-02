package live.alone.soleplay.dto;

import lombok.Data;

@Data
public class TvSearchResponse {
    private int page;
    private Result[] results;
    private int total_pages;
    private int total_results;

    @Data
    static class Result {
        private String original_name;
        private String overview;
        private float popularity;
        private String poster_path;
        private String first_air_date;
        private float vote_average;
    }
}
