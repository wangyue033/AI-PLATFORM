package cn.stylefeng.guns.base;

import cn.hutool.crypto.SecureUtil;

/**
 * @ Author     ：wangyue.
 * @ Date       ：Created in 16:25 2020/6/17
 * @ Description：
 * @ Modified By：
 */
public class Md5Test {
    public static void main(String[] args) {
        String passwordCas = SecureUtil.md5("111111");
        System.out.println(passwordCas);
    }
}
