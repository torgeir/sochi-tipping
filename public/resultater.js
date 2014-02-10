function Resultater (data) {

  var heleTabellen = _.chain(data.feed.entry)
  .map(function (o) {
    return o.content.$t;
  })
  .value();
  
  var rader        = 72;
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

    return {
      dato: dato,
      ovelse: ovelse,
      poeng: poengUtenDiff
    };
  });

  this.ovelser = _.groupBy(ovelser, "dato");
}

Resultater.prototype.poengFor = function (navn, dag) {
  var self = this,
      dagensOvelser = this.ovelser[dag];

  return _.map(dagensOvelser, function (ovelsePåDato) {
    var index = self.navn.indexOf(navn);

    return {
      ovelse: ovelsePåDato.ovelse,
      poeng: ovelsePåDato.poeng[index]
    };
  });
};
