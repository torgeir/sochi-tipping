var Medaljene = Ractive.extend({
  template: $('template-medaljene').innerText
});

function fikkResultater (data) {

  var resultater = new Resultater(data);
 
  var harLocalstorage = ('localStorage' in window);
  var valgtNavn = harLocalstorage && localStorage.getItem('valgtNavn') || undefined;

  var medaljene = new Medaljene({
    el: $('medaljene'),
    data: {
      navn: resultater.navn,
      valgtNavn: valgtNavn
    }
  });

  medaljene.observe('valgtNavn', function (navn) {

    if(!navn) {
      return 
    }

    if (harLocalstorage) {
      localStorage.setItem("valgtNavn", navn)
    }

    var valg = resultater.poengFor(navn, new Date(2014, 2, 24));
    this.set('valg', valg); 
  }); 
}

