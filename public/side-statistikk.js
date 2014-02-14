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
	var chart = new Chart(ctx).Line(valg.chartData, {
		scaleFontColor: "#FFF",
		scaleOverride : true,	
		scaleSteps : (valg.poengTotalt / 10) + 1,
		scaleStepWidth : 10,
		scaleStartValue : 0
	});

    this.set('valg', valg.verdier); 
  }); 
};