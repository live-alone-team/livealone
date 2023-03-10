package live.alone.soleplay.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // USER
    USER_STATUS_WITHDRAWAL(HttpStatus.UNAUTHORIZED, "탈퇴한 회원입니다."),
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다."),
    ALREADY_EXISTS_EMAIL(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일입니다."),
    ALREADY_EXISTS_NICKNAME(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임입니다."),
    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    INVALID_USER(HttpStatus.UNAUTHORIZED, "접근 권한이 없는 유저입니다."),

    // COMMUNITY
    FAIL_UPLOAD_IMAGE(HttpStatus.BAD_REQUEST, "이미지 업로드에 실패했습니다."),
    NOT_FOUND_IMAGE(HttpStatus.BAD_REQUEST, "이미지를 찾을 수 없습니다."),

    // POLL
    EXPIRED_DATE(HttpStatus.BAD_REQUEST, "날짜가 만료되어 투표할 수 없습니다."),
    NOT_FOUND_POLL(HttpStatus.NOT_FOUND, "해당 투표 게시글이 없습니다."),
    ALREADY_VOTED(HttpStatus.ALREADY_REPORTED, "이미 투표하였습니다."),
    CANNOT_CAST(HttpStatus.BAD_REQUEST, "본인은 투표할 수 없습니다."),
    NO_SUCH_POLL(HttpStatus.NOT_FOUND, "검색 결과가 없습니다."),

    // COMMENT
    NOT_FOUND_COMMENT(HttpStatus.NOT_FOUND, "해당 댓글이 없습니다."),

    // OTHER
    SEARCH_NOT_FOUND(HttpStatus.NOT_FOUND, "일치하는 검색 결과가 없습니다."),
    ADMIN_TOKEN(HttpStatus.BAD_REQUEST, "관리자가 아닙니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
