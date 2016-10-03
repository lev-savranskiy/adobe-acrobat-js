/**
 * renameFields
 * @param {Number} pageWas
 * @param {Number} pageNew
 * @param {String} mask
 * @param {String} substitute
 * @return {Array}
 */
var cloneTextFieldsByMask = function (pageWas, pageNew, mask, substitute){

    var num = numFields;
    var arr = [];
    for (var i = 0; i < num; i++) {
        var fname = getNthFieldName(i);
        if(fname.indexOf(mask) > - 1){
            var field = getField(fname);

            if(field.type == 'text'){
                //console.println(fname);
                var pages = String(field.page).split(",");
                //console.println(pages);
                for (var j = 0; j < pages.length; j++) {
                    var page = pages[j];
                    if(pageWas ==  page){

                        var newname = fname.replace(mask, substitute);
                        //console.println(newname);
                        //console.println(pageWas);
                        //console.println(field.rect);
                        var fieldnew = addField(newname, field.type, pageNew, field.rect);
                        console.println(fname + "->" + fieldnew.name);
                        // removeField(fname);
                    }
                }
            }





        }

    }


    return arr;
};


console.println(cloneTextFieldsByMask(12, 14, '.38' , '.67'));
