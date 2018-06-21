import {assert} from 'chai';
import {createTestTimer} from './timer.js';

describe(`Timer tick test`, () => {

  it(`Time left`, () => {
    assert.equal(createTestTimer(40).tick(), 39);
  });


  it(`Time out`, () => {
    assert.equal(createTestTimer(1).tick(), `Ваше время вышло`);
  });
});
