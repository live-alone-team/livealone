package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Poll;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class PollHistoryResponse {
    private String title;
    private String createdDate;

    public PollHistoryResponse(Poll poll) {
        this.title = poll.getTitle();
        this.createdDate = poll.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
    }

}
