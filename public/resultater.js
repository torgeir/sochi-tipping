function Resultater (data) {

  var heleTabellen = _.chain(data.feed.entry)
  .map(function (o) {
    return o.content.$t;
  })
  .value();
  
  var celler       = heleTabellen.length;
  var cellerPerRad = Math.ceil(celler/70);

  var innledendeOverskrifter = 3;
  var grupperteOverskrifter  = (cellerPerRad - innledendeOverskrifter)/2;
  var antallOverskrifter     = innledendeOverskrifter + grupperteOverskrifter;

  var radEnUtenInnledendeOverskrifter = _.rest(heleTabellen, innledendeOverskrifter);
  this.navn = _.first(radEnUtenInnledendeOverskrifter, grupperteOverskrifter);
  
  var tallceller = _.rest(heleTabellen, antallOverskrifter);

  var rader = [];
  while (tallceller.length) {
    rader.push(_.first(tallceller, cellerPerRad));
    tallceller = _.drop(tallceller, cellerPerRad);
  }

  var ovelser = _.map(rader, function (rad) {
    var dato   = rad[0],
        ovelse = rad[1],
        resultat = rad[2],
        poeng  = _.rest(rad, 3); // fasit

    var poengUtenDiff = _.reject(poeng, function (poeng, i) {
      return i % 2 != 0;
    });


    var poengMedDiff = _.reject(poeng, function (poeng, i) {
      return i % 2 == 0;
    });

    return {
      dato: dato,
      ovelse: ovelse,
      resultat: resultat,
      poeng: poengMedDiff,
      tippet: poengUtenDiff
    };
  });

  this.ovelser = _.groupBy(ovelser, "dato");
}

Resultater.prototype.poengFor = function (navn, dato) {
  var self = this,
      dag = dato.getDate(),
      dagensOvelser = this.ovelser[dag];

  return _.map(dagensOvelser, function (ovelsePåDato) {
    var index = self.navn.indexOf(navn);
    return {
      ovelse: ovelsePåDato.ovelse,
      tippet: ovelsePåDato.tippet[index],
      poeng: ovelsePåDato.poeng[index],
      resultat: ovelsePåDato.resultat
    };
  });
};

Resultater.prototype.poengForDag = function (dato) {
  var self = this,
    pos,
    dag = dato.getDate(),
    dagensOvelser = this.ovelser[dag];

  return _.chain(this.navn)
    .map(function (etNavn) {
      pos = self.navn.indexOf(etNavn);

      return {
        navn: etNavn,
        score: _.reduce(dagensOvelser, function (memo, ovelse) {
          return memo + parseInt(ovelse.poeng[pos]);
        }, 0)
      };
    })
    .sortBy("score")
    .value();
};

Resultater.prototype.poengDagForDag = function() {
  var self = this,
    poengListe = {},
    navn = "";

  for (var i = 8; i <= 24; ++i) {
    var dato = new Date(2014, 2, i);
    var poengForDato = self.poengForDag(dato);

    var tmpPlassering = 0;
    var tmpPoeng = 0;
    for (var j = 0; j < poengForDato.length; ++j) {
      navn = poengForDato[j].navn;
      if (!poengListe[navn]) {
        poengListe[navn] = {
          poengTotalt: 0,
          maksPlassering: 0,
          sisteGjeldendePlassering: 0,
          verdier: [],
          chartData: {
            labels: [],
            datasets_Y1: [
              {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data: []
              }],
            datasets_Y2:[
              {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data: []
              }
            ]
          }
        };
      }


      if (tmpPoeng != poengForDato[j].score){
        tmpPlassering = j+1;
      }
      tmpPoeng = poengForDato[j].score;
      poengListe[navn].sisteGjeldendePlassering = tmpPlassering;

      poengListe[navn].poengTotalt += poengForDato[j].score;
      poengListe[navn].maksPlassering = Math.max(poengListe[navn].sisteGjeldendePlassering, poengListe[navn].maksPlassering);

      poengListe[navn].verdier[i-8] = {
        dag: i,
        poeng: poengListe[navn].poengTotalt,
        plassering: poengListe[navn].sisteGjeldendePlassering
      };

      poengListe[navn].chartData.labels.push(i);
      poengListe[navn].chartData.datasets_Y1[0].data.push(poengListe[navn].poengTotalt);
      poengListe[navn].chartData.datasets_Y2[0].data.push(poengListe[navn].sisteGjeldendePlassering);


    }
  }

  return poengListe;
}
