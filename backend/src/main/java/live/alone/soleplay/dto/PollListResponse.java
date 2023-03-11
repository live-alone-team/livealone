package live.alone.soleplay.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PollListResponse {
    private Long pollId;
    private String image;
    private String nickname;
    private String title;
    private String description;
    private long totalLikes;
    private long totalVotes;
    private String expirationDate;
    private String createdTime;

    @Builder
    public PollListResponse(Long pollId, String image, String nickname, String title, String description, long totalLikes, long totalVotes, String expirationDate, String createdTime) {
        this.pollId = pollId;
        this.image = image;
        this.nickname = nickname;
        this.title = title;
        this.description = description;
        this.totalLikes = totalLikes;
        this.totalVotes = totalVotes;
        this.expirationDate = expirationDate;
        this.createdTime = createdTime;
    }
}
