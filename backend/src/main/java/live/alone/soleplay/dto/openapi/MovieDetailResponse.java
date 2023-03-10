package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class MovieDetailResponse {
    private String title;
    private String poster_path;
    private String release_date;
    private String overview;
}
