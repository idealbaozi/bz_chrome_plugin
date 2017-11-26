// $(function () {
//     initDatabase();

//     // insertPatternToDb('www.baidu.com','.content_right','右侧边栏');
//     // selectPatternByUrl('www.baidu.com',console.log);
//     // selectPatternByUrl('www.baidu.com',function(results){
//     //     var items = results.rows;
//     //     for (let index = 0; index < items.length; index++) {
//     //         const element = items[index];
//     //         console.log(element.pattern);
//     //     }
//     // });
//     /**
//      * 测试方法
//      *  deletePatternByUrl('www.baidu.com');
//         insertPatternToDb('www.baidu.com','#content_right','右侧边栏');
//         selectPatternByUrl('www.baidu.com',console.log);
//     */
//     var url = document.URL;
//     var field = url.split('/')[2]
//     selectPatternByUrl(field, function (results) {
//         var items = results.rows;
//         exec_patterns(items)
//     });
    
// })

$(function () {
    
    var url = document.URL;
    var field = url.split('/')[2];

    chrome.storage.sync.get({ 'patterns': {} }, function (results) {
        var items = results['patterns'];
        hidden_elements(items,field);
    });
    
})

function fireContentLoadedEvent () {
    console.log ("DOMContentLoaded");
    chrome.storage.sync.get({ 'patterns': {} }, function (results) {
        var items = results['patterns'];
        hidden_elements(items,field);
    });
}

function hidden_elements(items,field){
    var propertys = Object.getOwnPropertyNames(items);
    if(propertys.indexOf(field)>-1){
        let item = items[field];
        for (let index = 0; index < item.length; index++) {
            const element = item[index].pattern;
            try {
                document.querySelector(element).hidden = true;
            } catch (error) {
                console.log(element + " not found");
            }
        }
    }
}