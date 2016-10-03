/**
 * RemoveAllCalculations - first try for BALANCE
 */
function RemoveAllCalculationsBalance() {

    var num = this.numFields;

    var cnt = 0;
    for (var i = 0; i < num; i++) {
        var fname = this.getNthFieldName(i);


        if (
            (fname.indexOf('DropdownUnit') === 0) ||
            (fname.indexOf('Check Box1') === 0) ||
            (fname.indexOf('CornerloadDV.') === 0) ||
            (fname.indexOf('AsLeft.CornerloadDV.') === 0) ||
            (fname.indexOf('AsLeft.LinearityTareWeightVal.') === 0) ||
            (fname.indexOf('LinearityDisplayedVal.') === 0) ||
            (fname.indexOf('AsLeft.LinearityDisplayedVal.') === 0) ||
            (fname.indexOf('LoadedValue.') === 0) ||
            (fname.indexOf('AsLeft.LoadedValue.') === 0)
        ) {
            var f = this.getField(fname);
            console.println(fname)
            f.setAction("Calculate", "");
            f.setAction("Format", "");
            cnt++;
        }


    }
    console.println(cnt + " fields  calculations cleared of total  " + num)

}

