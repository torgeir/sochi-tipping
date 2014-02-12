function Resultater (data) {

  var heleTabellen = _.chain(data.feed.entry)
  .map(function (o) {
    return o.content.$t;
  })
  .value();
  
  var celler       = heleTabellen.length;
  var cellerPerRad = Math.ceil(celler/72);

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
      poeng: ovelsePåDato.poeng[index]
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
