layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 非常规数据管理管理
     */
    var IrregularDatainfo = {
        tableId: "irregularDatainfoTable"
    };

    /**
     * 初始化表格的列
     */
    IrregularDatainfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'title', sort: true, title: '标题'},
            {field: 'description', hide: true, sort: true, title: '描述'},
            {field: 'loadId', hide: true, sort: true, title: '数据文件ID'},
            {field: 'loadName', sort: true, title: '数据文件名称'},
            {field: 'loadLocation', hide: true, sort: true, title: '数据文件保存地址'},
            {field: 'documentId', hide: true, sort: true, title: '说明文档ID'},
            {field: 'documentName', sort: true, title: '说明文档名称'},
            {field: 'documentLocation', hide: true, sort: true, title: '说明文档地址'},
            {field: 'state', sort: true, title: '状态'},
            {field: 'remark', hide: true, sort: true, title: '备注'},
            {
                field: 'isOpen', sort: true, title: '是否公开', templet: function (d) {
                    if (d.isOpen === 'on') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'createUserName', sort: true, title: '创建人员'},
            {field: 'createUser', hide: true, sort: true, title: '创建人员'},
            {field: 'shareTarget', hide: true, sort: true, title: '分享对象'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 400}
        ]];
    };

    /**
     * 点击查询按钮
     */
    IrregularDatainfo.search = function () {
        var queryData = {};

        queryData['title'] = $('#title').val();

        table.reload(IrregularDatainfo.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    IrregularDatainfo.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/irregularDatainfo/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    IrregularDatainfo.jumpEditPage = function (data) {
        window.location.href = Feng.ctxPath + '/irregularDatainfo/edit?id=' + data.id
    };


    /**
     * 跳转到分享页面
     *
     * @param data 点击按钮时候的行数据
     */
    IrregularDatainfo.jumpShareItem = function (data) {
        window.location.href = Feng.ctxPath + '/irregularDatainfo/share?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    IrregularDatainfo.exportExcel = function () {
        var checkRows = table.checkStatus(IrregularDatainfo.tableId);
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
    IrregularDatainfo.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/irregularDatainfo/delete", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("删除成功!");
                    table.reload(IrregularDatainfo.tableId);
                }
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
        elem: '#' + IrregularDatainfo.tableId,
        url: Feng.ctxPath + '/irregularDatainfo/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: IrregularDatainfo.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        IrregularDatainfo.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        IrregularDatainfo.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        IrregularDatainfo.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + IrregularDatainfo.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            IrregularDatainfo.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            IrregularDatainfo.onDeleteItem(data);
        }else if (layEvent === 'share') {
            IrregularDatainfo.jumpShareItem(data);
        }
    });
});
