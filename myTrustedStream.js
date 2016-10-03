myTrustedStream = app.trustedFunction(function (ofield, ofieldText) {
    app.beginPriv();
    try {
        var FilePathField = ofield;
        var FileTextFiels = ofieldText;


// Set up the Text field so the file dialog can be called 
        FilePathField.fileSelect = true;

// Display File Open Dialog 
        FilePathField.browseForFileToSubmit();

// file path is the field value
        var strNewPath = FilePathField.value;

//file path to console
        console.println(strNewPath);

// file to stream	
        var oFile = util.readFileIntoStream(strNewPath);

// read stream to string format
        var FileStrg = util.stringFromStream(oFile);

//file length
        app.alert("file length = " + FileStrg.length);

// return the file string
        return FileStrg

    } catch (e) {

        app.alert("catch=" + e);

    }
    app.endPriv();
});


