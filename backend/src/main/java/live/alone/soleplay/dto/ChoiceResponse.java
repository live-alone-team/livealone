package live.alone.soleplay.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChoiceResponse {
    private Long id;
    private String content;
    private long voteCount;
}
