var position, scene = null;

$(document).ready(() => {
    navigator.geolocation.getCurrentPosition((x) => {
        position = x;
        scene = document.querySelector('a-scene');
        loadPlaces();
        loadWeather();
    });
});

$(document).on({
    ajaxStart: function () { $("body").addClass("loading"); },
    ajaxStop: function () { $("body").removeClass("loading"); }
});

//get current user location

/**
 * @description This function takes the input coordinates from an oringin and a destination as arrays
 * and calculates the distance from the origin point to that destination point
 * @param {array} origin - the single point that is the origin to other points
 * @param {array} dest - a single point to which the distance has to be calculated to
 * @return {number} d - the distance
  */

var dist = function (origin, dest) {

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

function loadPlaces() {
    $.ajax({
        url: "https://rest.busradar.conterra.de/prod/haltestellen",
        type: "GET",
        success: busstops_callback
    });


    var inicall = [];


    /**
    * @description This function is the callback function of the URL that gets the users closest
    * 5 busstops in Muenster, including their distance and their direction and saves all these informations
    * in an array.
    */
    function busstops_callback(x) {

        //var position = navigator.geolocation.getCurrentPosition();
        var narr = [];

        for (i = 0; i < x.features.length; i++) {
            // get name of busstop
            var lagebez = x.features[i].properties.lbez;
            //get coordinates of busstop
            var coords = x.features[i].geometry.coordinates;
            //get distance of busstop
            var distance = dist([position.coords.longitude, position.coords.latitude], coords);
            //save all the data above in a single array
            var inarr = [lagebez, coords, distance];
            //push the array into the output array
            narr.push(inarr);
        }

        // sort the busstops in descending disctance order
        narr.sort(
            function (a, b) {
                return a[2] - b[2];
            });

        // save the closest 5 busstops in the global array   
        inicall = narr.slice(0, 5);
        // when data is loaded, activate the "Kalkulieren"-button

        var places = [
            {
                name: inicall[0][0],
                location: {
                    lat: inicall[0][1][1],
                    lng: inicall[0][1][0],
                }
            },
            {
                name: inicall[1][0],
                location: {
                    lat: inicall[1][1][1],
                    lng: inicall[1][1][0],
                }

            },
            {
                name: inicall[2][0],
                location: {
                    lat: inicall[2][1][1],
                    lng: inicall[2][1][0],
                }
            },
            {
                name: inicall[3][0],
                location: {
                    lat: inicall[3][1][1],
                    lng: inicall[3][1][0],
                }

            },
            {
                name: inicall[4][0],
                location: {
                    lat: inicall[4][1][1],
                    lng: inicall[4][1][0],
                }

            }];
        main(places);
    }
}

function main(places) {
    //places = loadPlaces();
    //var places = loadPlaces();
    //.then((places) => {
    // get scene

    //return navigator.geolocation.getCurrentPosition(function (position) { //get current user location

    // add every Busstop to the scene
    places.forEach((place) => {
        const latitude = place.location.lat;
        const longitude = place.location.lng;

        // add place icon
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        icon.setAttribute('name', place.name);
        icon.setAttribute('src', '../img/map-marker.png');
        icon.setAttribute('look-at', '[gps-camera]');
        icon.setAttribute('clickable', true);

        // for debug purposes, just show in a bigger scale
        icon.setAttribute('scale', '20, 20');

        scene.appendChild(icon);
    });

    (err) => console.error('Error in retrieving position', err),
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 27000,
    }
}

function loadWeather() {
    var date = moment(Date.now()).locale("de");
    $("#datetime").text(date.format("LLLL"));

    var timestamp = Date.now();
    $("#slider")
        .attr("min", timestamp)
        .attr("max", timestamp + 1000 * 60 * 60 * 24)
        .attr("step", 3600);

    $("#slider").on("input", () => {
        var timestamp = parseInt($("#slider").val());
        var date = moment(timestamp).locale("de");
        $("#datetime").text(date.format("LLLL"));
    });

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var url = "https://api.openweathermap.org/data/2.5/onecall?"
        + "lat=" + lat + "&"
        + "lon=" + lon + "&"
        + "appid=" + OpenWeatherMapAPI_Key;

    $.ajax({
        url: url,
        type: "GET",
        success: (data) => {
            const weather = data.current.weather[0];
            const iconurl = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";

            const icon = document.createElement('a-image');
            icon.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${lon}`);
            icon.setAttribute('name', weather.description);
            icon.setAttribute('src', iconurl);
            icon.setAttribute('look-at', '[gps-camera]');
            icon.setAttribute('clickhander', true);
            icon.setAttribute('scale', '50, 50');
            icon.setAttribute('position', '0 1000 0');

            scene.appendChild(icon);
        }
    });
}

AFRAME.registerComponent('clickable', {
    init: function () {
        this.el.addEventListener("click", () => {
            alert("I have been clicked!");

        });
    }
});