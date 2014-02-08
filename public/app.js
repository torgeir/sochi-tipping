$ = function (id) {
  return document.getElementById(id);
}

var Pall = Ractive.extend({
  template: $('template-pall').innerText
});

function fikkTopplistenSortert (data) {

  var toppliste = new TopplisteSortert(data);

  var forste = new Pall({
    el: $('forste'),
    data: { hoyde: 0, pall: '1', deltagere: toppliste.pallen[0] }
  });

  var andre = new Pall({
    el: $('andre'),
    data: { hoyde: 0, pall: '2', deltagere: toppliste.pallen[1] }
  });

  var tredje = new Pall({
    el: $('tredje'),
    data: { hoyde: 0, pall: '3', deltagere: toppliste.pallen[2] }
  });

  var options = { easing: 'easeInOut', duration: 300 };
  tredje.animate("hoyde", '7', options);
  setTimeout(function () {
    andre.animate("hoyde",  '12', options);
  }, 150);
  setTimeout(function () {
    forste.animate("hoyde", '18', options);
  }, 400);
}

window.onerror = function () {
  alert('Logg in med google-konton din!');
}
