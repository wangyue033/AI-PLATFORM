layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 数据处理管理
     */
    var DataOptInfo = {
        tableId: "dataOptInfoTable"
    };

    /**
     * 初始化表格的列
     */
    DataOptInfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'databaseId', hide: true, sort: true, title: '数据源ID'},
            {field: 'title', sort: true, title: '数据源标题'},
            {field: 'tableName', sort: true, title: '表名'},
            {field: 'optType', sort: true, title: '操作类型'},
            {field: 'preData', sort: true, title: '变更前数据'},
            {field: 'edData', sort: true, title: '变更后数据'},
            {field: 'reason', sort: true, title: '变更原因'},
            {field: 'ddlSql', sort: true, title: '操作语句'},
            {field: 'remark', sort: true, title: '备注'},
            {field: 'createTime', sort: true, title: '操作时间'},
            {field: 'createUser', hide: true, sort: true, title: '操作人员'},
            {field: 'createUserName', sort: true, title: '操作人员'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    DataOptInfo.search = function () {
        var queryData = {};

        queryData['tableName'] = $('#tableName').val();

        table.reload(DataOptInfo.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    DataOptInfo.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/dataOptInfo/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    DataOptInfo.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/dataOptInfo/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    DataOptInfo.exportExcel = function () {
        var checkRows = table.checkStatus(DataOptInfo.tableId);
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
    DataOptInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dataOptInfo/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(DataOptInfo.tableId);
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
        elem: '#' + DataOptInfo.tableId,
        url: Feng.ctxPath + '/dataOptInfo/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: DataOptInfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        DataOptInfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        DataOptInfo.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        DataOptInfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + DataOptInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            DataOptInfo.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            DataOptInfo.onDeleteItem(data);
        }
    });
});
