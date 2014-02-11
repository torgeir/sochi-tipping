var Poeng = Ractive.extend({
  template: $('template-poeng').innerText
});

function fikkResultater (data) {

  var toppliste = new DagslisteSortert(data, '9');

  var poeng = new Poeng({
    el: $('poeng'),
    data: {
      deltagere: _.flatten(toppliste.pallen.concat(toppliste.resten))
    }
  });
}

