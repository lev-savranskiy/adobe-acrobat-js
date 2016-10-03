/**
 * use to find all limits and setpoints
 * useful to verify engine / protocol match
 */

var cnt = 0;

for (;cnt < 100; cnt++){
    if(getField("L." + cnt)){

        Helper.eachField("L." + cnt , function(item){
            if(item.name.indexOf('rec') === -1){
                console.println(item.name + " " + item.page);
            }

        })
    }

    if(getField("S." + cnt)){
        Helper.eachField("S." + cnt , function(item){
            if(item.name.indexOf('rec') === -1){
                console.println(item.page);
            }
        })
    }


}


