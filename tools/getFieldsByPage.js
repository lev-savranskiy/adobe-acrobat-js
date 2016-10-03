/**
 * getFieldsByPage - return array of calculated fields for page
 * @param {Number} pageN
 * @return {Array}
 */
var getFieldsByPage = function (pageN){

    var num = numFields;
    var result = [];
    for (var i = 0; i < num; i++) {
        var fname = getNthFieldName(i);
        var f = getField(fname);
        if(f.calcOrderIndex>-1){
            var pages = String(f.page).split(",");
            for (var j = 0; j < pages.length; j++) {
                var page = pages[j];
                if(pageN ==  page){
                    result.push(fname);
                }
            }
        }
    }

    return result;
};

//example
var r = getFieldsByPage(7);
var str =  '["';
str +=  r.join('","');
str +=  '"]';

console.println(r.length);
console.println('-----');
console.println(str);


