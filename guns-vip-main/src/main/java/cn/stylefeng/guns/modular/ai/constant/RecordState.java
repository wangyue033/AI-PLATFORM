package cn.stylefeng.guns.modular.ai.constant;


/**
 * @ Author     ：wangyue.
 * @ Date       ：Created in 15:29 2020/7/6
 * @ Description：
 * @ Modified By：
 */
public enum RecordState {
    SUBMITING(1, "待提交"),
    CHECKING(2, "待审核"),
    PASS(3, "审核通过"),
    UN_PASS(4, "审核不通过"),
    DELETED(5, "DELETED");

    int code;
    String message;

    RecordState(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static String valueOf(Integer status) {
        if (status == null) {
            return "";
        } else {
            for (RecordState s : RecordState.values()) {
                if (s.getCode() == status) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }
}
