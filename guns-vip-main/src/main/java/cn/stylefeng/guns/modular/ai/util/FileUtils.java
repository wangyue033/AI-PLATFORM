package cn.stylefeng.guns.modular.ai.util;

import cn.stylefeng.roses.core.util.ToolUtil;

/**
 * @ Author     ：wangyue.
 * @ Date       ：Created in 9:05 2020/7/7
 * @ Description：
 * @ Modified By：
 */
public class FileUtils {
    public static String getFilePrefix(String fileWholeName) {
        if (ToolUtil.isEmpty(fileWholeName)) {
            return "none";
        } else {
            int lastIndexOf = fileWholeName.lastIndexOf(".");
            return fileWholeName.substring(0, lastIndexOf);
        }
    }
}
