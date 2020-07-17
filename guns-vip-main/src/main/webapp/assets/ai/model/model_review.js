/**
 * 详情对话框
 */
var ModelInfoDlg = {
    data: {
        id: "",
        modCode: "",
        modName: "",
        description: "",
        ranged: "",
        version: "",
        loadLocation: "",
        documentLocation: "",
        dataOwner: "",
        inParams: "",
        result: "",
        state: "",
        createUser: "",
        createTime: "",
        reviewer: "",
        reviewTime: "",
        reviewOpinion: "",
        shareTarget: "",
        remark: ""
    }
};

layui.use(['form', 'admin', 'ax','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;

    // 下载模型文件
    $('#fileDownBtn').click(function () {
        var loadId = $("#loadId").val();
        if (loadId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/model/download/" + loadId;
    });

    // 下载模型说明文件
    $('#documentDownBtn').click(function () {
        var documentId = $("#documentId").val();
        if (documentId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/modelDocument/download/" + documentId;
    });





    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/model/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('modelForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/model/reviewItem", function (data) {
            Feng.success("操作成功！");
            window.location.href = Feng.ctxPath + '/model'
        }, function (data) {
            Feng.error("操作失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/model'
    });
});