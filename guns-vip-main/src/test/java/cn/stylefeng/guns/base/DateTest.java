package cn.stylefeng.guns.base;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;

import java.util.Date;

/**
 * @ Author     ：wangyue.
 * @ Date       ：Created in 11:27 2020/6/17
 * @ Description：
 * @ Modified By：
 */
public class DateTest {
    public static void main(String[] args) {
        String dateStr = DateUtil.now().substring(0, 10) + " 00:00:00";
        System.out.println(dateStr);
        Date date = DateUtil.parse(dateStr);
        DateTime newDate2 = DateUtil.offsetDay(date, -1);
        System.out.println(newDate2);
        for (int i = 0; i < 1440; i++) {
            DateTime newDate4 = DateUtil.offsetMinute(newDate2, i);
            System.out.println(newDate4);
        }
////结果：2017-03-03 22:33:23
//        Date newDate = DateUtil.offset(date, DateField.DAY_OF_MONTH, 2);
//
////常用偏移，结果：2017-03-04 22:33:23
//        DateTime newDate2 = DateUtil.offsetDay(date, -1);
//
////常用偏移，结果：2017-03-01 19:33:23
//        DateTime newDate3 = DateUtil.offsetHour(date, -3);
//        DateTime newDate4 = DateUtil.offsetMinute(date, -3);
//        System.out.println(newDate4);

    }
}
