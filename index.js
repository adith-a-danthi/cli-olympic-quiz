const rs = require('readline-sync');
const chalk = require('chalk');

const log = console.log

var score = 0;

var highScores = [
  {
    name: "Varun",
    score: 3
  },
  {
    name: "Jatin",
    score: 2
  }
]

var questions = [
  {
    question: "Which athlete has won the most Olympic medals?",
    options: ["Carl Lewis", "Mark Spitz", "Michael Phelps", "Usain Bolt"],
    answer: "Michael Phelps"
  },
  {
    question: "Which of these countries has not hosted the summer Olympics?",
    options: ["Finland", "Mexico", "India", "Belgium"],
    answer: "India"
  },
  {
    question: "Which city has held the modern Games three times?",
    options: ["Athens", "London", "Tokyo", "Los Angeles"],
    answer: "London"
  },
  {
    question: "Where is the Summer Olympics of 2020 being held?",
    options: ["Beijing", "London", "Tokyo", "Paris"],
    answer: "Tokyo"
  },
  {
    question: "To which Greek God were the ancient Olympic Games dedicated?",
    options: ["Athena", "Hera", "Apollo", "Zeus"],
    answer: "Zeus"
  },
  {
    question: "For which event did Abhinav Bindra win the first individual Gold medal for India?",
    options: ["50m Air Rifle", "10m Air Rifle", "10m Air Pistol"],
    answer: "10m Air Rifle"
  }
]

const questionColor = chalk.blue.inverse;
const correctColor = chalk.green.bold;
const incorrectColor = chalk.red.bold;
const scoreColor = chalk.magenta;

function welcome() {
  log(chalk.white.inverse.bold("Hello! Welcome to my Game!"));
  log(chalk.white.inverse.bold("__________________________"));

  var player = rs.question("What is your name?\n");
  log(chalk.cyan(`Hi ${player}! Welcome to Olympic Trivia?\n`));

  return player;
}

function play(question, options, answer) {
  var response = rs.keyInSelect(options, questionColor(question));

  if (options[response].toLowerCase() === answer.toLowerCase()) {
    log(correctColor("Correct"));
    score += 1;
  } else {
    log(incorrectColor("Wrong! :("));
  }

  log(scoreColor(`Current Score: ${score}`));
  log(scoreColor("__________________________\n"));
}

function game() {
  for (let currentQuestion of questions) {
    const { question, options, answer } = currentQuestion;
    play(question, options, answer);
  }
}

function showScores(currentPlayer) {
  log(scoreColor(`You scored: ${score}`));
  for (let i=0; i<highScores.length; i++) {
    if(score >= highScores[i].score) {
      log(scoreColor.inverse(`Awesome ${currentPlayer}! You're number ${i+1} on the leaderboard!`));
      log(chalk.cyan("Ping me with a screenshot and I'll update the leaderboard!"))
      break;
    }
  }

  log(scoreColor.inverse("Check Out the leaderboard!"));
  highScores.map((item) => log(scoreColor(`${item.name} : ${item.score}`)));
}

const currentPlayer = welcome();
game();
showScores(currentPlayer);