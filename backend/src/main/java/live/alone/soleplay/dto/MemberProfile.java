package live.alone.soleplay.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberProfile {
    private String name;
    private String nickname;
    private String image;
}
