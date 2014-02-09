var meny = new Ractive({
  el: $('nav'),
  template: $('template-meny').innerText,
  data: {
    apen: false
  }
});

meny.on({
  vis: function () {
    this.set('apen', !this.get('apen'));
  }
});


