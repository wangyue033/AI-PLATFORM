layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 数据库管理管理
     */
    var DatabaseDatainfo = {
        tableId: "databaseDatainfoTable"
    };

    /**
     * 初始化表格的列
     */
    DatabaseDatainfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'title', sort: true, title: '标题'},
            {field: 'dbType', sort: true, title: '数据库类型'},
            {field: 'jdbcDriver', sort: true, hide: true, title: '驱动类型'},
            {field: 'dbName', sort: true, title: '数据库名称'},
            {field: 'version', sort: true, hide: true, title: '版本号'},
            {field: 'jdbcUrl', sort: true, title: '连接地址'},
            {field: 'userName', sort: true, hide: true, title: '连接账号'},
            {field: 'password', sort: true, hide: true, title: '连接密码'},
            {
                field: 'isOpen', sort: true, title: '是否公开', templet: function (d) {
                    if (d.isOpen === 'on') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'state', sort: true, hide: true, title: '状态'},
            {field: 'remark', sort: true, hide: true, title: '备注'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'createUser', sort: true, hide: true, title: '创建人员编号'},
            {field: 'createUserName', sort: true, title: '创建人员'},
            {field: 'shareTarget', sort: true, hide: true, title: '分享对象'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 400}
        ]];
    };

    /**
     * 点击查询按钮
     */
    DatabaseDatainfo.search = function () {
        var queryData = {};

        queryData['title'] = $('#title').val();

        table.reload(DatabaseDatainfo.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    DatabaseDatainfo.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/databaseDatainfo/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    DatabaseDatainfo.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/databaseDatainfo/edit?id=' + data.id
    };

    /**
     * 跳转到分享页面
     *
     * @param data 点击按钮时候的行数据
     */
    DatabaseDatainfo.jumpShareItem = function (data) {
        window.location.href = Feng.ctxPath + '/databaseDatainfo/share?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    DatabaseDatainfo.exportExcel = function () {
        var checkRows = table.checkStatus(DatabaseDatainfo.tableId);
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
    DatabaseDatainfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/databaseDatainfo/delete", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("删除成功!");
                    table.reload(DatabaseDatainfo.tableId);
                }
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    /**
     * 点击连接
     *
     * @param data 点击按钮时候的行数据
     */
    DatabaseDatainfo.onConnectItem = function (data) {
        if (data.dbType === "opentsdb") {
            func.open({
                title: "opentsdb访问地址: " + data.jdbcUrl,
                content: data.jdbcUrl,
                resize: true
            });
            return
        }

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/databaseDatainfo/connect", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("连接成功!");
                    table.reload(DatabaseDatainfo.tableId);
                }
            }, function (data) {
                Feng.error("连接失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否测试连接?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + DatabaseDatainfo.tableId,
        url: Feng.ctxPath + '/databaseDatainfo/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: DatabaseDatainfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        DatabaseDatainfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        DatabaseDatainfo.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        DatabaseDatainfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + DatabaseDatainfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            DatabaseDatainfo.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            DatabaseDatainfo.onDeleteItem(data);
        } else if (layEvent === 'connect') {
            DatabaseDatainfo.onConnectItem(data);
        } else if (layEvent === 'share') {
            DatabaseDatainfo.jumpShareItem(data);
        }
    });
});
