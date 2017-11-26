$(function () {
    var btn_add = document.getElementById('btn-add');
    btn_add.addEventListener('click', function () {
        var field = document.getElementById('input-field').value;
        var pattern = document.getElementById('input-element').value;
        var remark = document.getElementById('input-remark').value;

        insert_patterns(field, pattern, remark);
    })

    var btn_show = document.getElementById('btn-show');
    btn_show.addEventListener('click', function () {
        show_all_patterns();
    })

    var btn_delete = document.getElementById('btn-delete');
    btn_delete.addEventListener('click', function () {
        delete_pattern_by_url('www.baidu.com');
    })


})

