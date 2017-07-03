/**
 * Created by henrikeriksson on 2017-06-21.
 */

$(document).ready(function() {
    $.ajax({
        url: "http://wiktoreriksson.se/greenhousestatus/info"
    }).then(function(data) {
        var soil = data.soilmoisture;
        soil = soil.replace("wet", "fuktig").replace("dry", "torr");
        $('#textfield-soilmoisture').val(soil);
        var outtemp = round(data.outdoortemperature);
        $('#textfield-outdoortemperature').val(outtemp+' °C');
        var greentemp = round(data.greenhousetemperature, 1);
        $('#textfield-greenhousetemperature').val(greentemp+' °C');
        $('#waterflowselect').val(data.waterflow);
        $('#fanselect').val(data.fanstate);
        $('#textfield-waterflow').val(data.waterflow);
        $('#textfield-fan').val(data.fanstate);
        var woff, won, foff, fon;
        woff=document.getElementById("waterflowoff");
        won=document.getElementById("waterflowon");
        foff=document.getElementById("fanoff");
        fon=document.getElementById("fanon");
        if(data.fanstate=="on") {
            fon.selected = true;
        } else {
            foff.selected = true;
        }
        if(data.waterflow=="on") {
            won.selected = true;
        } else {
            woff.selected = true;
        }


    });

    setInterval(function(){
    $.ajax({
        url: "http://wiktoreriksson.se/greenhousestatus/info"
    }).then(function(data) {
        var woff, won, foff, fon;
        woff=document.getElementById("waterflowoff");
        won=document.getElementById("waterflowon");
        foff=document.getElementById("fanoff");
        fon=document.getElementById("fanon");
        var soil = data.soilmoisture;
        soil = soil.replace("wet", "fuktig").replace("dry", "torr");
        $('#textfield-soilmoisture').val(soil);
	    var outtemp = round(data.outdoortemperature);
        $('#textfield-outdoortemperature').val(outtemp+' °C');
	    var greentemp = round(data.greenhousetemperature, 1);
        $('#textfield-greenhousetemperature').val(greentemp+' °C');
        $('#waterflowselect').val(data.waterflow).slider('refresh');
        $('#fanselect').val(data.fanstate).slider('refresh');
        $('#textfield-waterflow').val(data.waterflow);
        $('#textfield-fan').val(data.fanstate);
        if(data.fanstate=="on") {
            fon.selected = true;
        } else {
            foff.selected = true;
        }
        if(data.waterflow=="on") {
            won.selected = true;
        } else {
            woff.selected = true;
        }


    });
    }, 5000);
});

function round(value, precision) {
	if (value == null) {
		return "--";

	}
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
}