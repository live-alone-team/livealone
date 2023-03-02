package live.alone.soleplay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SoleplayApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoleplayApplication.class, args);
	}

}
