/**
 * GetCalcOrder
 */
var getCalcOrder = function (){

    var num = numFields;
    var result = [];
    for (var i = 0; i < num; i++) {
        var fname = getNthFieldName(i);
        var f = getField(fname);
        if(f.calcOrderIndex>-1){
            result[f.calcOrderIndex] = fname;
        }
    }

    return result;
};

//example
var r = getCalcOrder();
var str =  '["';
str +=  r.join('","');
str +=  '"]';

console.println(r.length);
console.println('-----');
console.println(str);



