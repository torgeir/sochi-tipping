var Dagens = Ractive.extend({
  template: $('template-dagens-gjetting').innerText
});

function fikkResultater (data) {

  var resultater = new Resultater(data);

  var paginering = new DatoPaginering(new Date());

  var harLocalstorage = ('localStorage' in window);
  var valgtNavn = harLocalstorage && localStorage.getItem('valgtNavn') || undefined;

  var dagens = new Dagens({
    el: $('dagens-gjetting'),
    data: {
      dato: paginering.dato(),
      navn: resultater.navn,
      valgtNavn: valgtNavn
    }
  });

  dagens.observe('valgtNavn', function (navn) {

    if(!navn) {
      return 
    }

    if (harLocalstorage) {
      localStorage.setItem("valgtNavn", navn)
    }

    var valg = resultater.poengFor(navn, paginering.dato());
    this.set('valg', valg); 
  }); 

  dagens.on('bakover', function () {
    this.set('dato', paginering.forrige());
  });

  dagens.on('framover', function () {
    this.set('dato', paginering.neste());
  });

  dagens.observe('dato', function () {
    var valg = resultater.poengFor(this.get('valgtNavn'), paginering.dato());
    this.set('valg', valg)
    this.set('datoFormatert', paginering.datoFormatert());
  })

}

