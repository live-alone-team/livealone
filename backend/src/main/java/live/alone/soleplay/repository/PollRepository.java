package live.alone.soleplay.repository;

import live.alone.soleplay.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

    Optional<Poll> findById(Long pollId);

    @Modifying
    @Query("delete from Poll p where p.id=:pollId and p.member.id=:memberId")
    void deleteById(@Param("pollId") Long pollId, @Param("memberId") Long memberId);

    List<Poll> findByTitleContainingOrderByCreatedDateDesc(String keyword);
}
