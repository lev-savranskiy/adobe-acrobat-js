/**
 * find Field By Value (Partial)
 * @param {string} needle - text to find
 */
function findFieldByValue(needle){
    var num = numFields;
    for (var i = 0; i < num; i++) {
        var fname = getNthFieldName(i);
        var f = getField(fname);
        if (("" + f.value).indexOf(needle) > -1) {
            console.println(fname + " " + f.value);
            console.println('----------')
        }
    }
}

