package live.alone.soleplay.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PollRequest {
    private Long pollId;
    private Long memberId;
    private String title;
    private String description;
    private List<ChoiceRequest> choices;
    private int day;
    private int hour;
    private int minute;
}
