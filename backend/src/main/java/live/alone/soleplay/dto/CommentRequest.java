package live.alone.soleplay.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    private Long commentId;
    private String content;
    private String type;
    private String title;
}
