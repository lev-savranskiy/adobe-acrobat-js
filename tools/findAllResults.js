/**
 * find All Number Results
 */
function findAllResults(){


    var res = [];

    for (var i = 0; i < numFields; i++) {
        var fname = getNthFieldName(i);
        // PagesSelected = PagesSelected || {} ;
        var f = getField(fname);

        if(f.type == 'text'){


           var condition  = (fname.indexOf('ExtraPages.') === -1) &&  ( (fname.indexOf('pf.') > -1) ||  Helper.isNumber(f.value) );

           if(condition){
               res.push('"' + fname + '": "' + f.value  + '"');
           }
        }

    }


    console.println("var tstdata = {");
    console.println(res.join(","));
    console.println("}");


}

