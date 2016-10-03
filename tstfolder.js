/**
 * Validation Functional testing framework
 * @namespace
 * @version 0.0.2
 * @author EPAM TEAM
 */

var app = typeof app == 'object' ? app : {
    trustedFunction: function () {
        return function () {
        };
    }
};


var tstf = {


    cnt: 0,
    clearedCnt: 0,
    tstdata: null,
    engineDoc: null,


    /**
     * facade for _mock
     */
    mock: function () {
        var txt = "ERROR - no tstdata!";
        var nIcon = 0;
        if (tstf._checkLocale()) {
            if (tstf.tstdata) {
                var res = tstf._mock();
                txt = "MOCK DATA\n\n";
                txt += tstf.cnt + " fields populated\n";
                txt += tstf.clearedCnt + " results cleared\n";
                txt += res.length + " fields missing\n";
                if (res.length) {
                    txt += res.join('\n');
                } else {
                    nIcon = 3;
                }
            }
        } else {
            txt = "ERROR - switch to English locale for validation";
        }

        app.alert({cMsg: txt, nIcon: nIcon});

    },

    /**
     * facade for _run
     */
    run: function () {
        tstf.engineDoc.calculateNow();
        tstf.engineDoc.calculateNow();
        var txt = "No fields were mocked\nRun Validation->Mock first";
        var nIcon = 0;
        var errorsctn = 0;
        var res;
        var k;

        if (tstf.cnt) {
            res = tstf._run();
            txt = "VALIDATION REPORT\n\n";

            for (k in res) {
                if (errorsctn) {
                    break;
                }
                errorsctn++;
            }

            if (errorsctn) {
                tstf.showWindow(res);
            } else {
                nIcon = 3;

                txt += tstf.cnt + " fields validated\n";
                txt += "0 errors found\n";
                app.alert({cMsg: txt, nIcon: nIcon});
            }

        } else {
            app.alert({cMsg: txt, nIcon: nIcon});
        }


    },

    /**
     * facade for _unmock
     */
    unmock: function () {
        var txt = "No mocked fields found!";
        if (tstf.tstdata) {
            tstf._unmock();
            txt = "All fields cleared!";
        }
        tstf.engineDoc.calculateNow();
        tstf.engineDoc.calculateNow();
        app.alert({cMsg: txt, nIcon: 3});
    },

    /**
     * _chackLocale logic
     * @private
     */
    _checkLocale: function () {
        return tstf.engineDoc && tstf.engineDoc.getField('PASS') && (tstf.engineDoc.getField('PASS').value == "Pass");
    },

    /**
     * _mock logic
     * @private
     */
    _mock: function () {

        tstf.engineDoc.calculate = false;
        tstf.cnt = 0;

        var res = [];
        if (tstf.tstdata) {
            var k, f;
            for (k in tstf.tstdata) {
                f = tstf.engineDoc.getField(k);
                if (f) {
                    tstf.cnt++;
                    f.value = tstf.tstdata[k];
                } else {
                    res.push(k);
                }
            }
        }
        tstf.clearResults();
        tstf.engineDoc.calculate = true;
        return res;
    },


    /**
     * _unmock logic
     * @private
     */
    _unmock: function () {
        tstf.engineDoc.calculate = false;
        if (tstf.engineDoc.getField && tstf.tstdata) {
            var k, f;
            for (k in tstf.tstdata) {
                f = tstf.engineDoc.getField(k);
                if (f && f.type == 'text') {
                    f.value = '';
                }
                tstf.cnt--;
            }
        }
        tstf.engineDoc.calculate = true;
        return true;

    },

    /**
     * _run logic
     * @private
     */
    _run: function () {


        var errors = {};

        if (tstf.tstdata) {
            var k, f, line, val, key, pg;
            for (k in tstf.tstdata) {
                f = tstf.engineDoc.getField(k);
                if (f) {
                    if (f.value != tstf.tstdata[k]) {
                        //one page or list of pages
                        //-1 means template or ghost
                        pg = f.page > -1 ? Number(String(f.page).split(',')[0]) : 'Unknown';
                        key = "Page " + pg;
                        errors[key] = errors[key] || {};
                        //console.println(k);
                        //console.println(String(f.value));
                        //console.println('---');
                        val = String(f.value).length ? f.value : "(empty)";
                        console.println('"' + k + '": "' + val + '",');
                        line = k + " value " + val + " expected " + tstf.tstdata[k];
                        errors[key][line] = pg;
                    }
                }
            }
        }


        return errors;


    },


    showWindow: app.trustedFunction(function (res) {
        app.beginPriv();

        var k, j, ercnt = 0;

        for (k in res) {
            for (j in res[k]) {
                ercnt++;
            }
        }

        var dlg = {
            initialize: function (dialog) {
                dialog.load({
                    subl: res
                })
            },
            subl: function (dialog) {
                var element = dialog.store()["subl"];
                var retn = this.getHierChoice(element);
                //console.println('retn ' + retn.value);
                if (retn) {
                    tstf.engineDoc.pageNum = retn.value;
                }
            },
            getHierChoice: function (e) {
                if (typeof e == "object") {
                    for (var i in e) {
                        if (typeof e[i] == "object") {
                            var retn = this.getHierChoice(e[i]);
                            if (retn) {
                                retn.label = i + ", " + retn.label;
                                return retn;
                            }

                        } else if (e[i] > 0) {
                            return {label: i, value: e[i]};
                        }
                    }
                } else {
                    if (e[i] > 0) {
                        return e[i];
                    }
                }
            },

            cncl: function (dialog) {
                dialog.end("cancel")
            },

            description: {
                width: 500,
                height: 400,
                name: "Test results",
                elements: [
                    {
                        type: "view",
                        align_children: "align_left",
                        elements: [
                            {
                                type: "cluster",
                                name: ercnt + " errors found",
                                item_id: "clst",
                                elements: [
                                    {
                                        type: "hier_list_box",
                                        item_id: "subl",
                                        char_width: 20,
                                        width: 450,
                                        height: 350
                                    }
                                ]
                            },
                            {
                                type: "view",
                                align_children: "align_row",
                                elements: [
                                    {
                                        type: "button",
                                        item_id: "cncl",
                                        name: "Close"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };


        app.execDialog(dlg);
        app.endPriv();

    }),

    handler: app.trustedFunction(function (engineDoc, action) {
        app.beginPriv();


        if (engineDoc) {

            if (engineDoc.tstdata) {
                if (tstf[action]) {
                    tstf.engineDoc = engineDoc;
                    tstf.tstdata = engineDoc.tstdata;
                    tstf[action]()
                } else {
                    app.alert('WRONG ACTION: ' + action);
                }
            } else {
                app.alert('NO tstdata FOUND ON DOC LEVEL');
            }

        } else {
            app.alert('NO ACTIVE ENGINE FOUND');
        }
        app.endPriv();
    }),

    eachFieldNamePartialF: function (fieldNamePart, callback) {

        for (var i = 0; i < tstf.engineDoc.numFields; i++) {
            var fn = tstf.engineDoc.getNthFieldName(i);

            if (fn.indexOf(fieldNamePart) > -1) {

                var j = 0;
                var field = tstf.engineDoc.getField(fn);

                if (field) {
                    var fields = field.getArray(), item, fname, separatorPosition, index;
                    var ln = fields.length;

                    for (j; j < ln; j++) {
                        item = fields[j];
                        fname = item.name;
                        separatorPosition = fname.lastIndexOf(".");
                        index = parseInt(fname.substr(separatorPosition + 1));
                        callback.call(null, item, index);
                        tstf.clearedCnt++;
                    }
                }

            }
        }

    },

    isNumericF: function (val) {
        return 1 * val == val;
    },

    clearResults: function () {
        //clear ave/ dev/ rsd/ pf

        tstf.clearedCnt = 0;

        var listToClear = [
            '.Acc.', 'avg.', '.Ave.',
            '.Cal.', 'dev', 'drift.',
            '.Int.',  '_linked',  '.Max.', '.Min.', 'noise.',
            '.Ran.', 'rsd', '.Rsd.', '.Rsq.',
            'Result.', 'result.', '_round',
            '.Slp.', '.Stb.', '.Std.'

        ];
        var len = listToClear.length;

        while (len--) {
            tstf.eachFieldNamePartialF(listToClear[len], function (item) {
                if (tstf.isNumericF(item.value)) {
                    item.value = "";
                }
            });
        }

        tstf.eachFieldNamePartialF('pf.', function (item) {
            item.value = "";
        });

        tstf.eachFieldNamePartialF('ave', function (item) {
            if (item.name.indexOf('#') > -1 && tstf.isNumericF(item.value)) {
                item.value = "";
            }
        });


    }
};


/* istanbul ignore next */
if (typeof require === "function") {
    module.exports = tstf;
}


