var Poeng = Ractive.extend({
  template: $('template-poeng').innerText
});

function fikkResultater (data) {

  var resultater = new Resultater(data);

  var idag = new Date();

  var dagIMåneden = idag.getDate();
  var formatertDato = idag.getDate() + "/" + (idag.getMonth() + 1);

  var dagensResultater = resultater.poengForDag(dagIMåneden);


  var poeng = new Poeng({
    el: $('poeng'),
    data: {
      dato : formatertDato,
      deltagere: _.flatten(dagensResultater)
    }
  });

  poeng.on( 'bakover', function ( event ) {
    idag.setDate(idag.getDate()-1);
  });

  poeng.on( 'framover', function ( event ) {
    idag.setDate(idag.getDate()+1);
  });
}

