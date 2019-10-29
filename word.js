var Letter = require("./letter.js");

// THIS CREATES THE WORD OBJECT

function Word(answer) {
    this.objectArr = [];

    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.objectArr.push(letter);
    }

    this.display = function() {
        var answerLog = "";
        for ( var i = 0; i < this.objectArr.length; i++) {
            answerLog += this.objectArr[i] + " ";
        }
        // Line Break
        console.log(answerLog + "\n--------------------------------\n");
    }

    this.guessLetter = function(input) {
        for (var i =0 ; i < this.objectArr.length; i++) {
            this.objectArr[i].guess(input);
        }
    }


}

module.exports = Word;