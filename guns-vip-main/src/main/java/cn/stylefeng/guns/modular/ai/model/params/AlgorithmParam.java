package cn.stylefeng.guns.modular.ai.model.params;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import cn.stylefeng.roses.kernel.model.validator.BaseValidatingParam;

import java.util.Date;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <p>
 *
 * </p>
 *
 * @author wangyue
 * @since 2020-07-02
 */
@Data
public class AlgorithmParam implements Serializable, BaseValidatingParam {

    private static final long serialVersionUID = 1L;


    /**
     * ID
     */
    private Integer id;

    /**
     * 算法编号
     */
    private String algCode;

    /**
     * 算法名称
     */
    private String algName;

    /**
     * 算法描述
     */
    private String description;

    /**
     * 使用范围
     */
    private String ranged;

    /**
     * 算法版本
     */
    private String version;

    /**
     * 算法文件保存地址（上传文件）
     */
    private String loadLocation;

    /**
     * 算法使用文档说明（上传文件）
     */
    private String documentLocation;

    /**
     * 数据归属（逆变器数据、气象数据等）
     */
    private String dataOwner;

    /**
     * 入参说明
     */
    private String inParams;

    /**
     * 结果说明
     */
    private String result;

    /**
     * 状态（数据字典维护:新建、已提交、已审核等）
     */
    private String state;

    /**
     * 算法创建者
     */
    private Long createUser;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 算法审核人员
     */
    private Long reviewer;

    /**
     * 审核时间
     */
    private Date reviewTime;

    /**
     * 审核意见
     */
    private String reviewOpinion;

    /**
     * 分享对象
     */
    private String shareTarget;

    /**
     * 备注
     */
    private String remark;

    @Override
    public String checkParam() {
        return null;
    }



    /**
     * 是否公开
     */
    private String isOpen;


    private String loadId;


    private String loadName;

    private String documentId;


    private String documentName;


}
