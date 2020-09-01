/**
 * 详情对话框
 */
var DatabaseDatainfoInfoDlg = {
    data: {
        id: "",
        title: "",
        dbType: "",
        jdbcDriver: "",
        dbName: "",
        version: "",
        jdbcUrl: "",
        userName: "",
        password: "",
        state: "",
        remark: "",
        createTime: "",
        createUser: "",
        shareTarget: ""
    }
};

layui.use(['form', 'admin', 'ax', 'laydate', 'upload', 'formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;


    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/databaseDatainfo/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('databaseDatainfoForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/databaseDatainfo/editItem", function (data) {
            if (data.code === 500) {
                Feng.error(data.message)
                return false;
            } else {
                Feng.success("更新成功！");
                window.location.href = Feng.ctxPath + '/databaseDatainfo'
            }
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function () {
        window.location.href = Feng.ctxPath + '/databaseDatainfo'
    });
});