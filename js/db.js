
function exec_patterns(items) {
    for (let index = 0; index < items.length; index++) {
        const element = items[index].pattern;
        try {
            document.querySelector(element).hidden = true;
        } catch (error) {
            console.log(element + " not found");
        }
    }
}

function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("myDb", "1.0", "elements to use by my chrome plugin", 1024 * 1024);;
    return db;
}

function initDatabase() {
    var db = getCurrentDb();//初始化数据库
    if (!db) { alert("您的浏览器不支持HTML5本地数据库"); return; }
    db.transaction(function (trans) {//启动一个事务，并设置回调函数
        //执行创建表的Sql脚本
        trans.executeSql("create table if not exists my_patterns(url text null,pattern text null,remark text null)", [], function (trans, result) {
        }, function (trans, message) { });
    }, function (trans, result) {
    }, function (trans, message) {
    });
}

function insertPatternToDb(url,pattern,remark){
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("insert into my_patterns(url,pattern,remark) values(?,?,?) ", [url,pattern,remark], function (ts, data) {
        }, function (ts, message) {
            alert(message);
        });
    });
}

function showAllTheData() {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("select * from my_patterns ", [], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    console.log(data.rows.item(i));//获取某行数据的json对象
                }
            }
        }, function (ts, message) { alert(message); var tst = message; });
    });
}

/**
 * 查找指定url的所有需要操作的元素，并执行callback
 * @param {*} url 
 * @param {*} callback 
 */``
function selectPatternByUrl(url, callback){
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql(`select * from my_patterns where url =?`, [url], function (ts, data) {
            if (data) {
                callback(data);
            }
        }, function (ts, message) { console.log(message); var tst = message; });
    });
}

function deletePatternByUrlPattern(url,pattern){
    var db = getCurrentDb();
    db.transaction(function(trans){
        trans.executeSql(`delete from my_patterns where url = ? and pattern=?`,[url,pattern])
    })
}
function deletePatternByUrl(url){
    var db = getCurrentDb();
    db.transaction(function(trans){
        trans.executeSql(`delete from my_patterns where url =?`,[url],function(){},function (ts, message) { console.log(message); var tst = message; })
    })
}