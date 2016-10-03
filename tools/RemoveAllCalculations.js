/**
 * Remove All Calculations From ALL fields
 */
function RemoveAllCalculations(){

    var num = this.numFields;
    var exclusions = ['CALCULATERUNNER', 'TESTRUNNER'];
    var cnt = 0;
    for ( var i=0; i<num; i++) {
        var fname = this.getNthFieldName(i);
        if(exclusions.indexOf(fname) === -1 ){
            var f =  this.getField(fname);
            f.setAction("Calculate", "");
            cnt++;
        }


    }
    console.println(cnt + " fields  calculations cleared of total  " + num)

}

