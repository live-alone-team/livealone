package live.alone.soleplay.repository;

import live.alone.soleplay.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.id=:commentId and c.member.id=:memberId")
    Optional<Comment> findBy(@Param("commentId") Long commentId, @Param("memberId") Long memberId);

    @Query("select c from Comment c where c.type = :type and c.title = :keyword ORDER BY c.createdDate desc")
    List<Comment> findAll(@Param("type") String type, @Param("keyword") String keyword);

    @Modifying
    @Query("DELETE from Comment c where c.id = :commentId and c.member.id = :memberId")
    void deleteBy(@Param("commentId") Long commentId, @Param("memberId") Long memberId);
}
