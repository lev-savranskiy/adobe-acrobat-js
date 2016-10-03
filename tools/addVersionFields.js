/**
 * Add label text field and engine version field to each page.
 * @function
 */
var addVersionFields = (function(){
    function addTitleFields(p){
        var labelRect = [];
        var titleRect = [];
        var inch = 72;

        labelRect[0] = 5.74*inch;
        labelRect[1] = 0.05*inch;
        labelRect[2] = labelRect[0] + 0.85*inch;
        labelRect[3] = labelRect[1] + 0.18*inch;

        titleRect[0] = labelRect[2];
        titleRect[1] = 0.05*inch;
        titleRect[2] = titleRect[0] + 1.86*inch;
        titleRect[3] = titleRect[1] + 0.18*inch;

        var labelField = this.addField("DocVersionText", "text", p, labelRect);
        var titleField = this.addField("DocVersion", "text", p, titleRect);

        labelField.textSize = 6;
        labelField.textFont = "Helvetica";
        labelField.textColor = color.gray;
        labelField.defaultValue = "Engine Version:";
        labelField.value = "Engine Version:";
        labelField.readonly = true;

        titleField.textSize = 6;
        titleField.textFont = "Helvetica";
        titleField.textColor = color.gray;
        titleField.readonly = true;
        titleField.setAction("Calculate", "event.value=this.info.title");
    }

    return function(doc){
        var p = 0,
            ln = doc.numPages;

        var label = doc.getField("DocVersionText");
        var title = doc.getField("DocVersion");

        if(!label && !title){
            doc.calculate = false;

            for(; p < ln; p++){
                addTitleFields.call(doc, p);
            }

            doc.calculate = true;
            doc.calculateNow();
        }
    }
})();