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
        $('#textfield-waterflow').val(data.waterflow);



    });

    setInterval(function(){
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
        $('#waterflowselect').val(data.waterflow).slider('refresh');
        $('#textfield-waterflow').val(data.waterflow);



    });
    }, 10000);
});

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
