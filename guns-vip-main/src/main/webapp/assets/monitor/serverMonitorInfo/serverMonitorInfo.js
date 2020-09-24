layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 服务器监控管理
     */
    var ServerMonitorInfo = {
        tableId: "serverMonitorInfoTable"
    };

    /**
     * 初始化表格的列
     */
    ServerMonitorInfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'createTime', sort: true, title: '记录时间'},
            {field: 'dataTip', sort: true, title: '数据标识'},
            {field: 'serverName', sort: true, title: '服务器名称'},
            {field: 'ipAddress', sort: true, title: 'IP地址'},
            {field: 'userDir', sort: true, title: '项目路径'},
            {field: 'operationSystem', sort: true, title: '操作系统'},
            {field: 'systemArch', sort: true, title: '系统架构'},
            {field: 'cpuNum', sort: true, title: 'CPU核心数'},
            {field: 'cpuTotal', sort: true, title: 'CPU总使用量'},
            {field: 'cpuSys', sort: true, title: ' CPU系统使用率'},
            {field: 'cpuUsed', sort: true, title: 'CPU用户使用率'},
            {field: 'cpuUsage', sort: true, title: 'CPU使用量'},
            {field: 'cpuWait', sort: true, title: 'CPU当前等待率'},
            {field: 'cpuFree', sort: true, title: 'cpu空闲率'},
            {field: 'memoTotal', sort: true, title: '总内存(G)'},
            {field: 'memoUsed', sort: true, title: '已用内存(G)'},
            {field: 'memoFree', sort: true, title: '剩余内存(G)'},
            {field: 'memoUsage', sort: true, title: '内存使用率'},
            {field: 'jvmTotal', sort: true, title: '当前JVM占用的内存总数(M)'},
            {field: 'jvmMax', sort: true, title: 'JVM最大可用内存总数(M)'},
            {field: 'jvmFree', sort: true, title: 'JVM空闲内存(M)'},
            {field: 'jvmVersion', sort: true, title: 'JDK版本'},
            {field: 'jvmHome', sort: true, title: 'JDK路径'}
            // {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    ServerMonitorInfo.search = function () {
        var queryData = {};

        queryData['dataTip'] = $('#dataTip').val();

        table.reload(ServerMonitorInfo.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    ServerMonitorInfo.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/serverMonitorInfo/add'
    };

    /**
    * 跳转到编辑页面
    *
    * @param data 点击按钮时候的行数据
    */
    ServerMonitorInfo.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/serverMonitorInfo/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    ServerMonitorInfo.exportExcel = function () {
        var checkRows = table.checkStatus(ServerMonitorInfo.tableId);
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
    ServerMonitorInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/serverMonitorInfo/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(ServerMonitorInfo.tableId);
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
        elem: '#' + ServerMonitorInfo.tableId,
        url: Feng.ctxPath + '/serverMonitorInfo/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: ServerMonitorInfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        ServerMonitorInfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    ServerMonitorInfo.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        ServerMonitorInfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + ServerMonitorInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            ServerMonitorInfo.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            ServerMonitorInfo.onDeleteItem(data);
        }
    });
});
