package live.alone.soleplay.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Poll extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "poll_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column
    private String title;

    @Column
    private String description;

    @JsonManagedReference
    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    private List<Choice> choices = new ArrayList<>();

    @Column(name = "expiration")
    private LocalDateTime expirationDate;

    @Column
    private int status;

    public void addChoice(Choice choice) {
        this.choices.add(choice);
    }

    public void removeChoice(Choice choice) {
        choices.remove(choice);
        choice.setPoll(null);
    }

    public Poll(Member member, String title, String description, LocalDateTime expirationDate, int status) {
        this.member = member;
        this.title = title;
        this.description = description;
        this.expirationDate = expirationDate;
        this.status = status;
    }
}
