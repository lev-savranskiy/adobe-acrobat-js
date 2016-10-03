//custadd -> custaddres&
//custname -> custname&
//enterengineername& -> enter engineer name&

for (var i = 0; i < numFields; i++) {
    var fname = getNthFieldName(i);

    if (fname != 'enter engineer name&' && fname.indexOf('engineer') > -1) {
        console.println(fname)
    }

    if (fname != 'custname&' && fname != 'custaddres&'  && fname.indexOf('cust') == 0) {
        console.println(fname)
    }
}
