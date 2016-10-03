function normalizePageArr(arrPage){
	var tmpArrLength = arrPage.length, res = [], arItems, n, v;
	
	for(var i = 0; i < tmpArrLength; i++){
		v = arrPage[i];
		arItems = v.split("-");
	
		if(arItems.length > 1){
			n = parseInt(arItems[0]);
			
			while(n <= parseInt(arItems[1])) {
				res.push(n);
				n++;
			}
			
		} else {
			res.push(parseInt(v));
		}
	}
	
	return res;
}

function pageNumInArray(pNum, arr) {
	var arrLength = arr.length, res = false;
	
	for(var i = 0; i < arrLength; i++){
		if(arr[i] == pNum){
			res = true;
			break;
		}
	}
	
	return res;
}

app.addMenuItem({
	cName: "Print", 
	cUser: "Print...",
	cParent: "File",
	cExec: "choosePrintAction()",
	cEnable: "event.rc = (event.target != null);",
	nPos: 0
});

var choosePrintAction = app.trustedFunction(function(){
	app.beginPriv();
	
	var field = this.getField("Print_Selection");
	
	if(!!field){
		testPrintDoc(this);
	} else {
		this.print();
	}
	
	app.endPriv();
});

var testPrintDoc = app.trustedFunction(function(oDoc){
	app.beginPriv();
	
	var pStr = oDoc.getField("Print_Selection").value;
		
	if(pStr === ""){
		app.alert("Before print Report, you must create summary table and paginate the Report!");
		return;
	}
	
	var path = oDoc.order,
		docLength = oDoc.numPages;
		tmpArr = pStr.split(","),
		res = normalizePageArr(tmpArr),
		index = -1,
		_newDocLength = docLength;
	
	oDoc.calculate = false;
	
	for(var i = 0; i < docLength; i++) {	
		if(pageNumInArray((i+1), res)) {
			var tName = "myTemplate" + i, t = oDoc.createTemplate({cName: tName, nPage: i });
			t.spawn({nPage: _newDocLength, bRename: false, bOverlay: false });
			
			_newDocLength++;
		}
	}
	
	oDoc.print(true, docLength, _newDocLength-1);
	oDoc.deletePages(docLength, _newDocLength-1);
	oDoc.calculate = true;
	
	app.endPriv();
});