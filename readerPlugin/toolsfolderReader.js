/**
 * Adobe Acrobat Reader Folder Level script
 * @namespace
 * @version 0.0.1
 * @author EPAM TEAM
 */

var printerName = "UOQ_Pdf";
//printerName = "PDFCreator";
var printerDoc = "UOQ Printer installation.ppsx";
var printerDocPath = "C:/Program Files/uoq_manager_client/";


var sendToPDFCreator = app.trustedFunction(function (oDoc, cPath, cFlName) {
    app.beginPriv();

    if (app.printerNames.indexOf(printerName) > -1) {
        var pp = oDoc.getPrintParams();
        var pSelectionField = oDoc.getField("Print_Selection");
        var pStr = pSelectionField && pSelectionField.value;

        pp.printerName = printerName;

        if (pStr && !!pStr.length) {
            var tmpArr = pStr.split(",");
            var finalArr = [];
            var len = tmpArr.length;
            var j = 0;
            var pr, pr1, pr2;

            for (; j < len; j++) {
                pr = tmpArr[j];
                var spilts = pr.split('-');

                if (spilts.length == 2) {
                    //-- range --
                    pr1 = spilts[0] - 1;
                    pr2 = spilts[1] - 1;

                } else {
                    //-- int --
                    pr1 = parseInt(pr) - 1;
                    pr2 = pr1;
                }

                finalArr.push([pr1, pr2])
            }


            pp.printRange = finalArr;
            oDoc.print(pp);
        } else {
            app.alert('No print range found in summary')
        }
    } else {


        var confirmed = app.alert(printerName + " not installed.\n\rPress OK to launch instructions " + printerDocPath + printerDoc + "\n\rPress Cancel otherwise", 3, 1, "Engine layout");
        if (confirmed == 1) {
            try {
                app.launchURL("file:///" + printerDocPath + printerDoc, false);
            } catch (e) {
                app.alert(e);
            }

        }


    }
    app.endPriv();

});

//create 5 menus in File
var cName = "Perkin Elmer Tools";

app.addSubMenu({
    cName: cName,
    cParent: "File",
    nPos: 0
});

app.addMenuItem({
    cName: "-",
    cParent: cName,
    cExec: ""
});

app.addMenuItem({
    cName: "Import FDF",
    cEnable: "event.rc = !!event.target;",
    cParent: cName,
    cExec: "importAnFDF('job.fdf')"
});
app.addMenuItem({
    cName: "Go to Summary",
    cEnable: "event.rc = !!event.target;",
    cParent: cName,
    cExec: "pageNum = 2;"
});

app.addMenuItem({
    cName: "Print to " + printerName,
    cEnable: "event.rc = !!event.target;",
    cParent: cName,
    cExec: "sendToPDFCreator(event.target)"
});

app.addMenuItem({
    cName: "-",
    cParent: cName,
    cExec: ""
});

app.addMenuItem({
    cName: "Visit UOQ portal Page",
    cParent: cName,
    cExec: "app.launchURL('http://pkiconnect.perkinelmer.com/sbe/Service/LBMTX/UOQ/default.aspx')"
});

app.addMenuItem({
    cName: "Visit Metrology portal Page",
    cParent: cName,
    cExec: "app.launchURL('http://pkiconnect.perkinelmer.com/sbe/Service/MET/default.aspx')"
});

app.addMenuItem({
    cName: "Visit OneSource Page",
    cParent: cName,
    cExec: "app.launchURL('http://www.perkinelmer.com/onesource/')"
});
