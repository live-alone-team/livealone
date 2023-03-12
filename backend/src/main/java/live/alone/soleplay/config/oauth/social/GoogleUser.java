package live.alone.soleplay.config.oauth.social;

import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GoogleUser {
    private String id;
    private String email;
    private Boolean verifiedEmail;
    private String name;
    private String givenName;
    private String familyName;
    private String picture;
    private String locale;

    public Member toEntity() {
        String[] emailId = getEmail().split("@");
        String head = emailId[0];

        return Member.builder()
                .name(name)
                .email(email)
                .password("")
                .nickname(head)
                .image(picture)
                .role(Role.ROLE_USER)
                .social("Google")
                .status(1)
                .build();
    }
}
