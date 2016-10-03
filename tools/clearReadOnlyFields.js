/**
 * clears ReadOnlyFields
 */
function clearReadOnlyFields(){

    var num = this.numFields;
    for (var i = 0; i < num; i++) {
        var fname = this.getNthFieldName(i);
        var f = this.getField(fname);
        if (f.readonly === true) {
            f.value = "";
        }
    }
}

