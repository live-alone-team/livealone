package live.alone.soleplay.repository;

import live.alone.soleplay.entity.ChoiceVoteCount;
import live.alone.soleplay.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("select NEW live.alone.soleplay.entity.ChoiceVoteCount(v.choice.id, count(v.id)) from Vote v where v.poll.id in :pollIds group by  v.choice.id")
    List<ChoiceVoteCount> countByPollIdInGroupByChoiceId(@Param("pollId") List<Long> pollIds);

    @Query("select NEW live.alone.soleplay.entity.ChoiceVoteCount(v.choice.id, count(v.id)) FROM Vote v WHERE v.poll.id = :pollId GROUP BY v.choice.id")
    List<ChoiceVoteCount> countByPollIdGroupByChoiceId(@Param("pollId") Long pollId);

    @Query("SELECT v FROM Vote v where v.member.id = :memberId and v.poll.id in :pollIds")
    List<Vote> findByMemberIdAndPollIdIn(@Param("memberId") Long memberId, @Param("pollIds") List<Long> pollIds);

    @Query("SELECT count(v.id) FROM Vote v where v.member.id = :memberId and v.poll.id = :pollId")
    long countByMemberIdAndPollId(@Param("memberId") Long memberId, @Param("pollId") Long pollId);

    @Query("SELECT coalesce(count(v.id), 0) from Vote v where v.poll.id = :pollId")
    long countByPollId(@Param("pollId") Long pollId);
}
