const MINIMUM_LIVES = 0;
const MINIMUM_CORRECT_ANSWERS_NUMBER = 10;
const NORMAL_ANSWER_SCORE = 100;
const SLOW_ANSWER_SCORE = 50;
const FAST_ANSWER_SCORE = 150;
const BONUS_SCORE = 50;
const LOOSER_SCORE = -1;
const FAST_TIME = 10;
const SLOW_TIME = 20;

export const formTestGameState = (normalAnswersNumber, fastAnswersNumber, slowAnswersNumber, incorrectAnswersNumber, livesNumber) => {
  let currentGameState = {
    answers: [],
    lives: livesNumber
  };

  const incorrectAnswerTemplate = {
    correct: false,
    time: 10
  };

  const normalAnswerTemplate = {
    correct: true,
    time: 15
  };

  const fastAnswerTemplate = {
    correct: true,
    time: 8
  };

  const slowAnswerTemplate = {
    correct: true,
    time: 21
  };

  if (livesNumber === MINIMUM_LIVES) {
    for (let i = 0; i < incorrectAnswersNumber; i++) {
      currentGameState.answers.push(incorrectAnswerTemplate);
    }
  } else {
    for (let i = 0; i < incorrectAnswersNumber; i++) {
      currentGameState.answers.push(incorrectAnswerTemplate);
    }

    for (let i = 0; i < slowAnswersNumber; i++) {
      currentGameState.answers.push(slowAnswerTemplate);
    }

    for (let i = 0; i < fastAnswersNumber; i++) {
      currentGameState.answers.push(fastAnswerTemplate);
    }

    for (let i = 0; i < normalAnswersNumber; i++) {
      currentGameState.answers.push(normalAnswerTemplate);
    }
  }

  return currentGameState;
};

const calculateScore = (answers, lives) => {
  let result = 0;

  answers.forEach((answer) => {
    if (answer.correct && answer.time < FAST_TIME) {
      result = result + FAST_ANSWER_SCORE;
    } else if (answer.correct && answer.time > SLOW_TIME) {
      result = result + SLOW_ANSWER_SCORE;
    } else if (answer.correct) {
      result = result + NORMAL_ANSWER_SCORE;
    }
  });

  result = result + lives * BONUS_SCORE;

  return result;
};

const calcultateCorrectAnswersNumber = (answers) => {
  let correctAnswersNumber = 0;

  answers.forEach((answer) => {
    if (answer.correct) {
      correctAnswersNumber = correctAnswersNumber + 1;
    }
  });

  return correctAnswersNumber;
};

export const showResults = (answers, lives) => {
  const correctAnswersNumber = calcultateCorrectAnswersNumber(answers);

  let finalResult;

  if (lives > MINIMUM_LIVES && correctAnswersNumber === MINIMUM_CORRECT_ANSWERS_NUMBER) {
    finalResult = calculateScore(answers, lives);
  } else {
    finalResult = LOOSER_SCORE;
  }

  return finalResult;
};
