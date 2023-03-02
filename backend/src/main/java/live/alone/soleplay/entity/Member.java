package live.alone.soleplay.entity;

import live.alone.soleplay.entity.enums.Role;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column
    private String name;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column(unique = true)
    private String nickname;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column
    private String image;

    @Column
    private String social;

    @Column
    private int status;

    @Column(name = "jwt_token")
    private String jwtToken;

    public Member(String name, String email, String password, String nickname, Role role, String social, int status) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
        this.social = social;
        this.status = status;
    }

    public Member update(String name, String image) {
        this.name = name;
        this.image = image;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
