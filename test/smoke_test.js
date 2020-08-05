var expect = require("chai").expect;
var PGExtras = require("./../lib/pg_extras").PGExtras

describe('test', function() {
  it('works', function(){
    expect(PGExtras.dupa).to.eq(true);
  });
});
