var dialog4 = {
    initialize: function (dialog) {
        dialog.load({
            subl: {
                "Page 1": {
                    "avg.1 127 expected 128": 1,
                    "avg.2 201 expected 221": 1
                },
                "Page 2": {
                    "page_st.2 Pass expected Fail": 2
                },
                "Page 5": {
                    "pf.2 Pass expected Fail": 5
                }
            }
        })
    },
    subl: function (dialog) {
        //console.println("Selection Box Hit");
        var element = dialog.store()["subl"]
        var retn = this.getHierChoice(element);
        if (retn) {

            //console.println("The selection you've chosen is \""
            //    + retn.label + "\", its value is " + retn.value);
            //dialog.end("ok");

            pageNum = retn.value;

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

                } else if (e[i] > 0) return {label: i, value: e[i]};
            }
        } else {
            if (e[i] > 0) return e[i];
        }
    },
    //butn: function (dialog) {
    //    var element = dialog.store()["subl"]
    //    var retn = this.getHierChoice(element);
    //    if (retn) {
    //
    //        //console.println("The selection you've chosen is \""
    //        //    + retn.label + "\", its value is " + retn.value);
    //        //dialog.end("ok");
    //
    //        pageNum = retn.value;
    //
    //    }
    //    else app.alert("Please make a selection, or cancel");
    //},
    cncl: function (dialog) {
        dialog.end("cancel")
    },

    description: {
        width: 400,
        height: 400,
        name: "Test results",
        elements: [
            {
                type: "view",
                align_children: "align_left",
                elements: [
                    {
                        type: "cluster",
                        name: "4 tests failed",

                        elements: [
                            {
                                type: "hier_list_box",
                                item_id: "subl",
                                char_width: 20,
                                width: 350,
                                height: 350
                            }
                        ]
                    },
                    {
                        type: "view",
                        align_children: "align_row",
                        elements: [

                            //{
                            //    item_id: "butn",
                            //    type: "button",
                            //    name: "Select"
                            //},

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


app.execDialog(dialog4)

