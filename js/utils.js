/**
 * 定义要操作的元素
 * @param {*元素名称} pattern 
 * @param {*备注} remark 
 */
function pattern_item(pattern, remark) {
    this.pattern = pattern;
    this.remark = remark;
}

function init_patterns() {
    chrome.storage.sync.get({ 'patterns': {} }, function (item) {
        if (item) {
            console.log(`get ${item}`)
            console.log(item)
        } else {
            chrome.storage.sync.set({ 'patterns': {} }, function (item) {
                console.log(`set empty`);
            });
        }
    });
}

/**
 * 展示所有元素
 */
function show_all_patterns() {
    chrome.storage.sync.get({ 'patterns': {} }, function (item) {
        console.log(item);
    });
}

/**
 * 插入要操作的元素
 * @param {*} url 
 * @param {*} pattern 
 * @param {*} remark 
 */
function insert_patterns(url, pattern, remark) {
    chrome.storage.sync.get({ 'patterns': [] }, function (result) {
        var items = result['patterns'];
        var propertys = Object.getOwnPropertyNames(items);
        if (propertys.indexOf(url) < 0) {
            items[url] = [];
            items[url].push(new pattern_item(pattern,remark));
        }else{
            if(!check_exists(items[url],pattern)){
                //不存在时添加
                items[url].push(new pattern_item(pattern,remark));
            }
        }
        chrome.storage.sync.set({ 'patterns': items }, function (item) {});
    });
}
/**
 * 检查元素是否存在
 * @param {*} items Array<pattern_item>
 * @param {*} pattern 
 */
function check_exists(items,pattern){
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if(element.pattern == pattern){
            //存在时返回true
            return true;
        }
    }
    return false;
}

function delete_pattern_by_url(url){
    chrome.storage.sync.get({ 'patterns': [] }, function (result) {
        var item = result['patterns'];
        var propertys = Object.getOwnPropertyNames(item);
        item[url] = [];
        chrome.storage.sync.set({ 'patterns': item }, function (item) {});
    });
}



/**
 * 操作元素，实际操作方法调用这里
 * @param {*} callback 
 */
function handle_patterns(field,callback) {
    chrome.storage.sync.get({ 'patterns': {} }, function (results) {
        var items = result['patterns'];
        callback(items,field);
    });
}