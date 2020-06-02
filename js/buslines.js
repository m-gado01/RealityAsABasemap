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
            if (data.length > 0) {
                var fahrtbezeichner = data[0].fahrtbezeichner;
                getLineString(fahrtbezeichner);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function getLineString(fahrtbezeichner) {
    var url = "https://rest.busradar.conterra.de/prod/fahrten/" + fahrtbezeichner;
    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        success: function (data) {
            LineStringToAR(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function LineStringToAR(linestring) {
    var arr = [];
    linestring.geometry.coordinates.forEach((coordinate) => {

        var lat1 = position.coords.latitude;
        var lon1 = position.coords.longitude;
        var lat2 = coordinate[1];
        var lon2 = coordinate[0];

        var z = getDistance(lat1, lon1, lat2, lon2);
        var direct = direc(lat1, lon1, lat2, lon2);
        var x = getX(direct, z);

        arr.push([x, 1, z]);
    });

    createLine(arr);
};

function createLine(arr) {
    var finalArr = [];
    for (i = 0; i < arr.length; i++) {
        var line = [("line__" + [i] + "=start: " + arr[i] + "; end:" + arr[i + 1] + "; color: red")];
        finalArr.push(line);
        //console.log(line)
    }

    drawToAR(finalArr);
}

function drawToAR(lines) {
    console.log(lines);
}