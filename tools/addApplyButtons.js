/**
 * Adds ApplyButton after each ExtraPage field (for old engiens run once in console)
 * @function
 */
var addApplyButtons = (function(){

    function AddButton(nPageNum, x, y, width, height, fname , strCaption, strToolTip, strAction)
    {

        var aRect = [];
        aRect[0] = x;
        aRect[1] = y;
        aRect[2] = aRect[0] + width;
        aRect[3] = aRect[1] - height;

        console.println(aRect);

        var f = this.addField(fname,"button", nPageNum, aRect);
        f.setAction("MouseUp",strAction);
        f.userName = strToolTip;
        f.delay = true;
        f.borderStyle = border.s;
        f.highlight = "push";
        f.textSize = 10;
        f.textColor = color.black;
        f.strokeColor = color.black;
        f.fillColor = ["G", 0.9];
        f.buttonSetCaption(strCaption);
        f.delay = false;
    }

    Helper.eachField('ExtraPages', function(item, index){
        //ButtonRawPagesApply.6


            console.println('ExtraPage ' +  index  + ' page ' + item.page);
            var btnName = 'ButtonRawPagesApply.' + index;
            if(getField(btnName)){
                console.println('found ' + btnName);
            }else{
                //AddButton(p,x,0.5,0.25,0.25,"PrevPage","<","Previous Page","this.pageNum--;"); // left arrow, previous page

                var strAction = 'smr.rawPagesApply(event.target)';
                var strToolTip = 'Click to Add Raw Data Pages  after this test';
                var strCaption = 'Apply';

                //rect 439.2550048828125,762.81201171875,469.0140075683594,744.81201171875

                var x = item.rect[2] + 5;
                var y = item.rect[1];
                var width = 35;
                var height = 18;

                console.println('todo ' + btnName);
                console.println('rect ' + item.rect);

                AddButton(item.page,  x, y, width, height, btnName, strCaption, strToolTip, strAction);
            }
            console.println('---');


    })

})();