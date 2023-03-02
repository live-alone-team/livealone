package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Poll;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class PollListResponse {
    private String image;
    private String nickname;
    private String title;
    private String description;
    private String createdTime;

    public PollListResponse(Poll poll) {
        this.image = poll.getMember().getImage();
        this.nickname = poll.getMember().getNickname();
        this.title = poll.getTitle();
        this.description = poll.getDescription();
        this.createdTime = poll.getCreatedDate().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm"));
    }
}
