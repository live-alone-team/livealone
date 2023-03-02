package live.alone.soleplay.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import live.alone.soleplay.entity.Choice;
import live.alone.soleplay.entity.Poll;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PollResponse {
    private Long pollId;
    private String nickname;
    private String profileImage;
    private String title;
    private String description;
    private List<ChoiceResponse> choices;
    private String expirationDate;
    private String createdDate;
    private boolean isExpired;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long selectedChoice;
    private Long totalVotes;
}
