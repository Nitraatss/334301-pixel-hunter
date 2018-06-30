const ANSWERS_NUMBER = 10;
const TimeLimit = {
  FAST: 10,
  SLOW: 20
};

const fillAnswers = (answers) => {
  if (answers.length === ANSWERS_NUMBER) {
    return answers;
  } else {
    const answersCopy = answers.slice();

    let i = answersCopy.length;
    while (i < (ANSWERS_NUMBER)) {
      answersCopy.push({
        answers: false,
        time: 0
      });
      i++;
    }

    return answersCopy;
  }
};

const formStatsListMarkup = (allAnswers) => {
  const filledAnswers = fillAnswers(allAnswers);

  return filledAnswers.map((answer) => {
    if (answer.correct && answer.time < TimeLimit.FAST) {
      return `<li class="stats__result stats__result--fast"></li>`;
    } else if (answer.correct && answer.time > TimeLimit.SLOW) {
      return `<li class="stats__result stats__result--slow"></li>`;
    } else if (answer.correct) {
      return `<li class="stats__result stats__result--correct"></li>`;
    } else if (!answer.correct && !answer.time) {
      return `<li class="stats__result stats__result--unknown"></li>`;
    } else {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }
  }).join(` `);
};

export default formStatsListMarkup;
