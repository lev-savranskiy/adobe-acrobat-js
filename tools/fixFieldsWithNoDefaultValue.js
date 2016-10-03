/**
 * fixFieldsWithNoDefaultValue - it allows to restore them after resetForm()
 */
function fixFieldsWithNoDefaultValue(needle){
    var cnt = 0;
    for (var i = 0; i < numFields; i++) {
        var fname = getNthFieldName(i);
        var f = getField(fname);
        var val = String(f.value);

        if(val && !f.defaultValue && f.type == 'text'){

            //todo remove 94536728
            //todo not hardcode hash1?
            var include = !!fname.match(/page1OF1|observation_deviationtxt|APPENDIXPAGES|CLICK BUTTON BELOW|modifications|testbanner|text|departmnt|dropJobType|extratestswarning/gi);
            var exclude = !!fname.match(/94536728|hash1|password|summaryline|TextPN/gi);

            if( !exclude && include){
                cnt++;
                f.defaultValue = val;
                console.println(fname);
                console.println(val);
                console.println('---');
            }

        }

    }

    console.println("\r==");
    console.println(cnt + " fields changed");

}

