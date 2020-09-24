/**
 * 详情对话框
 */
var DiskMonitorInfoInfoDlg = {
    data: {
        id: "",
        dataTip: "",
        serverName: "",
        ipAddress: "",
        dirName: "",
        sysTypeName: "",
        typeName: "",
        total: "",
        free: "",
        used: "",
        diskUsage: "",
        createTime: ""
    }
};

layui.use(['form', 'admin', 'ax','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
































    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/diskMonitorInfo/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    form.val('diskMonitorInfoForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/diskMonitorInfo/editItem", function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + '/diskMonitorInfo'
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/diskMonitorInfo'
    });
});