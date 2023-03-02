package live.alone.soleplay.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    ROLE_GUEST("ROLE_GUEST","비회원"),
    ROLE_USER("ROLE_USER", "회원"),
    ROLE_ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;
}
