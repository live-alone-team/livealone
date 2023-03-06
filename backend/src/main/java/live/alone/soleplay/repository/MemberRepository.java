package live.alone.soleplay.repository;

import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long id);

    @Transactional
    @Modifying
    @Query("update Member m set m.jwtToken=:token where m.email=:email")
    void saveToken(String token, String email);

    @Query("select p " +
            "from Member m join Poll p on m.id = p.member.id " +
            "where p.member.id = :memberId " +
            "order by p.createdDate desc")
    List<Poll> findPollHistory(@Param("memberId") Long memberId);
}
