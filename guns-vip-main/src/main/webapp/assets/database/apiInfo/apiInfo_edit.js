/**
 * 详情对话框
 */
var ApiInfoInfoDlg = {
    data: {
        id: "",
        title: "",
        apiAddress: "",
        inParams: "",
        result: "",
        apiDesc: "",
        documentId: "",
        documentName: "",
        documentLocation: "",
        state: "",
        remark: "",
        createUser: "",
        createTime: "",
        shareTarget: "",
        isOpen: ""
    }
};

layui.use(['form', 'admin', 'ax', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;


//上传API说明文档
    upload.render({
        elem: '#documentBtn'
        , url: Feng.ctxPath + '/file/apiInfoDocument/upload'
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

    // 下载api说明文件
    $('#documentDownBtn').click(function () {
        var documentId = $("#documentId").val();
        if (documentId === "") {
            Feng.error("请先上传文件");
            return
        }
        window.location.href = Feng.ctxPath + "/file/apiInfoDocument/download/" + documentId;
    });


    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/apiInfo/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('apiInfoForm', result.data);
    $("#documentNameTip").html(result.data.documentName);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/apiInfo/editItem", function (data) {
            if (data.code === 500) {
                Feng.error(data.message)
                return false;
            } else {
                Feng.success("更新成功！");
                window.location.href = Feng.ctxPath + '/apiInfo'
            }
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/apiInfo'
    });
});