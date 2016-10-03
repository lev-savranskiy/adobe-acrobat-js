/**
 * convert normal checkboxes To MultiState Buttons (actually creates new, deletes original)
 */
function convertToMultiState(){
    calculate = false;
    var cnt = 0;
    for (var i = 0; i < numFields; i++) {
        var fname = getNthFieldName(i);
        var field = getField(fname);

        if('checkbox' ==  field.type){
            //Sciex logic
            // we skip page 1;
            //only some fields to do  on page 1
            //implement logic of your engine here
            if(field.page > 0 || fname.indexOf('Check Box.1.5.1') === 0){

                var fields = field.getArray(), item, fieldName, separatorPosition, index;

                for (var j = 0, ln = fields.length; j < ln; j++) {
                    item = fields[j];
                    fieldName = item.name;
                    separatorPosition = fieldName.lastIndexOf(".");
                    index = parseInt(fieldName.substr(separatorPosition + 1));
                    var f = this.addField('Multi.' + fieldName, "button", field.page, field.rect);
                    f.setAction("MouseUp", "Helper.onCheckboxStateChange(event.target)");
                    //f.userName = strToolTip;
                    f.borderStyle = border.s;
                    f.highlight = "push";
                    f.textFont = "perkinelmer";
                    f.textSize = 12;
                    f.textColor = color.black;
                    f.strokeColor = color.black;
                    cnt++;
                    removeField(fieldName);
                }
            }
        }
    }
    console.println(cnt + ' converted to MultiState ');
    calculate = true;
}