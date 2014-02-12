
function DatoPaginering (dato) {
  this._dato = dato;
}

DatoPaginering.DØGN_MILLISEKUNDER = 24 * 60 * 60 * 1000;

DatoPaginering.prototype.neste = function () {
  this._dato = new Date(+this._dato + DatoPaginering.DØGN_MILLISEKUNDER);
  return this.dato();
};

DatoPaginering.prototype.forrige = function () {
  this._dato = new Date(+this._dato - DatoPaginering.DØGN_MILLISEKUNDER);
  return this.dato();
};

DatoPaginering.prototype.dato = function () {
  return new Date(this._dato);
};

DatoPaginering.prototype.datoFormatert = function () {
  return this.dato().getDate() + "/" + (this.dato().getMonth() + 1);
};
