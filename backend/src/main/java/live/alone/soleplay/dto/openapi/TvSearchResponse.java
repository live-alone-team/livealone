package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class TvSearchResponse {
    private int page;
    private Result[] results;
    private int total_pages;
    private int total_results;

    @Data
    public static class Result {
        private int id;
        private String original_name;
        private String overview;
        private String poster_path;
        private String first_air_date;
        private float vote_average;
    }
}
