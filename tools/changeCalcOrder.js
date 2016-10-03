/**
 * changeCalcOrder - move pf and page_st fields down
 */
function changeCalcOrder(){

    var num = numFields;
    var calcOrderIndexMax = 0;
    for (var i = 0; i < num; i++) {
        var fname = getNthFieldName(i);
        var f = getField(fname);
        if(f.calcOrderIndex > calcOrderIndexMax){
            calcOrderIndexMax = f.calcOrderIndex;
        }
    }

    console.println('calcOrderIndexMax ' + calcOrderIndexMax);

    if(getField('CALCULATERUNNER')){
        getField('CALCULATERUNNER').calcOrderIndex = 0;
    }

    if(calcOrderIndexMax>0){
        Helper.eachField('page_st', function(item, index){
            console.println(item.name + ' calcOrderIndex set to ' + calcOrderIndexMax);
            item.calcOrderIndex =calcOrderIndexMax;
            calcOrderIndexMax--;
        });
        Helper.eachField('pf', function(item, index){
            console.println(item.name + ' calcOrderIndex set to ' + calcOrderIndexMax);
            item.calcOrderIndex =calcOrderIndexMax;
            calcOrderIndexMax--;
        });
    }

}

