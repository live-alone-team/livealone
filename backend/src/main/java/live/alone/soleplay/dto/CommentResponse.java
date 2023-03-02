package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponse {
    private Long commentId;
    private Long memberId;
    private String image;
    private String type;
    private String title;
    private String content;
    private LocalDateTime createdDate;

    public CommentResponse(Comment comment) {
        this.commentId = comment.getId();
        this.memberId = comment.getMember().getId();
        this.image = comment.getMember().getImage();
        this.type = comment.getType();
        this.title = comment.getTitle();
        this.content = comment.getContent();
        this.createdDate = comment.getCreatedDate();
    }
}
