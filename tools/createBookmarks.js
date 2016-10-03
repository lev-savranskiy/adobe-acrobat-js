/**
 * creates Bookmarks from Testbanners
 * Do Bookmark named 'Tests' and run function in console
 */


function createBookmarks() {

    var data = [];
    var i = 6;
    for (var i = 6; i < 100; i++) {

        if (getField('Testbanner.' + i)) {
            var target = getField('Testbanner.' + i).page;
            data[target] = getField('Testbanner.' + i).value;
        }
    }


//console.println(data);

    var len = data.length;
    for (i = 0; i < len; i++) {
        if(data[i]){
            bookmarkRoot.children[1].createChild(data[i], 'pageNum = ' + i, bookmarkRoot.children[1].children ? bookmarkRoot.children[1].children.length : 0);
        }

    }




}
