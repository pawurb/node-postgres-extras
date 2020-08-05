var expect = require("chai").expect;
var PostgresExtras = require("../lib/postgres-extras").PostgresExtras

describe('test', function() {
  it('works', function(){
    console.log(PostgresExtras)
    expect(PostgresExtras.locks()).to.eq(true);
  });
});
