package live.alone.soleplay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PopularYouTubeRequest {
    private String url;
    private String title;
    private String thumbnail;
    private String description;
}
