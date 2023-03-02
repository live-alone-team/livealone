package live.alone.soleplay.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    //private String connectPath = "/test/image";
    //private String resourcePath = "file:///C:\\Users\\ab338\\Pictures\\livealone\\profile";
    final Path ROOT = Paths.get("./static/profile").toAbsolutePath().normalize();

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/test/image/**")
                .addResourceLocations(ROOT.toString());
    }
}
