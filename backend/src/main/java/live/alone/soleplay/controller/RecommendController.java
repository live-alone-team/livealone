package live.alone.soleplay.controller;

import live.alone.soleplay.config.MovieApiClient;
import live.alone.soleplay.entity.Member;
import live.alone.soleplay.entity.Recommendation;
import live.alone.soleplay.repository.MemberRepository;
import live.alone.soleplay.repository.RecommendationRepository;
import live.alone.soleplay.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RecommendController {
    private final RecommendService recommendService;
    private final MemberRepository memberRepository;
    private final RecommendationRepository repository;
    private final MovieApiClient movieApiClient;

    @PostMapping("test/save")
    public String test() {
        String title = "Anna";
        String image = "/amdfkd";
        String content = "재밌음 강추";
        Long memberId = 1L;
        Member member = memberRepository.findById(memberId).orElseThrow();
        Recommendation recommendation = new Recommendation();
        recommendation.setMember(member);
        recommendation.setTitle(title);
        recommendation.setImage(image);
        recommendation.setContent(content);
        repository.save(recommendation);

        return "ok";
    }
}
