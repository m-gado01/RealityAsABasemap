var position, scene = null;

function initBusstops(p, s) {
    position = p;
    scene = s;
    getBusstops();
}

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
    const counter = 0;
    busstops.forEach((busstop) => {
        if (counter <= 50) {

            var latitude = busstop.geometry.coordinates[0];
            var longitude = busstop.geometry.coordinates[1];
            var icon = document.createElement('a-image');

            icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
            icon.setAttribute('src', 'img/busstop.png');
            icon.setAttribute('look-at', '[gps-camera]');
            icon.setAttribute('scale', '20 20')

            scene.appendChild(icon);

            counter++;
        }
    });
}