package live.alone.soleplay.service;

import live.alone.soleplay.dto.CommentRequest;
import live.alone.soleplay.dto.CommentResponse;
import live.alone.soleplay.dto.CommentUpdate;
import live.alone.soleplay.entity.Comment;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.repository.CommentRepository;
import live.alone.soleplay.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public CommentRequest saveComment(CommentRequest commentRequest, String type, String keyword, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_USER));

        String content = commentRequest.getContent();

        Comment comment = new Comment(content, type, keyword, member);
        commentRepository.save(comment);

        commentRequest.setCommentId(comment.getId());
        commentRequest.setTitle(keyword);
        commentRequest.setType(type);
        return commentRequest;
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> findAllComments(String type, String keyword) {
        return commentRepository.findAll(type, keyword)
                .stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
    }

    public Comment updateComment(CommentUpdate commentUpdate, Long commentId, Long memberId) {
        Optional<Comment> comment = commentRepository.findBy(commentId, memberId);

        if (comment.isEmpty())
            throw new CustomException(ErrorCode.INVALID_USER);

        Comment updated = comment.get();

        if (commentUpdate.getContent() != null)
            updated.setContent(commentUpdate.getContent());

        commentRepository.save(updated);
        return updated;
    }

    @Transactional
    public void deleteComment(Long commentId, Long memberId) {
        commentRepository.findBy(commentId, memberId).orElseThrow(
                () -> new CustomException(ErrorCode.INVALID_USER));

        commentRepository.deleteBy(commentId, memberId);
    }
}
