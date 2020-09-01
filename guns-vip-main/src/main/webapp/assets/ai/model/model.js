layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 管理
     */
    var Model = {
        tableId: "modelTable"
    };

    /**
     * 初始化表格的列
     */
    Model.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'modCode', sort: true, title: '模型编号'},
            {field: 'modName', sort: true, title: '模型名称'},
            {field: 'description', sort: true, title: '模型描述'},
            {field: 'ranged', sort: true, title: '使用范围'},
            {field: 'version', sort: true, title: '模型版本'},
            {
                field: 'isOpen', sort: true, title: '是否公开', templet: function (d) {
                    if (d.isOpen === 'on') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'loadId', hide: true, sort: true, title: '模型文件ID'},
            {field: 'loadName', hide: true, sort: true, title: '模型文件名称'},
            {field: 'loadLocation', hide: true, sort: true, title: '模型文件保存地址'},
            {field: 'documentId', hide: true, sort: true, title: '文档ID'},
            {field: 'documentName', hide: true, sort: true, title: '模型使用文档名称'},
            {field: 'documentLocation', hide: true, sort: true, title: '模型使用文档说明'},
            {field: 'dataOwner', hide: true, sort: true, title: '数据归属'},
            {field: 'inParams', hide: true, sort: true, title: '入参说明'},
            {field: 'result', hide: true, sort: true, title: '结果说明'},
            {field: 'state', sort: true, title: '状态编码'},
            {field: 'stateName', sort: true, title: '状态'},
            {field: 'createUser', hide: true, sort: true, title: '模型创建者'},
            {field: 'createUserName', sort: true, title: '模型创建者'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'reviewer', hide: true, sort: true, title: '模型审核人员'},
            {field: 'reviewerName', sort: true, title: '模型审核人员'},
            {field: 'reviewTime', sort: true, title: '审核时间'},
            {field: 'reviewOpinion', hide: true, sort: true, title: '审核意见'},
            {field: 'shareTarget', hide: true, sort: true, title: '分享对象'},
            {field: 'remark', hide: true, sort: true, title: '备注'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 400}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Model.search = function () {
        var queryData = {};

        queryData['modCode'] = $('#modCode').val();
        queryData['modName'] = $('#modName').val();

        table.reload(Model.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    Model.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/model/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    Model.jumpEditPage = function (data) {
        if (data.state !== "待提交" && data.state !== "审核不通过") {
            Feng.error(data.state + "状态的记录不允许修改!");
            return
        }
        window.location.href = Feng.ctxPath + '/model/edit?id=' + data.id
    };

    /**
     * 跳转到模型升级页面
     *
     * @param data 点击按钮时候的行数据
     */
    Model.jumpUpgradePage = function (data) {
        window.location.href = Feng.ctxPath + '/model/upgrade?id=' + data.id
    };

    /**
     * 跳转到审核页面
     *
     * @param data 点击审核时候的行数据
     */
    Model.jumpReviewPage = function (data) {
        if (data.state !== "待审核") {
            Feng.error("非【待审核】状态的记录不允许审核!");
            return
        }
        window.location.href = Feng.ctxPath + '/model/review?id=' + data.id
    };

    /**
     * 跳转到详情页面
     *
     * @param data 点击详情时候的行数据
     */
    Model.jumpDetailPage = function (data) {
        window.location.href = Feng.ctxPath + '/model/detailPage?id=' + data.id
    };
    /**
     * 跳转到分享页面
     *
     * @param data 点击发分享时候的行数据
     */
    Model.jumpSharePage = function (data) {
        // if (data.isOpen === "on") {
        //     Feng.warn("公开的模型信息不需要分享");
        // }
        window.location.href = Feng.ctxPath + '/model/sharePage?id=' + data.id
    };


    /**
     * 导出excel按钮
     */
    Model.exportExcel = function () {
        var checkRows = table.checkStatus(Model.tableId);
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
    Model.onDeleteItem = function (data) {
        if (data.state === "审核通过") {
            Feng.error(data.state + "状态的记录不允许删除!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/model/delete", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("删除成功!");
                    table.reload(Model.tableId);
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
     * 点击提交
     *
     * @param data 点击按钮时候的行数据
     */
    Model.onSubmitItem = function (data) {
        if (data.state !== "待提交" && data.state !== "审核不通过") {
            Feng.error(data.state + "状态的记录不允许提交!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/model/submit", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("提交成功!");
                    table.reload(Model.tableId);
                }
            }, function (data) {
                Feng.error("提交失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否提交?", operation);
    };


    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Model.tableId,
        url: Feng.ctxPath + '/model/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Model.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Model.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Model.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Model.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Model.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Model.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            Model.onDeleteItem(data);
        } else if (layEvent === 'submit') {
            Model.onSubmitItem(data);
        } else if (layEvent === 'review') {
            Model.jumpReviewPage(data);
        } else if (layEvent === 'upgrade') {
            Model.jumpUpgradePage(data);
        } else if (layEvent === 'detail') {
            Model.jumpDetailPage(data);
        } else if (layEvent === 'share') {
            Model.jumpSharePage(data);
        }
    });
});
