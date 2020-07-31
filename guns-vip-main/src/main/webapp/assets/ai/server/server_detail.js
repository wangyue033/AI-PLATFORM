/**
 * 详情对话框
 */
var ServerInfoDlg = {
    data: {
        id: "",
        serverCode: "",
        serverName: "",
        algorithmId: "",
        modelId: "",
        description: "",
        ranged: "",
        version: "",
        loadId: "",
        loadName: "",
        loadLocation: "",
        documentId: "",
        documentName: "",
        documentLocation: "",
        deployUse: "",
        containerId: "",
        dataOwner: "",
        inParams: "",
        result: "",
        serverAddress: "",
        serverMonitor: "",
        state: "",
        createUser: "",
        createTime: "",
        reviewer: "",
        reviewTime: "",
        reviewOpinion: "",
        deployTime: "",
        deployer: "",
        remark: "",
        isOpen: ""
    }
};

layui.use(['form', 'admin', 'ax','laydate','upload','formSelects'], function () {
    console.log("server in");
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;

    // 下载服务文件
    $('#fileDownBtn').click(function () {
        var loadId = $("#loadId").val();
        if (loadId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/server/download/" + loadId;
    });

    // 下载服务说明文件
    $('#documentDownBtn').click(function () {
        var documentId = $("#documentId").val();
        if (documentId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/serverDocument/download/" + documentId;
    });




    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/server/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('serverForm', result.data);
    $("#fileNameTip").html(result.data.loadName);
    $("#documentNameTip").html(result.data.documentName);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/server/reviewItem", function (data) {
            Feng.success("操作成功！");
            window.location.href = Feng.ctxPath + '/server'
        }, function (data) {
            Feng.error("操作失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/server'
    });
});