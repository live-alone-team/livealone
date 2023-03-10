package live.alone.soleplay.repository;

import live.alone.soleplay.entity.Likes;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Query("select count(l.id) from Likes l where l.poll.id=:pollId")
    Long sumLikes(@Param("pollId") Long pollId);

    @Query("select l.status from Likes l where l.poll.id=:pollId and l.member.id=:memberId")
    int getStatus(@Param("pollId") Long pollId, @Param("memberId") Long memberId);

    @Transactional
    @Modifying
    @Query("delete from Likes l where l.poll.id=:pollId and l.member.id=:memberId")
    void deleteLike(@Param("pollId") Long pollId, @Param("memberId") Long memberId);

    @Query("select l from Likes l where l.poll.id=:pollId and l.member.id=:memberId")
    Optional<Likes> findLike(@Param("pollId") Long pollId, @Param("memberId") Long memberId);

    Optional<Likes> findByPollAndMember(Poll poll, Member member);
}
