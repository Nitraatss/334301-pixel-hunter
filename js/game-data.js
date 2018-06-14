import {getRandomInt, shuffleArray} from './utils';

const GAMES_NUMBER = 10;
const GAME_ONE_INDEX = 1;
const GAME_TWO_INDEX = 2;
const GAME_THREE_INDEX = 3;

class GameServices {
  constructor() {
    this.images = {
      paintings: [
        // People
        `https://k42.kn3.net/CF42609C8.jpg`,

        // Animals
        `https://k42.kn3.net/D2F0370D6.jpg`,

        // Nature
        `https://k32.kn3.net/5C7060EC5.jpg`
      ],
      photos: [
        // People
        `http://i.imgur.com/1KegWPz.jpg`,

        // Animals
        `https://i.imgur.com/DiHM5Zb.jpg`,

        // Nature
        `http://i.imgur.com/DKR1HtB.jpg`
      ]
    };
  }

  formGameOneQuestion(data) {
    let question;

    if (getRandomInt(0, 1)) {
      question = {
        optionOne: {
          src: data.paintings[getRandomInt(0, (data.paintings.length - 1))],
          correctAnswerValue: `paint`
        },

        optionTwo: {
          src: data.photos[getRandomInt(0, (data.photos.length - 1))],
          correctAnswerValue: `photo`
        },

        type: `game-1`
      };
    } else {
      question = {
        optionOne: {
          src: data.photos[getRandomInt(0, (data.photos.length - 1))],
          correctAnswerValue: `photo`
        },

        optionTwo: {
          src: data.paintings[getRandomInt(0, (data.paintings.length - 1))],
          correctAnswerValue: `paint`
        },

        type: `game-1`
      };
    }

    return question;
  }

  formGameTwoQuestion(data) {
    let question;

    if (getRandomInt(0, 1)) {
      question = {
        src: data.paintings[getRandomInt(0, (data.paintings.length - 1))],
        correctAnswerValue: `paint`,
        type: `game-2`
      };
    } else {
      question = {
        src: data.photos[getRandomInt(0, (data.photos.length - 1))],
        correctAnswerValue: `photo`,
        type: `game-2`
      };
    }

    return question;
  }

  formGameThreeQuestion(data) {
    let photoIndex;
    let firstPhotoIndex;

    const question = {
      options: [],
      type: `game-3`
    };

    question.options.push({
      src: data.paintings[getRandomInt(0, (data.photos.length - 1))],
      alt: `paint`
    });

    for (let i = 0; i < 2; i++) {
      if (!i) {
        firstPhotoIndex = getRandomInt(0, (data.photos.length - 1));

        photoIndex = firstPhotoIndex;
      } else {
        while (photoIndex === firstPhotoIndex) {
          photoIndex = getRandomInt(0, (data.photos.length - 1));
        }
      }

      question.options.push({
        src: data.photos[photoIndex],
        alt: `photo`
      });
    }

    shuffleArray(question.options);

    return question;
  }

  formGameData() {
    let data = this.images;
    let allQuestions = [];

    for (let i = 0; i < GAMES_NUMBER; i++) {
      const gameIndex = getRandomInt(1, 3);

      if (gameIndex === GAME_ONE_INDEX) {
        allQuestions.push(this.formGameOneQuestion(data));
      }

      if (gameIndex === GAME_TWO_INDEX) {
        allQuestions.push(this.formGameTwoQuestion(data));
      }

      if (gameIndex === GAME_THREE_INDEX) {
        allQuestions.push(this.formGameThreeQuestion(data));
      }
    }

    return allQuestions;
  }
}

const gameData = new GameServices().formGameData();

export default gameData;
