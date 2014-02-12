var Poeng = Ractive.extend({
  template: $('template-poeng').innerText
});

function fikkResultater (data) {

  var resultater = new Resultater(data);

  var paginering = new DatoPaginering(new Date());

  var poeng = new Poeng({
    el: $('poeng'),
    data: {
      dato: paginering.dato(),
    }
  });

  poeng.on('bakover', function () {
    this.set('dato', paginering.forrige());
  });

  poeng.on('framover', function () {
    this.set('dato', paginering.neste());
  });

  poeng.observe('dato', function () {
    var dagensResultater = resultater.poengForDag(paginering.dato());
    this.set('deltagere', _.flatten(dagensResultater));
    this.set('datoFormatert', paginering.datoFormatert());
  })
}

