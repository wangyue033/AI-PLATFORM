/**
 * 添加或者修改页面
 */
var dataSearchInfoDlg = {
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


layui.use(['layer', 'ax', 'form', 'laydate', 'element', 'table', 'jquery', 'formSelects'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;
    var element = layui.element;
    var table = layui.table;
    var jquery = layui.jquery;

    var Code = {
        tableNames: "",
        dbId: "",
        tables: {},
        jumpTypeBounceSet: new Set()
    };


    table.render({
        elem: '#dbTableList'
        , url: Feng.ctxPath + '/dataSearch/tableList'
        , page: false
        , cols: [[
            {type: 'checkbox'}
            , {field: 'tableName', title: '表的名称'}
            , {field: 'tableComment', title: '表的名称注释'}
            , {toolbar: '#tableBar', title: '操作'}
        ]]
    });

    //监听跳转类型操作
    form.on('switch(jumpTypeFilter)', function (obj) {
        obj.elem.checked ? Code.jumpTypeBounceSet.add(obj.elem.value) : Code.jumpTypeBounceSet.delete(obj.elem.value);
        layer.tips(obj.elem.checked ? '新增修改页面弹框展示' : '新增修改页面页面跳转展示', obj.othis);
    });

    table.on('checkbox(dbTableList)', function (obj) {
        var checkStatus = table.checkStatus('dbTableList');
        var tableNames = "";
        for (var tableItem in checkStatus.data) {
            tableNames += "CAT" + checkStatus.data[tableItem].tableName;
        }
        Code.tableNames = tableNames;

        //选中行后，显示对应的操作按钮
        if (obj.type === "all") {
            if (obj.checked) {
                $("a[name='con-btn']").removeClass("layui-hide");
                $("a[name='param-box']").removeClass("layui-hide");
                $("div[name='jumpTypeDiv']").removeClass("layui-hide");
            } else {
                $("a[name='con-btn']").addClass("layui-hide");
                $("a[name='param-box']").addClass("layui-hide");
                $("div[name='jumpTypeDiv']").addClass("layui-hide");
            }
        } else {
            if (obj.checked) {
                $("#" + obj.data.tableName + "_opt").removeClass("layui-hide");
                $("#" + obj.data.tableName + "_pbt").removeClass("layui-hide");
                $("#" + obj.data.tableName + "_jt").removeClass("layui-hide");

            } else {
                $("#" + obj.data.tableName + "_opt").addClass("layui-hide");
                $("#" + obj.data.tableName + "_pbt").addClass("layui-hide");
                $("#" + obj.data.tableName + "_jt").addClass("layui-hide");
            }
        }
    });

    table.on('tool(dbTableList)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'conditionEdit') {
            top.layer.open({
                type: 2,
                title: '选择字段',
                area: ['900px', '600px'],
                content: Feng.ctxPath + '/dataSearch/tableFields?dbId=' + Code.dbId + "&tableName=" + data.tableName
            });
        }
    });



    form.on('select(id)', function (data) {
        var dbId = data.value;
        Code.dbId = dbId;
        table.reload("dbTableList", {where: {dbId: dbId}});
    });


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/dataSearch/search", function (data) {
            Feng.success("添加成功！" + data);
        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();
        return false;
    });


});