/**
 * Add field label  in middle of page
 * @function
 * @param txt
 */
function add(txt){
    var aRect = [];
    var inch = 72;
    width = 1.5;
    height = 0.23;
    x = 1.25;
    y = 7;
    aRect[0] = inch * x;
    aRect[1] = inch * y;
    aRect[2] = aRect[0] + inch * width;
    aRect[3] = aRect[1] - inch * height;
    var fname = "Text" + txt.replace(/\W+/g, "").substring(0, 20);

    if(getField(fname)){
        app.alert(fname + ' already exist')
    }else{
        var f = addField(fname  , "text", pageNum, aRect);
        f.textSize = 10;
        f.textColor = color.black;
        f.multiline = true;
        f.readonly = true;
        f.defaultValue = txt;
        if(typeof smr != 'undefined'){
            smr.resetCheckboxes();
        }
        calculateNow();
    }
}
