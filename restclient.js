/**
 * Calls when waterflow slider changes. Calling AJAX POST request to http://wiktoreriksson.se/greenhousestatus/pin?state=toggle
 * Don't call this in a browser.
 */
function jsSetPin(){
    //Starting AJAX
    $.ajax({
        url: "http://wiktoreriksson.se/greenhousestatus/pin?state=toggle",
        type: "POST"
    }).then(function(data) {
        //Loading data
        $('#waterflowselect').val(data.state);
        $('#textfield-waterflow').val(data.state);
    });
}/**
 * Calls when fan slider changes. Calling AJAX POST request to http://wiktoreriksson.se/greenhousestatus/fan?state=toggle
 * Don't call this in a browser.
 */
function jsSetAC(){
    //Starting AJAX
    $.ajax({
        url: "http://wiktoreriksson.se/greenhousestatus/fan?state=toggle",
        type: "POST"
    }).then(function(data) {
        //Loading data
        $('#fan').val(data.state);
        $('#textfield-fan').val(data.state);

    });

}
function updateSite(data) {
    var woff=document.getElementById("waterflowoff"),
        won=document.getElementById("waterflowon"),
        foff=document.getElementById("fanoff"),
        fon=document.getElementById("fanon"),
        soil = data.soilmoisture.replace("wet", "fuktig").replace("dry", "torr");
    $('#textfield-soilmoisture').val(soil);
    var outtemp = round(data.outdoortemperature);
    $('#textfield-outdoortemperature').val(outtemp+' °C');
    var greentemp = round(data.greenhousetemperature, 1);
    $('#textfield-greenhousetemperature').val(greentemp+' °C');
    $('#waterflowselect').val(data.waterflow).slider('refresh');
    $('#fanselect').val(data.fanstate).slider('refresh');
    $('#textfield-waterflow').val(data.waterflow);
    $('#textfield-fan').val(data.fanstate);

    if(data.waterflow=="on") {
        won.selected = true;
    } else {
        woff.selected = true;
    }
    if(data.fanstate=="on") {
        fon.selected = true;
    } else {
        foff.selected = true;
    }
}
$(document).ready(function() {
    $.ajax({
        url: "http://wiktoreriksson.se/greenhousestatus/info"
    }).then(updateSite(data));

    setInterval(function(){
    $.ajax({
        url: "http://wiktoreriksson.se/greenhousestatus/info"
    }).then(updateSite(data));
    }, 5000);
});

function round(value, precision) {
	if (value == null) {
		return "--";

	}
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}