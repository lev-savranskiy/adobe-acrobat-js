/**
 * checkFieldsExist
 * @param {Array} list - list of fieldnames
 * @example
 var list = ['pu1s2#aveINLET_A_FLOWX1', 'pu1s2#aveINLET_A_FLOWX1',
    "pu1s2f#1INLET_A_FLOWX1", "pu1s2f#2INLET_A_FLOWX1",
    "pu1s2f#3INLET_A_FLOWX1", "pu1s2f#4INLET_A_FLOWX1",
    "pu1s2f#5INLET_A_FLOWX1", "pu1s2f#6INLET_A_FLOWX1"];
   checkFieldsExist(list);
 */



function checkFieldsExist(list){


    calculate = false;


    var allfields = [];
    var notfounds = [];
    var fname;
    var cnt = 0;
    for (var i = 0; i < numFields; i++) {
        fname = getNthFieldName(i);
        allfields.push(fname);
    }

    for (var j = 0; j < list.length; j++) {
        fname = list[j];
        if(fname && (allfields.indexOf(fname) === -1)){
            notfounds.push(fname)
        }
    }


    console.println("===============");
    console.println("notfounds " + notfounds);
    console.println("===============");
    calculate = true;

}


