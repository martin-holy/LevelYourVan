var left_right, front_back, front_left, front_right, back_left, back_right;

var updateDistance = function() {
  left_right = Number.parseInt(document.getElementById('left_right').value);
  front_back = Number.parseInt(document.getElementById('front_back').value);
  localStorage.setItem('levelYourVan_left_right', left_right);
  localStorage.setItem('levelYourVan_front_back', front_back);
};

window.addEventListener('load', function() {
  navigator.serviceWorker
  .register('/LevelYourVan/sw_cached_files.js')
  .then(reg => console.log('Service Worker: Registered'))
  .catch(err => console.log(`Service Worker: Error: ${err}`, true));

  let lr = localStorage.getItem('levelYourVan_left_right'),
      fb = localStorage.getItem('levelYourVan_front_back');
  left_right = lr == null ? 175 : Number.parseInt(lr);
  front_back = fb == null ? 295 : Number.parseInt(fb);
  document.getElementById('left_right').value = left_right;
  document.getElementById('front_back').value = front_back;
  front_left = document.getElementById('front_left_wheel');
  front_right = document.getElementById('front_right_wheel');
  back_left = document.getElementById('back_left_wheel');
  back_right = document.getElementById('back_right_wheel');
});

window.addEventListener('deviceorientation', function(e) {
  if (e.gamma == null || e.beta == null) return;

  let lr = (left_right / Math.sin((90 - e.gamma) * (Math.PI / 180))) * Math.sin(e.gamma * (Math.PI / 180)),
      fb = (front_back / Math.sin((90 - e.beta) * (Math.PI / 180))) * Math.sin(e.beta * (Math.PI / 180)),
      fl = 0, fr = 0, bl = 0, br = 0;

  if (lr < 0) {
    fl += lr;
    bl += lr;
  } else {
    fr += lr;
    br += lr;
  }

  if (fb < 0) {
    fl += fb;
    fr += fb;
  } else {
    bl += fb;
    br += fb;
  }

  front_left.innerHTML = Math.abs(fl).round(0);
  front_right.innerHTML = Math.abs(fr).round(0);
  back_left.innerHTML = Math.abs(bl).round(0);
  back_right.innerHTML = Math.abs(br).round(0);
}, true);

if (!Number.prototype.round) {
  Number.prototype.round = function(places) {
    places = Math.pow(10, places);
    return Math.round(this * places) / places;
  };
}