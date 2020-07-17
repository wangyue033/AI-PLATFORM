package cn.stylefeng.guns.modular.ai.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;

import java.beans.Transient;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;

import java.io.Serializable;

/**
 * <p>
 *
 * </p>
 *
 * @author wangyue
 * @since 2020-07-02
 */
@TableName("tb_algorithm")
public class Algorithm implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 算法编号
     */
    @TableField("alg_code")
    private String algCode;

    /**
     * 算法名称
     */
    @TableField("alg_name")
    private String algName;

    /**
     * 算法描述
     */
    @TableField("description")
    private String description;

    /**
     * 使用范围
     */
    @TableField("ranged")
    private String ranged;

    /**
     * 算法版本
     */
    @TableField("version")
    private String version;

    /**
     * 算法文件保存地址（上传文件）
     */
    @TableField("load_location")
    private String loadLocation;

    @TableField("load_id")
    private String loadId;


    @TableField("load_name")
    private String loadName;


    /**
     * 算法使用文档说明（上传文件）
     */
    @TableField("document_location")
    private String documentLocation;

    @TableField("document_id")
    private String documentId;


    @TableField("document_name")
    private String documentName;


    /**
     * 数据归属（逆变器数据、气象数据等）
     */
    @TableField("data_owner")
    private String dataOwner;

    /**
     * 入参说明
     */
    @TableField("in_params")
    private String inParams;

    /**
     * 结果说明
     */
    @TableField("result")
    private String result;

    /**
     * 状态（数据字典维护:新建、已提交、已审核等）
     */
    @TableField("state")
    private String state;


    /**
     * 是否公开
     */
    @TableField("is_open")
    private String isOpen;

    /**
     * 算法创建者
     */
    @TableField(value = "create_user", fill = FieldFill.INSERT)
    private Long createUser;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 算法审核人员
     */
    @TableField("reviewer")
    private Long reviewer;

    /**
     * 审核时间
     */
    @TableField("review_time")
    private Date reviewTime;

    /**
     * 审核意见
     */
    @TableField("review_opinion")
    private String reviewOpinion;

    /**
     * 分享对象
     */
    @TableField("share_target")
    private String shareTarget;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    @TableField(exist = false)
    private String reviewerName;

    @TableField(exist = false)
    private String createUserName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAlgCode() {
        return algCode;
    }

    public void setAlgCode(String algCode) {
        this.algCode = algCode;
    }

    public String getAlgName() {
        return algName;
    }

    public void setAlgName(String algName) {
        this.algName = algName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRanged() {
        return ranged;
    }

    public void setRanged(String ranged) {
        this.ranged = ranged;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getLoadLocation() {
        return loadLocation;
    }

    public void setLoadLocation(String loadLocation) {
        this.loadLocation = loadLocation;
    }

    public String getDocumentLocation() {
        return documentLocation;
    }

    public void setDocumentLocation(String documentLocation) {
        this.documentLocation = documentLocation;
    }

    public String getDataOwner() {
        return dataOwner;
    }

    public void setDataOwner(String dataOwner) {
        this.dataOwner = dataOwner;
    }

    public String getInParams() {
        return inParams;
    }

    public void setInParams(String inParams) {
        this.inParams = inParams;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getReviewer() {
        return reviewer;
    }

    public void setReviewer(Long reviewer) {
        this.reviewer = reviewer;
    }

    public Date getReviewTime() {
        return reviewTime;
    }

    public void setReviewTime(Date reviewTime) {
        this.reviewTime = reviewTime;
    }

    public String getReviewOpinion() {
        return reviewOpinion;
    }

    public void setReviewOpinion(String reviewOpinion) {
        this.reviewOpinion = reviewOpinion;
    }

    public String getShareTarget() {
        return shareTarget;
    }

    public void setShareTarget(String shareTarget) {
        this.shareTarget = shareTarget;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "Algorithm{" +
                "id=" + id +
                ", algCode=" + algCode +
                ", algName=" + algName +
                ", description=" + description +
                ", ranged=" + ranged +
                ", version=" + version +
                ", loadLocation=" + loadLocation +
                ", documentLocation=" + documentLocation +
                ", dataOwner=" + dataOwner +
                ", inParams=" + inParams +
                ", result=" + result +
                ", state=" + state +
                ", createUser=" + createUser +
                ", createTime=" + createTime +
                ", reviewer=" + reviewer +
                ", reviewTime=" + reviewTime +
                ", reviewOpinion=" + reviewOpinion +
                ", shareTarget=" + shareTarget +
                ", remark=" + remark +
                ", isOpen=" + isOpen +
                "}";
    }

    public String getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(String isOpen) {
        this.isOpen = isOpen;
    }

    public String getLoadId() {
        return loadId;
    }

    public void setLoadId(String loadId) {
        this.loadId = loadId;
    }

    public String getLoadName() {
        return loadName;
    }

    public void setLoadName(String loadName) {
        this.loadName = loadName;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getReviewerName() {
        return reviewerName;
    }

    public void setReviewerName(String reviewerName) {
        this.reviewerName = reviewerName;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }
}
