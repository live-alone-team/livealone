package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Poll;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class ProfileListResponse {
    private String title;
    private String createdDate;

    public ProfileListResponse(Poll poll) {
        this.title = poll.getTitle();
        this.createdDate = poll.getCreatedDate().format(DateTimeFormatter.ofPattern("YYYY-MM-dd"));
    }
}
