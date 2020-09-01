/**
 * 详情对话框
 */
var IrregularDatainfoInfoDlg = {
    data: {
        id: "",
        title: "",
        description: "",
        loadId: "",
        loadName: "",
        loadLocation: "",
        documentId: "",
        documentName: "",
        documentLocation: "",
        state: "",
        remark: "",
        createTime: "",
        createUser: "",
        shareTarget: "",
        isOpen: ""
    }
};

layui.use(['form', 'admin', 'ax', 'laydate', 'upload', 'formSelects', 'selectPlus'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;
    var selectPlus = layui.selectPlus;


    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/irregularDatainfo/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('irregularDatainfoForm', result.data);
    $("#fileNameTip").html(result.data.loadName);
    $("#documentNameTip").html(result.data.documentName);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/irregularDatainfo/shareItem", function (data) {
            if (data.code === 500) {
                Feng.error(data.message)
                return false;
            } else {
                Feng.success("更新成功！");
                window.location.href = Feng.ctxPath + '/irregularDatainfo'
            }
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/irregularDatainfo'
    });

    //获取用户列表信息，填充多选框
    var ajax1 = new $ax(Feng.ctxPath + "/algorithm/userList");
    var result1 = ajax1.start();

    console.log("shareTarget:" + result.data.shareTarget)
    //初始化多选
    var test = selectPlus.render({
        el: '#multiSelect',
        data: result1.data,
        valueName: "id",
        values: result.data.shareTarget.split(","),
        valueSeparator: " --- "
    });

    selectPlus.on('selectPlus(multiSelect)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.values); //选中的数据
        console.log(obj.checkedData); //选中的相关数据
        console.log(obj.isAll); //是否是全选
        console.log(obj.ele); //点击的DOM
        $("#shareTarget").val(obj.values);
    });
});