var Word = require("./word.js");
var inquirer = require("inquirer");

// THIS CONTAINS THE LOGIC FOR THE GAME

var alphabet = "abcdefghijklmnopqrstuvwxyz";

var romComs = [
    "crazy rich asians",
    "somethings gotta give",
    "the wedding singer",
    "the proposal",
    "500 days of summer",
    "crazy stupid love",
    "forgetting sarah marshall",
    "my best friends wedding",
    "bridget jones diary",
    "10 things i hate about you",
    "the big sick",
    "pretty woman",
    "sabrina",
    "the holiday",
    "its complicated",
    "notting hill",
    "four weddings and a funeral",
    "sleepless in seattle",
    "pretty in pink",
    "sixteen candles",
    "roman holiday",
    "the princess bride",
    "annie hall",
    "groundhog day",
    "bull durham",
    "say anything",
    "moonstruck",
    "clueless",
    "broadcast news",
    "youve got mail",
    "when harry met sally"
];

var randomNum = Math.floor(Math.random() * romComs.length);
var randomMovie = romComs[randomNum];

var computerWord = new Word(randomMovie);

var requireNewWord = false;

var wrongLetters = [];
var correctLetters = [];

var guessesLeft = 12;

function gamePlay() {
    if (requireNewWord) {
        var randomNum = Math.floor(Math.random() * romComs.length);
        var randomMovie = romComs[randomNum];

        computerWord = new Word(randomMovie);

        requireNewWord = false;
    }

    var guessedWord = [];
    computerWord.objectArr.forEach(completeCheck);

    if (guessedWord.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter a letter from A to Z",
                name: "userinput"
            }
        ]).then(function (input) {
            if (!alphabet.includes(input.userinput) || input.userinput.length > 1) {
                console.log("\nTry Again\n");
                gamePlay();
            } else {
                if (
                    wrongLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === ""
                ) {
                    console.log("\nLetter was already guessed\n");
                    gamePlay();
                } else {
                    var wordCheckArray = [];
                    computerWord.guessLetter(input.userinput);
                    
                    computerWord.objectArr.forEach(wordCheck);
                    if (wordCheckArray.join("") === guessedWord.join("")) {
                        console.log("\nIncorrect\n");
                        wrongLetters.push(input.userinput);
                        guessesLeft--;
                    } else {
                        console.log("\nIncorrect\n");
                        correctLetters.push(input.userinput);
                        guessesLeft--;
                    }
                    computerWord.display();

                    console.log("Guesses Left: " + guessesLeft + "\n");

                    console.log("Letters Guessed: " + wrongLetters.join(" ") + "\n");

                    if (guessesLeft > 0) {
                        gamePlay();
                    } else {
                        console.log("\n You lost! \n");
                    }
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }

                }
            }

        });
    } else {
        console.log("\nYou Win!\n");
    }
    function completeCheck(key) {
        guessedWord.push(key.guessed);

    }
}

function resartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to: ",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ]).then(function (input) {
        if (input.restart === "Play Again") {
            requireNewWord = true;
            var wrongLetters = [];
            var correctLetters = [];
            var guessesLeft = 12;
            gamePlay();
        } else {
            return;
        }
    });
}

gamePlay();