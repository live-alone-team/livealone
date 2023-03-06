package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class YoutubeResponse {
    private Item[] items;

    @Data
    static class Item {
        Snippet snippet;
    }

    @Data
    static class Snippet {
        private String title;
        private Thumbnails thumbnails;
        private String channelTitle;
    }

    @Data
    static class Thumbnails {
        Standard standard;
    }

    @Data
    static class Standard {
        private String url;
        private int width;
        private int height;
    }
}
