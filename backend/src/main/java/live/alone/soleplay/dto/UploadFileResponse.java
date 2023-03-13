package live.alone.soleplay.dto;

import live.alone.soleplay.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UploadFileResponse {
    private Long memberId;
    private String email;
    private String image;

    public UploadFileResponse(Member member) {
        this.memberId = member.getId();
        this.email = member.getEmail();
        this.image = member.getImage();
    }
}
