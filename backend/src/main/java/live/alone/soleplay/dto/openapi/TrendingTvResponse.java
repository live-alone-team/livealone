package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class TrendingTvResponse {
    private Result[] results;

    @Data
    static class Result {
        private int id;
        private String name;
        private String overview;
        private String poster_path;
        private String first_air_date;
        private float vote_average;
    }
}
