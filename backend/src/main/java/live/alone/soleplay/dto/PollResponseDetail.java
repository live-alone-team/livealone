package live.alone.soleplay.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PollResponseDetail {
    private String nickname;
    private String profileImage;
    private String title;
    private String description;
    private List<ChoiceResponse> choices;
    private String expirationDate;
    private String createdDate;
    private boolean isExpired;
    private Long totalLikes;
    private Long totalVotes;
}
