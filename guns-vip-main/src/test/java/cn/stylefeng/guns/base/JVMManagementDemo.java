package cn.stylefeng.guns.base;

import cn.hutool.system.*;

/**
 * @ Author     ：wangyue.
 * @ Date       ：Created in 17:31 2020/5/27
 * @ Description：
 * @ Modified By：
 */
public class JVMManagementDemo {
    public static void main(String[] args) {
        RuntimeInfo runtimeInfo = SystemUtil.getRuntimeInfo();
        System.out.println("runtimeInfo:"+runtimeInfo);
        JavaRuntimeInfo javaRuntimeInfo = SystemUtil.getJavaRuntimeInfo();
        System.out.println("javaRuntimeInfo:"+javaRuntimeInfo);
        JavaInfo javaInfo = SystemUtil.getJavaInfo();
        System.out.println("javaInfo:"+javaInfo);
        JavaSpecInfo javaSpecInfo = SystemUtil.getJavaSpecInfo();
        System.out.println("javaSpecInfo:"+javaSpecInfo);
        JvmInfo jvmInfo = SystemUtil.getJvmInfo();
        System.out.println("jvmInfo:"+jvmInfo);
        JvmSpecInfo jvmSpecInfo = SystemUtil.getJvmSpecInfo();
        System.out.println("jvmSpecInfo:"+jvmSpecInfo);
    }
}
