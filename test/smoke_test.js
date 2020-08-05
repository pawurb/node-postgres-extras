var expect = require("chai").expect;
var PGExtras = require("./../lib/pg_extras").PGExtras

describe('test', function() {
  it('works', function(){
    console.log(PGExtras)
    expect(PGExtras.locks()).to.eq(true);
  });
});
