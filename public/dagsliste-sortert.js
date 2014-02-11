function DagslisteSortert(data, dag) {
  var celler = data.feed.entry;

  function getCellRef(celle){
    var tittel = celle.title.$t;
    var kolonne = /[A-Z]/.exec([tittel])[0];
    var rad = /[0-9]/.exec([tittel])[0];
    return {'rad' :rad, 'kolonne':kolonne};
  }


  var personer[];
  for (var i = 0 ; i< celler.length; i++){
    var celle = celler[i];

    if (getCellRef(celle).kolonne > 'C', getCellRef(celle).rad == 1){
      personer.push({'navn': celle.content.$t});
    }

  }



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
