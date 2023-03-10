package live.alone.soleplay.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PollSearchList {
    private final Long id;
    private final String title;
    private final String description;
    private final String createdDate;

    @Builder
    public PollSearchList(Long id, String title, String description, String createdDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
    }
}
