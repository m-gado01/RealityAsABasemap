
AFRAME.registerComponent('change-color-on-hover', {
    init: function () {
        console.log(data, el);
        var data = this.data;
        var el = this.el;  // <a-box>
        var defaultColor = el.getAttribute('material').color;

        el.addEventListener('click', function () {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('click', function () {
            el.setAttribute('color', defaultColor);
        });
    }
});