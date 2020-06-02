var position, scene = null;

$(document).ready(() => {
    navigator.geolocation.getCurrentPosition((x) => {
        position = x;
        scene = $('a-scene')[0];
        getBusstops();
    });
});

function getBusstops() {
    const conterra_url = 'https://rest.busradar.conterra.de/prod/haltestellen';

    $.ajax({
        dataType: "json",
        url: conterra_url,
        data: {},
        success: function (data) {
            var busstops = data.features;
            busstopsToAR(busstops);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function busstopsToAR(busstops) {
    busstops.forEach((busstop) => {
        console.log(busstop.geometry.coordinates);
    });
}