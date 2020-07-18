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

layui.use(['form', 'admin', 'ax', 'laydate', 'upload', 'formSelects', 'selectPlus'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;
    var selectPlus = layui.selectPlus;


//上传模型文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/file/model/upload'
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
            Feng.error("上传模型文件失败！");
        }
    });


//上传模型说明文档
    upload.render({
        elem: '#documentBtn'
        , url: Feng.ctxPath + '/file/modelDocument/upload'
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
    $("#fileNameTip").html(result.data.loadName);
    $("#documentNameTip").html(result.data.documentName);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/model/shareItem", function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/model'
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/model'
    });


    //获取用户列表信息，填充多选框
    var ajax1 = new $ax(Feng.ctxPath + "/algorithm/userList");
    var result1= ajax1.start();

    console.log("shareTarget:"+result.data.shareTarget)
    //初始化多选
    var test = selectPlus.render({
        el: '#multiSelect',
        data: result1.data,
        valueName: "name",
        values: result.data.shareTarget.split(","),
        valueSeparator: " --- "
    });

    selectPlus.on('selectPlus(multiSelect)', function (obj) {
        // console.log(obj.checked); //当前是否选中状态
        // console.log(obj.values); //选中的数据
        // console.log(obj.checkedData); //选中的相关数据
        // console.log(obj.isAll); //是否是全选
        // console.log(obj.ele); //点击的DOM
        $("#shareTarget").val(obj.values);
    });


});