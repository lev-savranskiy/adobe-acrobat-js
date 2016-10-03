/**
 * find All PrintCheckboxes
 */
function findAllPrintCheckboxes(){

    var arr =  [] ;
    for (var i = 0; i < numFields; i++) {
        var fname = getNthFieldName(i);
        // PagesSelected = PagesSelected || {} ;

        if(fname.indexOf('Check Box tobeprint') > -1){
            var f = getField(fname);
            console.println(fname + ' ' + f.value  + ' ' + f.page);
            f.setAction("Calculate", "");
            if(f.value != "Off"){
                //PagesSelected[f.page] = isTest ? 'test' : "raw";
                arr.push(f.page);
            }
        }

    }

    arr.sort(function(a, b) {
        return  +/\d+/.exec(a)[0] > +/\d+/.exec(b)[0];
    });

    return arr;

}

