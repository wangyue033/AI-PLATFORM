layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 服务容器管理
     */
    var Container = {
        tableId: "containerTable"
    };

    /**
     * 初始化表格的列
     */
    Container.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'containerCode', sort: true, title: '容器编号'},
            {field: 'containerName', sort: true, title: '容器名称'},
            {field: 'containerType', sort: true, title: '容器类型'},
            {field: 'containerVersion', sort: true, title: '版本号'},
            {field: 'containerLocation', hide: true, sort: true, title: '存放路径'},
            {field: 'serverHost', hide: true, sort: true, title: 'IP地址'},
            {field: 'serverPort', hide: true, sort: true, title: '端口号'},
            {field: 'serverAddress', sort: true, title: '访问地址', minWidth: 300},
            {field: 'account', hide: true, sort: true, title: '管理账户'},
            {field: 'password', hide: true, sort: true, title: '密码'},
            {field: 'status', sort: true, title: '当前状态'},
            {field: 'description', hide: true, sort: true, title: '使用描述'},
            {field: 'remark', hide: true, sort: true, title: '备注'},
            {field: 'createUser',hide: true, sort: true, title: '创建人员'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 300}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Container.search = function () {
        var queryData = {};

        queryData['containerCode'] = $('#containerCode').val();
        queryData['containerName'] = $('#containerName').val();
        queryData['serverHost'] = $('#serverHost').val();

        table.reload(Container.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    Container.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/container/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    Container.jumpEditPage = function (data) {
        if (data.status === "启动") {
            Feng.error("请先关闭容器之后再修改!");
            return
        }
        window.location.href = Feng.ctxPath + '/container/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    Container.exportExcel = function () {
        var checkRows = table.checkStatus(Container.tableId);
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
    Container.onDeleteItem = function (data) {
        if (data.status === "启动") {
            Feng.error("容器已启动，请关闭后再删除!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/container/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Container.tableId);
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
        elem: '#' + Container.tableId,
        url: Feng.ctxPath + '/container/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Container.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Container.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Container.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Container.exportExcel();
    });

    /**
     * 点击启动
     *
     * @param data 点击按钮时候的行数据
     */
    Container.onStartupItem = function (data) {
        if (data.status === "启动") {
            Feng.error("容器已启动，不要重复启动!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/container/startup", function (data) {
                Feng.success("正在启动，请稍后查看!");
                table.reload(Container.tableId);
            }, function (data) {
                Feng.error("启动失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否启动?", operation);
    };


    /**
     * 点击关闭
     *
     * @param data 点击按钮时候的行数据
     */
    Container.onShutdownItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/container/shutdown", function (data) {
                Feng.success("正在关闭容器!");
                table.reload(Container.tableId);
            }, function (data) {
                Feng.error("关闭失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否关闭容器?", operation);
    };

    /**
     * 跳转到查看页面
     */
    Container.onViewItem = function (data) {
        if (data.status !== "启动") {
            Feng.error("当前容器未启动，请先启动!");
            return
        }
        // window.location.href = data.serverAddress
        //新开页面
        // window.open(data.serverAddress)
        func.open({
            title: "查看服务容器: "+data.serverAddress,
            content: data.serverAddress,
            resize: true
        });
    };

    // 工具条点击事件
    table.on('tool(' + Container.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Container.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            Container.onDeleteItem(data);
        } else if (layEvent === 'startup') {
            Container.onStartupItem(data);
        } else if (layEvent === 'view') {
            Container.onViewItem(data);
        } else if (layEvent === 'shutdown') {
            Container.onShutdownItem(data);
        }
    });
});
