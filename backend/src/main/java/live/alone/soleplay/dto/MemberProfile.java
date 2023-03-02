package live.alone.soleplay.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberProfile {
    private String name;
    private String nickname;
    private String image;
}
