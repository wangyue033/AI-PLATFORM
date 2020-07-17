/**
 * 详情对话框
 */
var AlgorithmInfoDlg = {
    data: {
        id: "",
        algCode: "",
        algName: "",
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

layui.use(['form', 'admin', 'ax', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;


//上传算法文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/file/algorithm/upload'
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
        , url: Feng.ctxPath + '/file/algorithmDocument/upload'
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
        window.location.href = Feng.ctxPath + "/file/algorithm/download/" + loadId;
    });

    // 下载算法说明文件
    $('#documentDownBtn').click(function () {
        var documentId = $("#documentId").val();
        if (documentId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/algorithmDocument/download/" + documentId;
    });


    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/algorithm/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('algorithmForm', result.data);
    $("#fileNameTip").html(result.data.loadName);
    $("#documentNameTip").html(result.data.documentName);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/algorithm/upgradeItem", function (data) {
            Feng.success("升级成功！");
            window.location.href = Feng.ctxPath + '/algorithm'
        }, function (data) {
            Feng.error("升级失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/algorithm'
    });
});