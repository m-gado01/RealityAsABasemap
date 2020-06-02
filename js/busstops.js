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
            var busstops = filterBusstops(data.features);
            //busstopsToAR(busstops);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function busstopsToAR(busstops) {
    busstops.forEach((busstop) => {
        var latitude = busstop.geometry.coordinates[0];
        var longitude = busstop.geometry.coordinates[1];
        var icon = document.createElement('a-image');

        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        icon.setAttribute('src', 'img/busstop.png');
        icon.setAttribute('look-at', '[gps-camera]');
        icon.setAttribute('scale', '20 20')

        scene.appendChild(icon);
    });
}

function filterBusstops(busstops) {
    busstops.forEach((busstop) => {
        console.log(position, busstop.geometry.coordinates);
    });
}

function getDistance(origin, dest) {

    //get coordinates of point
    var lon1 = origin[0];
    var lat1 = origin[1];
    var lon2 = dest[0];
    var lat2 = dest[1];

    //degrees to radiants
    var R = 6371e3; // metres
    var φ1 = lat1 * (Math.PI / 180);
    var φ2 = lat2 * (Math.PI / 180);
    var φ3 = lon1 * (Math.PI / 180);
    var φ4 = lon2 * (Math.PI / 180);
    var Δφ = (lat2 - lat1) * (Math.PI / 180);
    var Δλ = (lon2 - lon1) * (Math.PI / 180);

    //calculate distances
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //distance
    var d = Math.round(R * c);

    return d;
}