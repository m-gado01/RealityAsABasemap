function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        document.getElementbyId("geojson").value = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var coordLat = position.coords.longitude;
    var coordLong = position.coords.latitude;
    console.log(coordLat, coordLong);
}

getLocation();