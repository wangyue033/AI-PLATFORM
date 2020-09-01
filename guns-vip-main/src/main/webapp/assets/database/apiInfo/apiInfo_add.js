/**
 * 添加或者修改页面
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

layui.use(['form', 'admin', 'ax','laydate','upload','formSelects'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;






































    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/apiInfo/addItem", function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/apiInfo'
        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    $('#cancel').click(function(){
        window.location.href = Feng.ctxPath + '/apiInfo'
    });

});