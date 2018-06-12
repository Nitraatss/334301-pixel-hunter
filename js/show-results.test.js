import {assert} from 'chai';
import {formTestGameState, showResults} from './show-results';

describe(`Show results test`, () => {
  let currentGame;

  it(`Out of lives`, () => {
    currentGame = formTestGameState(4, 5, 0, 1, 0);

    assert.equal(showResults(currentGame.answers, currentGame.lives), `-1`);
  });

  it(`All normal answers`, () => {
    currentGame = formTestGameState(10, 0, 0, 0, 3);

    assert.equal(showResults(currentGame.answers, currentGame.lives), `1150`);
  });

  it(`All fast answers`, () => {
    currentGame = formTestGameState(0, 10, 0, 0, 3);

    assert.equal(showResults(currentGame.answers, currentGame.lives), `1650`);
  });

  it(`All slow answers`, () => {
    currentGame = formTestGameState(0, 0, 10, 0, 3);

    assert.equal(showResults(currentGame.answers, currentGame.lives), `650`);
  });

  it(`Mixed answers`, () => {
    currentGame = formTestGameState(5, 4, 1, 0, 3);

    assert.equal(showResults(currentGame.answers, currentGame.lives), `1300`);
  });

  it(`Not all answers correct`, () => {
    currentGame = formTestGameState(5, 3, 1, -1, 2);

    assert.equal(showResults(currentGame.answers, currentGame.lives), `-1`);
  });
});


