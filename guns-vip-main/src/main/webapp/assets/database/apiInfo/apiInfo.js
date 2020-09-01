layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * API管理管理
     */
    var ApiInfo = {
        tableId: "apiInfoTable"
    };

    /**
     * 初始化表格的列
     */
    ApiInfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: ' ID'},
            {field: 'title', sort: true, title: '标题'},
            {field: 'apiAddress', sort: true, title: '接口地址'},
            {field: 'inParams', hide: true,sort: true, title: '入参说明'},
            {field: 'result',hide: true, sort: true, title: '结果说明'},
            {field: 'apiDesc', sort: true, title: '接口描述'},
            {field: 'documentId',hide: true, sort: true, title: '接口文档ID'},
            {field: 'documentName', hide: true,sort: true, title: '接口文档名称'},
            {field: 'documentLocation', hide: true,sort: true, title: '接口文档保存地址'},
            {field: 'state', sort: true, title: '状态'},
            {field: 'isOpen', sort: true, title: '是否公开'},
            {field: 'remark', hide: true,sort: true, title: '备注'},
            {field: 'createUser', sort: true, title: '创建人员'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'shareTarget',hide: true, sort: true, title: '分享对象'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 300}
        ]];
    };

    /**
     * 点击查询按钮
     */
    ApiInfo.search = function () {
        var queryData = {};

        queryData['title'] = $('#title').val();

        table.reload(ApiInfo.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    ApiInfo.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/apiInfo/add'
    };

    /**
    * 跳转到编辑页面
    *
    * @param data 点击按钮时候的行数据
    */
    ApiInfo.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/apiInfo/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    ApiInfo.exportExcel = function () {
        var checkRows = table.checkStatus(ApiInfo.tableId);
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
    ApiInfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/apiInfo/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(ApiInfo.tableId);
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
        elem: '#' + ApiInfo.tableId,
        url: Feng.ctxPath + '/apiInfo/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: ApiInfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        ApiInfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

    ApiInfo.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        ApiInfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + ApiInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            ApiInfo.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            ApiInfo.onDeleteItem(data);
        }
    });
});
