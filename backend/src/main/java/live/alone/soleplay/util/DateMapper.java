package live.alone.soleplay.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateMapper {
    public static String calculateTime(LocalDateTime expirationDate) {
        int min, hour, day;
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try {
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String end = expirationDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            Date today = dateFormat.parse(now);
            Date endDay = dateFormat.parse(end);
            min = (int) (((endDay.getTime() - today.getTime()) / 60000) % 60);
            hour = (int) ((endDay.getTime() - today.getTime()) / 3600000) % 24;
            day = (int) (((endDay.getTime() - today.getTime()) / 1000) / (24 * 60 * 60)) & 365;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String expiration = "";
        if (min == 0) {
            if (hour == 0 && day > 0)
                expiration = day + "일 남음";
            else if (hour > 0 && day == 0)
                expiration = hour + "시간 남음";
            else
                expiration = day + "일 " + hour + "시간 남음";
        }
        else if (hour == 0) {
            if (min > 0 && day == 0)
                expiration = min + "분 남음";
            else
                expiration = day + "일 " + min + "분 남음";
        }
        else if (day == 0)
            expiration = hour + "시간 " + min + "분 남음";
        else
            expiration = day + "일 " + hour + "시간 " + min + "분 남음";

        return expiration;
    }
}
