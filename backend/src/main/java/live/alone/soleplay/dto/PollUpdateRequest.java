package live.alone.soleplay.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class PollUpdateRequest {
    private Long pollId;
    private String title;
    private String description;
    private List<ChoiceRequest> choices;
    private int day;
    private int hour;
    private int minute;
}
