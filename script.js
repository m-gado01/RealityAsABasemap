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

/**
 * @description This function is called, when URL can't access data
 * @param {*} e 
 */
function errorcallback(e) {
    // console.dir(x);
    // console.dir(e);
    document.getElementById("content").innerHTML = "errorcallback: check web-console";
}

/**
 * @description This function is called when URL can load data
 */
function loadcallback() {
    //console.dir(x);
    //console.log(x.status);
}

// This is the resource URL from where to access data
var resource = "https://rest.busradar.conterra.de/prod/haltestellen";

// XHR-obejct requests
var x = new XMLHttpRequest();
x.onload = loadcallback;
x.onerror = errorcallback;
x.onreadystatechange = statechangecallback;
x.open("GET", resource, true);
x.send();

//initialize output array(global)
var inicall = [];

/**
 * @description This function is the callback function of the URL that gets the users closest
 * 5 busstops in Muenster, including their distance and their direction and saves all these informations
 * in an array.
 */
function statechangecallback() {
    //if the data is okay
    if (x.status == "200" && x.readyState == 4) {
        // initialize output array  
        var narr = [];
        // convert received data to JS-object
        var t = JSON.parse(x.response);
        // convert received coordinates to JS-object
        var pnt = JsonPoint().coordinates;

        // for all features in the received data  
        for (i = 0; i < t.features.length; i++) {
            // get name of busstop
            inicall.push(t.features[i]);
        }

        console.log(inicall);

    }
}
console.log(inicall)

