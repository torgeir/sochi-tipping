var Poeng = Ractive.extend({
  template: $('template-poeng').innerText
});

function fikkTopplistenSortert (data) {

  var toppliste = new TopplisteSortert(data);

  var poeng = new Poeng({
    el: $('poeng'),
    data: {
      deltagere: _.flatten(toppliste.pallen.concat(toppliste.resten))
    }
  });
}

