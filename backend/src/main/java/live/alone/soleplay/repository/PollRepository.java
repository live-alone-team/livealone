package live.alone.soleplay.repository;

import live.alone.soleplay.entity.Poll;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

    Optional<Poll> findById(Long pollId);

    //Page<Poll> findAll(Long memberId, Pageable pageable);

    //long countByCreatedBy(Long memberId);

    List<Poll> findByIdIn(List<Long> pollId);

    List<Poll> findByIdIn(List<Long> pollId, Sort sort);

    @Query("select p.title, p.createdDate from Poll p where p.member.id = :memberId")
    List<Poll> findAllBy(Long memberId);
}
