package live.alone.soleplay.controller;

import live.alone.soleplay.config.jwt.UserDetailsImpl;
import live.alone.soleplay.dto.CommentRequest;
import live.alone.soleplay.dto.CommentResponse;
import live.alone.soleplay.dto.CommentUpdate;
import live.alone.soleplay.entity.Comment;
import live.alone.soleplay.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/chart/{type}/{keyword}/comment")
    public ResponseEntity<CommentRequest> saveComment(@RequestBody CommentRequest commentRequest,
                                                      @PathVariable String type,
                                                      @PathVariable String keyword,
                                                      @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(commentService.saveComment(commentRequest, type, keyword, memberId));
    }

    @GetMapping("/chart/{type}/{keyword}/comments")
    public ResponseEntity<List<CommentResponse>> findAllComments(@PathVariable String type,
                                                                 @PathVariable String keyword) {
        return ResponseEntity.ok(commentService.findAllComments(type, keyword));
    }

    @PatchMapping("/comment/{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentUpdate commentUpdate,
                                                 @PathVariable Long commentId,
                                                 @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        return ResponseEntity.ok(commentService.updateComment(commentUpdate, commentId, memberId));
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId,
                                                @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getId();
        commentService.deleteComment(commentId, memberId);
        return ResponseEntity.ok(commentId + "번 댓글이 삭제되었습니다.");
    }
}
