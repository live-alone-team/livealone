package live.alone.soleplay.repository;

import live.alone.soleplay.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long id);

    @Transactional
    @Modifying
    @Query("update Member m set m.jwtToken=:token where m.email=:email")
    void saveToken(String token, String email);
}
