$(document).ready(() => {
    navigator.geolocation.getCurrentPosition((x) => {
        var position = x;
        var scene = $('a-scene')[0];
        initBusstops(position, scene);
    });
});