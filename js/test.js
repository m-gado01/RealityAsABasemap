$(document).ready(() => {
    navigator.geolocation.getCurrentPosition((x) => {
        position = x;
        scene = $('a-scene')[0];
        initBusstops(position, scene);
    });
});