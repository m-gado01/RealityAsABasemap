var position, scene = null;

function initBuslines(p, s) {
    position = p;
    scene = s;
    getBuslines();
}

function getBuslines(busstop) {
    var nr = busstop.properties.nr;
    var conterra_url = "https://rest.busradar.conterra.de/prod/haltestellen" + "/" + nr + "/abfahrten?sekunden=" + 1600;

    $.ajax({
        dataType: "json",
        url: conterra_url,
        data: {},
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}