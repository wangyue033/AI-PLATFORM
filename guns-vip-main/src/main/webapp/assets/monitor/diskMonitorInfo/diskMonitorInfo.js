layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 磁盘监控管理
     */
    var DiskMonitorInfo = {
        tableId: "diskMonitorInfoTable"
    };

    /**
     * 初始化表格的列
     */
    DiskMonitorInfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'createTime', sort: true, title: '记录时间'},
            {field: 'dataTip', sort: true, title: '数据标识'},
            {field: 'serverName', sort: true, title: '服务器名称'},
            {field: 'ipAddress', sort: true, title: 'IP地址'},
            {field: 'dirName', sort: true, title: '盘符路径'},
            {field: 'sysTypeName', sort: true, title: '盘符类型'},
            {field: 'typeName', sort: true, title: '文件类型'},
            {field: 'total', sort: true, title: '总大小'},
            {field: 'free', sort: true, title: '剩余大小'},
            {field: 'used', sort: true, title: '已使用量'},
            {field: 'diskUsage', sort: true, title: '使用率'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    DiskMonitorInfo.search = function () {
        var queryData = {};

        queryData['dataTip'] = $('#dataTip').val();

        table.reload(DiskMonitorInfo.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    DiskMonitorInfo.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/diskMonitorInfo/add'
    };

    /**
    * 跳转到编辑页面
    *
    * @param data 点击按钮时候的行数据
    */
    DiskMonitorInfo.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/diskMonitorInfo/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    DiskMonitorInfo.exportExcel = function () {
        var checkRows = table.checkStatus(DiskMonitorInfo.tableId);
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
    DiskMonitorInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/diskMonitorInfo/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(DiskMonitorInfo.tableId);
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
        elem: '#' + DiskMonitorInfo.tableId,
        url: Feng.ctxPath + '/diskMonitorInfo/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: DiskMonitorInfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        DiskMonitorInfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    DiskMonitorInfo.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        DiskMonitorInfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + DiskMonitorInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            DiskMonitorInfo.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            DiskMonitorInfo.onDeleteItem(data);
        }
    });
});
