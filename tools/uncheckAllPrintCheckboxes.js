/**
 * uncheck All PrintCheckboxes
 */
function uncheckAllPrintCheckboxes(){
    calculate = false;
    var cnt = 0;
    for (var i = 0; i < numFields; i++) {
        var fname = getNthFieldName(i);
        if(fname.indexOf('Check Box tobeprint') > -1){
            getField(fname).value ="Off";
            cnt++;
        }
    }
    console.println(cnt + ' unchecked ');
    calculate = true;
}


