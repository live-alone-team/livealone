package live.alone.soleplay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LogInRequest {
    private String email;
    private String password;
}
