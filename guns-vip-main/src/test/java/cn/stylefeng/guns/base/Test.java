package cn.stylefeng.guns.base;

import cn.hutool.core.thread.ThreadUtil;
import net.bytebuddy.agent.VirtualMachine;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * @ Author     ：wangyue.
 * @ Date       ：Created in 9:18 2020/5/25
 * @ Description：
 * @ Modified By：
 * java的Runtime.getRuntime().exec(commandStr)可以调用执行cmd指令。
 * <p>
 * cmd /c dir 是执行完dir命令后关闭命令窗口。 cmd /k dir 是执行完dir命令后不关闭命令窗口。
 * <p>
 * cmd /c start dir 会打开一个新窗口后执行dir指令，原窗口会关闭。
 * <p>
 * cmd /k start dir 会打开一个新窗口后执行dir指令，原窗口不会关闭。
 * <p>
 * 可以用cmd /?查看帮助信息。
 * <p>
 * ★CMD命令★
 * <p>
 * 1. gpedit.msc-----组策略
 * <p>
 * 2. sndrec32-------录音机
 * <p>
 * 3. Nslookup-------IP地址侦测器
 * <p>
 * 4. explorer-------打开资源管理器
 * <p>
 * 5. logoff---------注销命令
 * <p>
 * 6. tsshutdn-------60秒倒计时关机命令
 * <p>
 * 7. lusrmgr.msc----本机用户和组
 * <p>
 * 8. services.msc---本地服务设置
 * <p>
 * 9. oobe/msoobe /a----检查XP是否激活
 * <p>
 * 10. notepad--------打开记事本
 * <p>
 * 11. cleanmgr-------垃圾整理
 * <p>
 * 12. net start messenger----开始信使服务
 * <p>
 * 13. compmgmt.msc---计算机管理
 * <p>
 * 14. net stop messenger-----停止信使服务
 * <p>
 * 15. conf-----------启动netmeeting
 * <p>
 * 16. dvdplay--------DVD播放器
 * <p>
 * 17. charmap--------启动字符映射表
 * <p>
 * 18. diskmgmt.msc---磁盘管理实用程序
 * <p>
 * 19. calc-----------启动计算器
 * <p>
 * 20. dfrg.msc-------磁盘碎片整理程序
 * <p>
 * 21. chkdsk.exe-----Chkdsk磁盘检查
 * <p>
 * 22. devmgmt.msc--- 设备管理器
 * <p>
 * 23. regsvr32 /u *.dll----停止dll文件运行
 * <p>
 * 24. drwtsn32------ 系统医生
 * <p>
 * 25. rononce -p ----15秒关机
 * <p>
 * 26. dxdiag---------检查DirectX信息
 * <p>
 * 27. regedt32-------注册表编辑器
 * <p>
 * 28. Msconfig.exe---系统配置实用程序
 * <p>
 * 29. rsop.msc-------组策略结果集
 * <p>
 * 30. mem.exe--------显示内存使用情况
 * <p>
 * 31. regedit.exe----注册表
 * <p>
 * 32. winchat--------XP自带局域网聊天
 * <p>
 * 33. progman--------程序管理器
 * <p>
 * 34. winmsd---------系统信息
 * <p>
 * 35. perfmon.msc----计算机性能监测程序
 * <p>
 * 36. winver---------检查Windows版本
 * <p>
 * 37. sfc /scannow-----扫描错误并复原
 * <p>
 * 38. taskmgr-----任务管理器（2000／xp／2003）
 * <p>
 * 39. winver---------检查Windows版本
 * <p>
 * 40. wmimgmt.msc----打开windows管理体系结构(WMI)
 * <p>
 * 41. wupdmgr--------windows更新程序
 * <p>
 * 42. wscript--------windows脚本宿主设置
 * <p>
 * 43. write----------写字板
 * <p>
 * 44. winmsd---------系统信息
 * <p>
 * 45. wiaacmgr-------扫描仪和照相机向导
 * <p>
 * 46. winchat--------XP自带局域网聊天
 * <p>
 * 47. mem.exe--------显示内存使用情况
 * <p>
 * 48. Msconfig.exe---系统配置实用程序
 * <p>
 * 49. mplayer2-------简易widnows media player
 * <p>
 * 50. mspaint--------画图板
 * <p>
 * 51. mstsc----------远程桌面连接
 * <p>
 * 52. mplayer2-------媒体播放机
 * <p>
 * 53. magnify--------放大镜实用程序
 * <p>
 * 54. mmc------------打开控制台
 * <p>
 * 55. mobsync--------同步命令
 * <p>
 * 56. dxdiag---------检查DirectX信息
 * <p>
 * 57. drwtsn32------ 系统医生
 * <p>
 * 58. devmgmt.msc--- 设备管理器
 * <p>
 * 59. dfrg.msc-------磁盘碎片整理程序
 * <p>
 * 60. diskmgmt.msc---磁盘管理实用程序
 * <p>
 * 61. dcomcnfg-------打开系统组件服务
 * <p>
 * 62. ddeshare-------打开DDE共享设置
 * <p>
 * 63. dvdplay--------DVD播放器
 * <p>
 * 64. net stop messenger-----停止信使服务
 * <p>
 * 65. net start messenger----开始信使服务
 * <p>
 * 66. notepad--------打开记事本
 * <p>
 * 67. nslookup-------网络管理的工具向导
 * <p>
 * 68. ntbackup-------系统备份和还原
 * <p>
 * 69. narrator-------屏幕“讲述人”
 * <p>
 * 70. ntmsmgr.msc----移动存储管理器
 * <p>
 * 71. ntmsoprq.msc---移动存储管理员操作请求
 * <p>
 * 72. netstat -an----(TC)命令检查接口
 * <p>
 * 73. syncapp--------创建一个公文包
 * <p>
 * 74. sysedit--------系统配置编辑器
 * <p>
 * 75. sigverif-------文件签名验证程序
 * <p>
 * 76. sndrec32-------录音机
 * <p>
 * 77. shrpubw--------创建共享文件夹
 * <p>
 * 78. secpol.msc-----本地安全策略
 * <p>
 * 79. syskey---------系统加密，一旦加密就不能解开，保护windows xp系统的双重密码
 * <p>
 * 80. services.msc---本地服务设置
 * <p>
 * 81. Sndvol32-------音量控制程序
 * <p>
 * 82. sfc.exe--------系统文件检查器
 * <p>
 * 83. sfc /scannow---windows文件保护
 * <p>
 * 84. tsshutdn-------60秒倒计时关机命令
 * <p>
 * 84. tsshutdn-------60秒倒计时关机命令
 * <p>
 * 85. tourstart------xp简介（安装完成后出现的漫游xp程序）
 * <p>
 * 86. taskmgr--------任务管理器
 * <p>
 * 87. eventvwr-------事件查看器
 * <p>
 * 88. eudcedit-------造字程序
 * <p>
 * 89. explorer-------打开资源管理器
 * <p>
 * 90. packager-------对象包装程序
 * <p>
 * 91. perfmon.msc----计算机性能监测程序
 * <p>
 * 92. progman--------程序管理器
 * <p>
 * 93. regedit.exe----注册表
 * <p>
 * 94. rsop.msc-------组策略结果集
 * <p>
 * 95. regedt32-------注册表编辑器
 * <p>
 * 96. rononce -p ----15秒关机
 * <p>
 * 97. regsvr32 /u *.dll----停止dll文件运行
 * <p>
 * 98. regsvr32 /u zipfldr.dll------取消ZIP支持
 * <p>
 * 99. cmd.exe--------CMD命令提示符
 * <p>
 * 100. chkdsk.exe-----Chkdsk磁盘检查
 * <p>
 * 101. certmgr.msc----证书管理实用程序
 * <p>
 * 102. calc-----------启动计算器
 * <p>
 * 103. charmap--------启动字符映射表
 * <p>
 * 104. cliconfg-------SQL SERVER 客户端网络实用程序
 * <p>
 * 105. Clipbrd--------剪贴板查看器
 * <p>
 * 106. conf-----------启动netmeeting
 * <p>
 * 107. compmgmt.msc---计算机管理
 * <p>
 * 108. cleanmgr-------垃圾整理
 * <p>
 * 109. ciadv.msc------索引服务程序
 * <p>
 * 110. osk------------打开屏幕键盘
 * <p>
 * 111. odbcad32-------ODBC数据源管理器
 * <p>
 * 112. oobe/msoobe /a----检查XP是否激活
 * <p>
 * 113. lusrmgr.msc----本机用户和组
 * <p>
 * 114. logoff---------注销命令
 * <p>
 * 115. iexpress-------木马捆绑工具，系统自带
 * <p>
 * 116. Nslookup-------IP地址侦测器
 * <p>
 * 117. fsmgmt.msc-----共享文件夹管理器
 * <p>
 * 118. utilman--------辅助工具管理器
 * <p>
 * 119. gpedit.msc-----组策略等命令。
 */
public class Test {
    public static void main(String[] args) throws IOException {
        Process startup = Runtime.getRuntime().exec("cmd /c start D:\\software\\tomcat\\apache-tomcat-8.0.46-windows-x64\\apache-tomcat-8.0.46\\bin\\startup.bat start", null, new File("D:\\software\\tomcat\\apache-tomcat-8.0.46-windows-x64\\apache-tomcat-8.0.46\\"));
//        int exitValue = startup.exitValue();
//        System.out.println("exitValue:"+exitValue);
//        boolean alive = startup.isAlive();
//        System.out.println("alive:"+alive);
//        Process shutdown = Runtime.getRuntime().exec("cmd /c start D:\\software\\tomcat\\apache-tomcat-8.0.46-windows-x64\\apache-tomcat-8.0.46\\bin\\shutdown.bat start", null, new File("D:\\software\\tomcat\\apache-tomcat-8.0.46-windows-x64\\apache-tomcat-8.0.46\\"));
//        System.out.println("exitValue:"+ startup.exitValue());
//        System.out.println("alive:"+startup.isAlive());
    }


}
