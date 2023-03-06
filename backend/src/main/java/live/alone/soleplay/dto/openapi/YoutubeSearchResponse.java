package live.alone.soleplay.dto.openapi;

import lombok.Data;

@Data
public class YoutubeSearchResponse {
    private String nextPageToken;
    private PageInfo pageInfo;
    private Item[] items;

    @Data
    static class PageInfo {
        private int totalResults;
        private int resultsPerPage;
    }

    @Data
    static class Item {
        private Snippet snippet;
    }

    @Data
    static class Snippet {
        private String title;
        private Thumbnails thumbnails;
        private String channelTitle;
    }

    @Data
    static class Thumbnails {
        private High high;
    }

    @Data
    static class High {
        private String url;
    }
}
