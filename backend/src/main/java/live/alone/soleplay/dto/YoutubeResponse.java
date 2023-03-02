package live.alone.soleplay.dto;

import lombok.Data;

@Data
public class YoutubeResponse {
    private Item[] items;
    private String nextPageToken;
    private PageInfo pageInfo;

    @Data
    static class Item {
        Snippet snippet;
    }

    @Data
    static class Snippet {
        private String channelId;
        private String title;
        private Thumbnails thumbnails;
        private String channelTitle;
        private String categoryId;
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

    @Data
    static class PageInfo {
        private int totalResults;
        private int resultsPerPage;
    }
}
