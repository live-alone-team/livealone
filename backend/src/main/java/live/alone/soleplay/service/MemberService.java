package live.alone.soleplay.service;

import live.alone.soleplay.dto.LogInRequest;
import live.alone.soleplay.dto.MemberProfile;
import live.alone.soleplay.dto.MemberUpdateRequest;
import live.alone.soleplay.dto.RegisterRequest;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.enums.Role;
import live.alone.soleplay.exception.CustomException;
import live.alone.soleplay.exception.ErrorCode;
import live.alone.soleplay.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member register(RegisterRequest registerRequest) {
        String name = registerRequest.getName();
        String email = registerRequest.getEmail();

        Optional<Member> found = memberRepository.findByEmail(email);
        if (found.isPresent())
            throw new CustomException(ErrorCode.ALREADY_EXISTS_EMAIL);

        String nickname = registerRequest.getNickname();
        String password = passwordEncoder.encode(registerRequest.getPassword());
        Role role = Role.ROLE_USER;

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
        Optional<Member> member = memberRepository.findById(memberId);

        if (member.isEmpty())
            throw new CustomException(ErrorCode.NOT_FOUND_USER);

        return MemberProfile.builder()
                .name(member.get().getName())
                .nickname(member.get().getNickname())
                .image(member.get().getImage())
                .build();
    }

    public Member updateMemberInfo(MemberUpdateRequest memberUpdateRequest, Long memberId) {
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

    public Member uploadProfile(String savePath, Long id) {
        Optional<Member> member = memberRepository.findById(id);

        Member updatedMember = member.get();
        updatedMember.setImage(savePath);
        memberRepository.save(updatedMember);

        return updatedMember;
    }

}
