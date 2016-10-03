var reportDialog = app.trustedFunction(function reportDialog(height, reportName, elements, loadData) {
    app.beginPriv();

    var dialog = {
        initialize: function(dialog) {
            dialog.load(loadData)
        },
        cncl: function(dialog) {
            dialog.end("cancel");
        },

        description: {
            width: 400,
            height: height,
            name: reportName,
            elements: [
                {
                    type: "view",
                    elements: [
                        {
                            type: "button",
                            item_id: "cncl",
                            name: "Close"
                        }
                    ]
                },
                {
                    type: "view",
                    elements: [
                        {
                            type: "cluster",
                            elements: elements,
                            width: 350
                        }
                    ]
                }
            ]
        }
    };

    app.execDialog(dialog);

    app.endPriv();
});

function fontsReporterViewer(data) {
    var newData = {};
    var _oDataU = data.Used;
    var _oDataA = data.All;

    if(_oDataU) {
        newData.Used = commonTools.objReportFormat(_oDataU);
    }

    if(_oDataA) {
        newData.All = commonTools.arrReportFormat(_oDataA);
    }

    var loadData = {
        data: newData
    };

    var elements = [
        {
            type: "hier_list_box",
            item_id: "data",
            char_width: 20,
            width: 350,
            height: 200
        }
    ];

    reportDialog(250, "fontsReport", elements, loadData);
}

function charLimitsReporterViewer(data) {
    var newData = commonTools.objReportFormat(data);

    var loadData = {
        data: newData
    };

    var elements = [
        {
            type: "hier_list_box",
            item_id: "data",
            char_width: 20,
            width: 350,
            height: 200
        }
    ];

    reportDialog(250, "charLimitsReport", elements, loadData);
}

function incorrectFieldsReporterViewer(data) {
    var newData = commonTools.arrReportFormat(data);

    var loadData = {
        data: newData
    };

    var elements = [
        {
            type: "hier_list_box",
            item_id: "data",
            char_width: 20,
            width: 350,
            height: 200
        }
    ];

    reportDialog(250, "incirrectFieldsReport", elements, loadData);
}

function changeAllFonts(oDoc) {
    var cnt = 0;
    var allowedFonts = ['Wingdings', 'perkinelmer', 'perkinelmer4'];

    for(var k in font) {
        allowedFonts.push(font[k]);
    }

    var numFields = oDoc.numFields;

    for(var i = 0; i < numFields; i++) {
        var fName = oDoc.getNthFieldName(i);
        var field = oDoc.getField(fName);

        if((allowedFonts.indexOf(field.textFont) == -1)) {
            console.println(fName + ': ' + field.textFont);

            field.textFont = 'Helvetica';
            cnt++;
        }
    }

    console.println("\n\rnumFields " + numFields);
    console.println(cnt + "  set to Helvetica");

    var elements = [
        {
            type: "static_text",
            char_width: 20,
            name: "\n\rnumFields " + numFields,
            width: 350,
            height: 50
        },
        {
            type: "static_text",
            char_width: 20,
            name: cnt + "  set to Helvetica",
            width: 350,
            height: 50
        }
    ];

    reportDialog(200, "changeAllFonts", elements);
}

function changeCalcOrder(oDoc) {
    var num = oDoc.numFields;
    var calcOrderIndexMax = 0;

    for(var i = 0; i < num; i++) {
        var fname = oDoc.getNthFieldName(i);
        var f = oDoc.getField(fname);

        if(f.calcOrderIndex > calcOrderIndexMax) {
            calcOrderIndexMax = f.calcOrderIndex;
        }
    }


    console.println('calcOrderIndexMax ' + calcOrderIndexMax);

    var page_stReport = {};
    var pfReport = {};
    var runnerReport = 'not found';

    if(oDoc.getField('CALCULATERUNNER')) {
        oDoc.getField('CALCULATERUNNER').calcOrderIndex = 0;
        runnerReport = ' calcOrderIndex set to 0';
    }

    if(calcOrderIndexMax > 0){

        oDoc.Helper.eachField('page_st', function(item) {
            page_stReport[item.name + ' calcOrderIndex set to ' + calcOrderIndexMax] = "";
            console.println(page_stReport);
            item.calcOrderIndex = calcOrderIndexMax;
            calcOrderIndexMax--;
        });

        oDoc.Helper.eachField('pf', function(item) {
            pfReport[item.name + ' calcOrderIndex set to ' + calcOrderIndexMax] = "";

            item.calcOrderIndex = calcOrderIndexMax;
            calcOrderIndexMax--;
        });
    }


    var elements = [
        {
            type: "static_text",
            char_width: 20,
            name: 'calcOrderIndexMax ' + calcOrderIndexMax,
            width: 350,
            height: 20
        },
        {
            type: "static_text",
            char_width: 20,
            name: 'CALCULATERUNNER ' + runnerReport,
            width: 350,
            height: 20
        },
        {
            type: "list_box",
            char_width: 20,
            item_id: "pgRp",
            width: 350,
            height: 150
        },
        {
            type: "list_box",
            char_width: 20,
            item_id: "pfRp",
            width: 350,
            height: 150
        }
    ];

    var loadData = {
        pgRp: page_stReport,
        pfRp: pfReport
    };

    reportDialog(400, "changeCalcOrder", elements, loadData);
}

function checkAllPrintCheckboxes(oDoc) {

    oDoc.calculate = false;
    var cnt = 0;
    for(var i = 0; i < oDoc.numFields; i++) {
        var fname = oDoc.getNthFieldName(i);
        if(fname.indexOf('Check Box tobeprint') > -1) {
            oDoc.getField(fname).value = "Yes";
            cnt++;
        }
    }

    console.println(cnt + ' checked ');

    var elements = [
        {
            type: "static_text",
            char_width: 20,
            name: cnt + ' checked ',
            width: 350,
            height: 50
        }
    ];

    reportDialog(100, "checkAllPrintCheckboxes", elements);

    oDoc.calculate = true;
}

function uncheckAllPrintCheckboxes(oDoc) {
    oDoc.calculate = false;
    var cnt = 0;
    for(var i = 0; i < oDoc.numFields; i++) {
        var fname = oDoc.getNthFieldName(i);
        if(fname.indexOf('Check Box tobeprint') > -1) {
            oDoc.getField(fname).value = "Off";
            cnt++;
        }
    }

    console.println(cnt + ' unchecked ');

    var elements = [
        {
            type: "static_text",
            char_width: 20,
            name: cnt + ' unchecked ',
            width: 350,
            height: 50
        }
    ];

    reportDialog(100, "uncheckAllPrintCheckboxes", elements);

    oDoc.calculate = true;
}

function exportAllAsFDF(oDoc) {
    oDoc.exportAsFDF(true, true, null);
}

function exportPageAsFDF(oDoc) {
    var aField = [];
    var currentPage = oDoc.pageNum;

    for(var i = 0; i < oDoc.numFields; i++) {
        var nthFieldName = oDoc.getNthFieldName(i);
        var field = oDoc.getField(nthFieldName);
        if(field.page === currentPage) {
            aField.push(nthFieldName);
        }
    }

    oDoc.exportAsFDF(true, true, aField);
}
