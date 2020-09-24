layui.use(['layer', 'ax', 'form', 'laydate', 'element', 'table'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;
    var element = layui.element;
    var table = layui.table;
    var fieldConfigList = [];

    table.render({
        elem: '#fieldTable',
        url: Feng.ctxPath + '/dataSearch/getTableField?tableName=' + $("#tableName").val() + "&dbId=" + $("#dbId").val(),
        parseData: function (res) {
            //获取返回的数据缓存起来
            fieldConfigList = res.data;
            return res;
        },
        page: false,
        cellMinWidth: 100,
        cols: [[
            {field: 'columnName', title: '字段名'},
            {field: 'columnComment', title: '字段注释'}
            // ,
            // {field: 'queryConditionFlag', title: '是否为查询条件', templet: '#conditionTpl'},
            // {field: 'inputType', title: '字段属性样式', templet: '#inputTypeTpl'}
        ]]
    });
    form.render('select');

    //监听下拉选项操作
    form.on('select(columnStyleFilter)', function (data) {
        var columnName = data.elem.id;
        var inputType = data.elem.value;

        for (let i = 0, len = fieldConfigList.length; i < len; i++) {
            if (fieldConfigList[i].columnName === columnName) {
                fieldConfigList[i].inputType = inputType;
            }
        }

        console.log(fieldConfigList);
    });

    //监听单选事件
    form.on('checkbox(queryConditionFlagFilter)', function (data) {
        var columnName = data.elem.id;
        var checked = data.elem.checked;

        //fieldConfigList配置过字段则直接设置为checked
        for (let i = 0, len = fieldConfigList.length; i < len; i++) {
            if (fieldConfigList[i].columnName === columnName) {
                fieldConfigList[i].queryConditionFlag = checked;
            }
        }

        console.log(fieldConfigList);
    });

    //点击提交时
    $('#submit').click(function () {
        var requestBody = new Map();
        requestBody.set("tableName", $("#tableName").val());
        requestBody.set("dbId", $("#dbId").val());
        requestBody.set("limitNumber", $("#limitNumber").val());
        requestBody.set("condition", $("#condition").val());
        requestBody.set("fieldConfigList", fieldConfigList);

        layui.jquery.ajax({
            url: Feng.ctxPath + "/dataSearch/dataSearchConfig",
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: _mapToJson(requestBody),
            success: function (data) {
                fieldConfigList = [];
                Feng.success("查询数据成功");
                console.log(data.data)
                $("#searchResult").val(JSON.stringify(data.data))
                // parent.layer.close(parent.layer.getFrameIndex(window.name));
            },
            error: function (data) {
                Feng.error("查询失败");
            }
        });

    });

    //点击标记时
    $('#remark').click(function () {
        var requestBody = new Map();
        requestBody.set("tableName", $("#tableName").val());
        requestBody.set("dbId", $("#dbId").val());
        requestBody.set("limitNumber", $("#limitNumber").val());
        requestBody.set("condition", $("#condition").val());
        requestBody.set("optType", "remark");
        requestBody.set("fieldConfigList", fieldConfigList);

        layui.jquery.ajax({
            url: Feng.ctxPath + "/dataSearch/dataRemarkConfig",
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: _mapToJson(requestBody),
            success: function (data) {
                fieldConfigList = [];
                Feng.success("标记数据成功");
                console.log(data.data)
                $("#searchResult").val(JSON.stringify(data.data))
                // parent.layer.close(parent.layer.getFrameIndex(window.name));
            },
            error: function (data) {
                Feng.error("标记失败");
            }
        });

    });

    //点击执行时
    $('#operation').click(function () {
        var requestBody = new Map();
        requestBody.set("tableName", $("#tableName").val());
        requestBody.set("dbId", $("#dbId").val());
        requestBody.set("limitNumber", $("#limitNumber").val());
        requestBody.set("condition", $("#condition").val());
        requestBody.set("ddlSql", $("#ddlSql").val());
        requestBody.set("fieldConfigList", fieldConfigList);

        layui.jquery.ajax({
            url: Feng.ctxPath + "/dataSearch/dataOptConfig",
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: _mapToJson(requestBody),
            success: function (data) {
                fieldConfigList = [];
                Feng.success("操作成功");
                console.log(data.data)
                $("#searchResult").val(JSON.stringify(data.data))
                // parent.layer.close(parent.layer.getFrameIndex(window.name));
            },
            error: function (data) {
                Feng.error("操作失败");
            }
        });

    });

    function _strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    function _mapToJson(map) {
        return JSON.stringify(_strMapToObj(map));
    }

    /*只为显示表名称，为了显示和复制*/
    var tableNameTip = $("#tableName").val();
    $("#tableNameTip").val(tableNameTip);
});
