/**
 * 添加或者修改页面
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
        remark: ""
    }
};

layui.use(['form', 'admin', 'ax', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;


//上传服务文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/file/server/upload'
        , accept: 'file'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $("#fileNameTip").html(file.name);
                $("#loadName").val(file.name);
            });
        }
        , done: function (res) {
            $("#loadLocation").val(res.data.fileSavePath);
            $("#loadId").val(res.data.fileId);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传算法文件失败！");
        }
    });


//上传算法说明文档
    upload.render({
        elem: '#documentBtn'
        , url: Feng.ctxPath + '/file/serverDocument/upload'
        , accept: 'file'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $("#documentNameTip").html(file.name);
                $("#documentName").val(file.name);
            });
        }
        , done: function (res) {
            $("#documentLocation").val(res.data.fileSavePath);
            $("#documentId").val(res.data.fileId);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传文件失败！");
        }
    });

    // 下载算法文件
    $('#fileDownBtn').click(function () {
        var loadId = $("#loadId").val();
        if (loadId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/server/download/" + loadId;
    });

    // 下载算法说明文件
    $('#documentDownBtn').click(function () {
        var documentId = $("#documentId").val();
        if (documentId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/serverDocument/download/" + documentId;
    });


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/server/addItem", function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/server'
        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/server'
    });

});