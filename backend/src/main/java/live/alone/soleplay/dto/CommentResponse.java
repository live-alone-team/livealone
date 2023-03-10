package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class CommentResponse {
    private Long commentId;
    private Long memberId;
    private String image;
    private String nickname;
    private String type;
    private String title;
    private String content;
    private String createdDate;

    public CommentResponse(Comment comment) {
        this.commentId = comment.getId();
        this.memberId = comment.getMember().getId();
        this.image = comment.getMember().getImage();
        this.nickname = comment.getMember().getNickname();
        this.type = comment.getType();
        this.title = comment.getTitle();
        this.content = comment.getContent();
        this.createdDate = comment.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
    }
}
