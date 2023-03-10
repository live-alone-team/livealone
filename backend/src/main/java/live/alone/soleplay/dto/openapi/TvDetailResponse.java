package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class TvDetailResponse {
    private String poster_path;
    private String name;
    private Created[] created_by;
    private String first_air_date;
    private String overview;

    @Data
    static class Created {
        private String name;
    }
}
