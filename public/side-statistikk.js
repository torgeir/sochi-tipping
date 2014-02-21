var Statistikk = Ractive.extend({
  template: $('template-statistikk').innerText
});

function fikkResultater (data) {

  var resultater = new Resultater(data);

  var data = resultater.poengDagForDag();

  var harLocalstorage = ('localStorage' in window);
  var valgtNavn = harLocalstorage && localStorage.getItem('valgtNavn') || undefined;

  var medaljene = new Statistikk({
    el: $('statistikk'),
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

    var valg = data[navn];

    var ctx = $('chart').getContext('2d');
    $('chart').width = window.innerWidth - 20;
    $('chart').height = window.innerWidth - 60;


    var chart = new Chart(ctx).LineDoubleY(valg.chartData, {
      Y1_scaleFontColor: "#FFF",
      Y1_scaleOverride : true,
      Y1_scaleSteps : (valg.poengTotalt / 10) + 1,
      Y1_scaleStepWidth : 10,
      Y1_scaleStartValue : 0,
      Y2_scaleFontColor: "#FFF",
      Y2_scaleOverride : true,
      Y2_scaleSteps : (valg.maksPlassering / 5) + 1,
      Y2_scaleStepWidth : 5,
      Y2_scaleStartValue : 0
    });

    this.set('valg', valg.verdier); 
  }); 
};