var Dagens = Ractive.extend({
  template: $('template-dagens-gjetting').innerText
});

function fikkResultater (data) {

  var resultater = new Resultater(data);
  
  var idag = new Date();
  var formatertDato = idag.getDate() + "/" + (idag.getMonth() + 1);

  var dagens = new Dagens({
    el: $('dagens-gjetting'),
    data: {
      dag: idag.getDate(),
      dato: formatertDato,
      navn: resultater.navn,
      valgtNavn: undefined
    }
  });

  var harLocalstorage = ('localStorage' in window);

  dagens.observe('valgtNavn', function (navn) {

    if (!navn) {
      if (!harLocalstorage) {
        return
      }
      else {
        navn = localStorage.getItem("valgtNavn");
        if (navn == null) {
          return;
        }
        else {
          this.set('valgtNavn', navn);
        }
      }
    }

    if (harLocalstorage) {
      localStorage.setItem("valgtNavn", navn)
    }

    var dag = this.get('dag');
    var valg = resultater.poengFor(navn, dag);
    this.set('valg', valg); 
  }); 
}

