package live.alone.soleplay.service;

import live.alone.soleplay.dto.*;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member register(RegisterRequest registerRequest) {
        String name = registerRequest.getName();
        String email = registerRequest.getEmail();
        String nickname = registerRequest.getNickname();
        String password = passwordEncoder.encode(registerRequest.getPassword());
        Role role = Role.ROLE_USER;

        Optional<Member> found = memberRepository.findByEmail(email);
        if (found.isPresent())
            throw new CustomException(ErrorCode.ALREADY_EXISTS_EMAIL);

        Member member = new Member(name, email, password, nickname, role, "None", 1);
        memberRepository.save(member);

        return member;
    }

    public Member logIn(LogInRequest logInRequest) {
        Member member = memberRepository.findByEmail(logInRequest.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        if (!passwordEncoder.matches(logInRequest.getPassword(), member.getPassword()))
            throw new CustomException(ErrorCode.NOT_FOUND_USER);

        return member;
    }

    public MemberProfile getProfile(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_USER));

        return MemberProfile.builder()
                .name(member.getName())
                .nickname(member.getNickname())
                .image(member.getImage())
                .build();
    }

    @Transactional
    public List<PollHistoryResponse> findPollHistory(Long memberId) {
        return memberRepository.findPollHistory(memberId).stream()
                .map(PollHistoryResponse::new)
                .collect(Collectors.toList());
    }

    public Member updateProfile(MemberUpdateRequest memberUpdateRequest, Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);

        if (member.isEmpty())
            throw new CustomException(ErrorCode.NOT_FOUND_USER);

        Member updatedMember = member.get();

        if (memberUpdateRequest.getNickname() != null)
            updatedMember.setNickname(memberUpdateRequest.getNickname());
        if (memberUpdateRequest.getPassword() != null){
            String newPassword = passwordEncoder.encode(memberUpdateRequest.getPassword());
            updatedMember.setPassword(newPassword);
        }

        memberRepository.save(updatedMember);

        return updatedMember;
    }

    public Member uploadProfile(String savePath, Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);

        Member updatedMember = member.get();
        updatedMember.setImage(savePath);
        memberRepository.save(updatedMember);

        return updatedMember;
    }

    public void withdrawal(Long memberId) {
        memberRepository.deleteById(memberId);
    }
}
