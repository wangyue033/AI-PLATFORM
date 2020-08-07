layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 管理
     */
    var Server = {
        tableId: "serverTable"
    };

    /**
     * 初始化表格的列
     */
    Server.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'id', hide: true, title: 'ID'},
            {field: 'serverCode', hide: true, sort: true, title: '服务编号'},
            {field: 'serverName', sort: true, title: '服务名称'},
            {field: 'version', sort: true, title: '服务版本'},
            {field: 'algorithmId', hide: true, sort: true, title: '算法ID'},
            {field: 'modelId', hide: true, sort: true, title: '模型ID'},
            {field: 'description', hide: true, sort: true, title: '服务描述'},
            {field: 'ranged', hide: true, sort: true, title: '使用范围'},
            {field: 'loadType', sort: true, title: '服务文件类型'},
            {field: 'loadLocation', hide: true, sort: true, title: '服务文件保存地址'},
            {field: 'documentLocation', hide: true, sort: true, title: '服务使用文档说明'},
            {
                field: 'isOpen', sort: true, title: '是否公开', templet: function (d) {
                    if (d.isOpen === 'on') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {
                field: 'deployUse', sort: true, title: '是否部署运行', templet: function (d) {
                    if (d.deployUse === 'on') {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {field: 'state', sort: true, title: '状态'},
            {field: 'containerId', hide: true, sort: true, title: '容器ID'},
            {field: 'dataOwner', hide: true, sort: true, title: '数据归属'},
            {field: 'inParams', hide: true, sort: true, title: '入参说明'},
            {field: 'result', hide: true, sort: true, title: '结果说明'},
            {field: 'serverMonitor', hide: true, sort: true, title: '服务监控地址'},
            {field: 'createUser', hide: true, sort: true, title: '创建人员'},
            {field: 'createUserName', sort: true, title: '创建人员'},
            {field: 'createTime', sort: true, title: '创建时间'},
            {field: 'reviewer', hide: true, sort: true, title: '服务审核人员'},
            {field: 'reviewTime', hide: true, sort: true, title: '审核时间'},
            {field: 'reviewOpinion', hide: true, sort: true, title: '审核意见'},
            {field: 'deployTime', hide: true, sort: true, title: '部署时间'},
            {field: 'deployer', hide: true, sort: true, title: '部署人员'},
            {field: 'remark', hide: true, sort: true, title: '备注'},
            {field: 'serverAddress', sort: true, title: '服务地址'},
            {field: 'containerAddress', hide: true, sort: true, title: '容器管理地址'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 600}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Server.search = function () {
        var queryData = {};

        queryData['serverCode'] = $('#serverCode').val();
        queryData['serverName'] = $('#serverName').val();
        queryData['serverAddress'] = $('#serverAddress').val();

        table.reload(Server.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 跳转到添加页面
     */
    Server.jumpAddPage = function () {
        window.location.href = Feng.ctxPath + '/server/add'
    };

    /**
     * 跳转到编辑页面
     *
     * @param data 点击按钮时候的行数据
     */
    Server.jumpEditPage = function (data) {
        if (data.state !== "待提交" && data.state !== "审核不通过") {
            Feng.error(data.state + "状态的记录不允许修改!");
            return
        }
        window.location.href = Feng.ctxPath + '/server/edit?id=' + data.id
    };

    /**
     * 导出excel按钮
     */
    Server.exportExcel = function () {
        var checkRows = table.checkStatus(Server.tableId);
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
    Server.onDeleteItem = function (data) {
        if (data.state === "审核通过" || data.state === "已部署") {
            Feng.error(data.state + "状态的记录不允许删除!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/server/delete", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("删除成功!");
                    table.reload(Server.tableId);
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
    Server.onSubmitItem = function (data) {
        if (data.state !== "待提交" && data.state !== "审核不通过") {
            Feng.error(data.state + "状态的记录不允许提交!");
            return
        }
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/server/submit", function (data) {
                if (data.code === 500) {
                    Feng.error(data.message)
                    return false;
                } else {
                    Feng.success("提交成功!");
                    table.reload(Server.tableId);
                }
            }, function (data) {
                Feng.error("提交失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否提交?", operation);
    };

    /**
     * 点击启动
     *
     * @param data 点击按钮时候的行数据
     */
    Server.onStartUpItem = function (data) {

        /*war 包启动*/
        if (data.loadType === "war") {
            if (data.state !== "审核通过" && data.state !== "已部署") {
                Feng.error("【审核通过】状态之后的服务才允许启动!");
                return
            }
            func.open({
                title: "服务容器: " + data.containerAddress,
                content: data.containerAddress,
                resize: true
            });
            return
        }
        /*jar启动*/
        if (data.loadType === "jar") {
            if (data.state !== "审核通过"&&data.state !== "停止运行") {
                Feng.error("【审核通过】或【停止运行】状态之后的服务才允许启动!");
                return
            }
            var operation = function () {
                var ajax = new $ax(Feng.ctxPath + "/server/startUp", function (data) {
                    if (data.code === 500) {
                        Feng.error(data.message)
                        return false;
                    } else {
                        Feng.success("启动成功!");
                        table.reload(Server.tableId);
                    }
                }, function (data) {
                    Feng.error("启动失败!" + data.responseJSON.message + "!");
                });
                ajax.set("id", data.id);
                ajax.start();
            };
            Feng.confirm("是否启动?", operation);
        }
    };

    /**
     * 点击停止
     *
     * @param data 点击按钮时候的行数据
     */
    Server.onShutDownItem = function (data) {

        /*war 包启动*/
        if (data.loadType === "war") {
            if (data.state !== "审核通过" && data.state !== "已部署") {
                Feng.error("【审核通过】状态之后的服务才允许启动!");
                return
            }
            func.open({
                title: "服务容器: " + data.containerAddress,
                content: data.containerAddress,
                resize: true
            });
            return
        }
        /*jar启动*/
        if (data.loadType === "jar") {
            if (data.state !== "审核通过"&&data.state !== "正在运行") {
                Feng.error("【审核通过】或【正在运行】状态之后的服务才允许停止!");
                return
            }
            var operation = function () {
                var ajax = new $ax(Feng.ctxPath + "/server/shutdown", function (data) {
                    if (data.code === 500) {
                        Feng.error(data.message)
                        return false;
                    } else {
                        Feng.success("停止成功!");
                        table.reload(Server.tableId);
                    }
                }, function (data) {
                    Feng.error("停止失败!" + data.responseJSON.message + "!");
                });
                ajax.set("id", data.id);
                ajax.start();
            };
            Feng.confirm("是否停止?", operation);
        }
    };


    /**
     * 跳转到服务升级页面
     *
     * @param data 点击按钮时候的行数据
     */
    Server.jumpUpgradePage = function (data) {
        window.location.href = Feng.ctxPath + '/server/upgrade?id=' + data.id
    };

    /**
     * 跳转到审核页面
     *
     * @param data 点击审核时候的行数据
     */
    Server.jumpReviewPage = function (data) {
        if (data.state !== "待审核") {
            Feng.error("非【待审核】状态的记录不允许审核!");
            return
        }
        window.location.href = Feng.ctxPath + '/server/review?id=' + data.id
    };

    /**
     * 跳转到详情页面
     *
     * @param data 点击详情时候的行数据
     */
    Server.jumpDetailPage = function (data) {
        window.location.href = Feng.ctxPath + '/server/detailPage?id=' + data.id
    };


    /**
     * 跳转到分享页面
     *
     * @param data 点击分享时候的行数据
     */
    Server.jumpSharePage = function (data) {
        // if (data.isOpen === "on") {
        //     Feng.warn("公开的模型信息不需要分享");
        // }
        window.location.href = Feng.ctxPath + '/server/sharePage?id=' + data.id
    };

    /**
     * 跳转到部署页面
     *
     * @param data 点击部署时候的行数据
     */
    Server.jumpDeployPage = function (data) {
        if (data.loadType === "jar") {
            Feng.error("jar 包类型的服务不需要部署，可直接启动!");
            return
        }
        if (data.state !== "审核通过" && data.state !== "已部署") {
            Feng.error("【审核通过】状态之后的服务才允许部署!");
            return
        }
        window.location.href = Feng.ctxPath + '/server/deployPage?id=' + data.id
    };


    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Server.tableId,
        url: Feng.ctxPath + '/server/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Server.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Server.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {

        Server.jumpAddPage();

    });

    // 导出excel
    $('#btnExp').click(function () {
        Server.exportExcel();
    });

    /**
     * 跳转到监控页面
     */
    Server.jumpMonitorPage = function (data) {
        func.open({
            title: "服务容器监控: " + data.serverMonitor,
            content: data.serverMonitor,
            resize: true
        });
    };


    // 工具条点击事件
    table.on('tool(' + Server.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Server.jumpEditPage(data);
        } else if (layEvent === 'delete') {
            Server.onDeleteItem(data);
        } else if (layEvent === 'submit') {
            Server.onSubmitItem(data);
        } else if (layEvent === 'review') {
            Server.jumpReviewPage(data);
        } else if (layEvent === 'upgrade') {
            Server.jumpUpgradePage(data);
        } else if (layEvent === 'detail') {
            Server.jumpDetailPage(data);
        } else if (layEvent === 'share') {
            Server.jumpSharePage(data);
        } else if (layEvent === 'deploy') {
            Server.jumpDeployPage(data);
        } else if (layEvent === 'monitor') {
            Server.jumpMonitorPage(data);
        } else if (layEvent === 'startup') {
            Server.onStartUpItem(data);
        } else if (layEvent === 'shutdown') {
            Server.onShutDownItem(data);
        }
    });
});
