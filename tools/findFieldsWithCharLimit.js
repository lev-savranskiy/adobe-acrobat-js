/**
 * finds FieldsWithCharLimit > 0
 */
function findFieldsWithCharLimit(){
    console.println('\n\r');
    var cnt = 0;
    for (var i = 0; i < numFields; i++) {
        var fname = getNthFieldName(i);
        var item = getField(fname);

        if(item.type == 'text' && item.charLimit){
            cnt++;
            //var myFieldRect = item.rect;
            //var pageN = item.page;
            //removeField(fname);
            //addField(fname, "text", pageN, myFieldRect);
            console.println(item.name + ": " + item.charLimit);
        }
    }
    console.println('\n\rfindFieldsWithCharLimit: ' + cnt);
}

