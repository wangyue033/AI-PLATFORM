layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 算法日志管理
     */
    var AlgorithmLog = {
        tableId: "algorithmLogTable"
    };

    /**
     * 初始化表格的列
     */
    AlgorithmLog.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', title: '主键'},
            {field: 'logType', sort: true, title: '日志类型'},
            {field: 'logName', sort: true, title: '日志名称'},
            {field: 'userId', sort: true, title: '用户id'},
            {field: 'className', sort: true, title: '类名称'},
            {field: 'method', sort: true, title: '方法名称'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'succeed', sort: true, title: '是否成功'},
            {field: 'message', sort: true, title: '备注'},
            {field: 'processTime', sort: true, title: '处理时间(ms)'},
            {field: 'optType', sort: true, title: '操作类型'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    AlgorithmLog.search = function () {
        var queryData = {};
        queryData['logName'] = $('#logName').val();

        table.reload(AlgorithmLog.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    AlgorithmLog.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/algorithmLog/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    AlgorithmLog.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/algorithmLog/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    AlgorithmLog.exportExcel = function () {
        var checkRows = table.checkStatus(AlgorithmLog.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    AlgorithmLog.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/algorithmLog/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(AlgorithmLog.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + AlgorithmLog.tableId,
        url: Feng.ctxPath + '/algorithmLog/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: AlgorithmLog.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        AlgorithmLog.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        AlgorithmLog.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        AlgorithmLog.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + AlgorithmLog.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            AlgorithmLog.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            AlgorithmLog.onDeleteItem(data);
        }
    });
});
