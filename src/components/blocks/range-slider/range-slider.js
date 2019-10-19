import 'nouislider';
// import 'nouislider/distribute/nouislider.css';

var slider = document.getElementById('range-slider');

if (slider != undefined) {
    noUiSlider.create(slider, {
      start: [5000, 10000],
      range: {
        'min': [0],
        'max': [15000]
      },
      connect: true
    });

    var resultElement = document.getElementById('RangeSliderResult');

    slider.noUiSlider.on('update', function (values) {
      const bounds = [];
      bounds[0] = Math.round(values[0]) + "₽";
      bounds[1] = Math.round(values[1]) + "₽";
      resultElement.innerHTML = bounds.join(' - ');
    });
}

