package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Poll;
import live.alone.soleplay.util.DateMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
public class PollListResponse {
    private String image;
    private String nickname;
    private String title;
    private String description;
    private String expirationDate;
    private String createdTime;

    public PollListResponse(Poll poll) {
        this.image = poll.getMember().getImage();
        this.nickname = poll.getMember().getNickname();
        this.title = poll.getTitle();
        this.description = poll.getDescription();
        this.expirationDate = DateMapper.calculateTime(poll.getExpirationDate());
        this.createdTime = poll.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
    }
}
