layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 管理
     */
    var Algorithm = {
        tableId: "algorithmTable"
    };

    /**
     * 初始化表格的列
     */
    Algorithm.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'algCode', sort: true, title: '算法编号'},
            {field: 'algName', sort: true, title: '算法名称'},
            {field: 'description', sort: true, title: '算法描述'},
            {field: 'ranged', sort: true, title: '使用范围'},
            {field: 'version', sort: true, title: '算法版本'},
            {
                field: 'isOpen', sort: true, title: '是否公开', templet: function (d) {
                    if (d.isOpen === 'on') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'loadLocation', hide: true, sort: true, title: '算法文件保存地址'},
            {field: 'documentLocation', hide: true, sort: true, title: '算法使用文档说明'},
            {field: 'dataOwner', hide: true, sort: true, title: '数据归属'},
            {field: 'inParams', hide: true, sort: true, title: '入参说明'},
            {field: 'result', hide: true, sort: true, title: '结果说明'},
            {field: 'state', sort: true, title: '状态编码'},
            {field: 'stateName', sort: true, title: '状态'},
            {field: 'createUser', hide: true, sort: true, title: '算法创建者'},
            {field: 'createUserName', sort: true, title: '算法创建者'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'reviewer', hide: true, sort: true, title: '算法审核人员'},
            {field: 'reviewerName', sort: true, title: '算法审核人员'},
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
    Algorithm.search = function () {
        var queryData = {};

        queryData['algCode'] = $('#algCode').val();
        queryData['algName'] = $('#algName').val();

        table.reload(Algorithm.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    Algorithm.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/algorithm/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    Algorithm.jumpEditPage = function (data) {
        if (data.state !== "待提交" && data.state !== "审核不通过") {
            Feng.error(data.state + "状态的记录不允许修改!");
            return
        }
        window.location.href = Feng.ctxPath + '/algorithm/edit?id=' + data.id
    };

    /**
     * 跳转到算法升级页面
     *
     * @param data 点击按钮时候的行数据
     */
    Algorithm.jumpUpgradePage = function (data) {
        window.location.href = Feng.ctxPath + '/algorithm/upgrade?id=' + data.id
    };

    /**
     * 跳转到审核页面
     *
     * @param data 点击审核时候的行数据
     */
    Algorithm.jumpReviewPage = function (data) {
        if (data.state !== "待审核") {
            Feng.error("非【待审核】状态的记录不允许审核!");
            return
        }
        window.location.href = Feng.ctxPath + '/algorithm/review?id=' + data.id
    };

    /**
     * 跳转到详情页面
     *
     * @param data 点击详情时候的行数据
     */
    Algorithm.jumpDetailPage = function (data) {
        window.location.href = Feng.ctxPath + '/algorithm/detailPage?id=' + data.id
    };
    /**
     * 跳转到分享页面
     *
     * @param data 点击发分享时候的行数据
     */
    Algorithm.jumpSharePage = function (data) {
        // if (data.isOpen === "on") {
        //     Feng.warn("公开的算法信息不需要分享");
        // }
        window.location.href = Feng.ctxPath + '/algorithm/sharePage?id=' + data.id
    };


    /**
     * 导出excel按钮
     */
    Algorithm.exportExcel = function () {
        var checkRows = table.checkStatus(Algorithm.tableId);
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
    Algorithm.onDeleteItem = function (data) {
        if (data.state === "审核通过") {
            Feng.error(data.state + "状态的记录不允许删除!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/algorithm/delete", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("删除成功!");
                    table.reload(Algorithm.tableId);
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
    Algorithm.onSubmitItem = function (data) {
        if (data.state !== "待提交" && data.state !== "审核不通过") {
            Feng.error(data.state + "状态的记录不允许提交!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/algorithm/submit", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("提交成功!");
                    table.reload(Algorithm.tableId);
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
        elem: '#' + Algorithm.tableId,
        url: Feng.ctxPath + '/algorithm/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Algorithm.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Algorithm.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Algorithm.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Algorithm.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Algorithm.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Algorithm.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            Algorithm.onDeleteItem(data);
        } else if (layEvent === 'submit') {
            Algorithm.onSubmitItem(data);
        } else if (layEvent === 'review') {
            Algorithm.jumpReviewPage(data);
        } else if (layEvent === 'upgrade') {
            Algorithm.jumpUpgradePage(data);
        } else if (layEvent === 'detail') {
            Algorithm.jumpDetailPage(data);
        } else if (layEvent === 'share') {
            Algorithm.jumpSharePage(data);
        }
    });
});
