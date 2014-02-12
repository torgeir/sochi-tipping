function TopplisteSortert (data) {
  var celler = data.feed.entry;


  var flateSvar = _.chain(celler)
    .map(function (celle) {
      return celle.content.$t;
    })
    .filter(function (celle) {
      return celle != "";
    })
    .value();

  var svarGruppert = [];
  while (flateSvar.length) {
    svarGruppert.push(_.first(flateSvar, 2));
    flateSvar = _.drop(flateSvar, 2);
  }

  var svar =  _.chain(svarGruppert)
    .map(function (svar) {
      return { navn: svar[0], score: svar[1] };
    })
    .groupBy("score")
    .sortBy("score");

  this.pallen = svar
    .first(3)
    .value();

  this.resten = svar
    .rest(3)
    .flatten()
    .value();
}
