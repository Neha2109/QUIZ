var questions = [{
    question: "What is the national flower of India?",
    choices: ["lotus", "rose", "sunflower", "jasmine"],
    correctAnswer: 0
}, {
    question: "What is the national animal of India",
    choices: ["tiger", "lion", "goat", "giraffe"],
    correctAnswer: 0
}, {
    question: "What is the young of Bufallo called ?",
    choices: ["calf", "baby", "pup","cow"],
    correctAnswer: 0
}, {
    question: "Who among the following is the supreme commander of the Armed forces of India ?",
    choices: ["president", "vice-president", "prime minister", "minister of defence"],
    correctAnswer: 0
}, {
    question: "The back part of the moon is always calm and dark which is called ?",
    choices: ["Sea of tranquillity", "Ocean of storms", "Non of these", "both of these"],
    correctAnswer: 1
}, {
    question: "Which is known as the king of fruit?",
    choices: ["banana", "apple", "mango", "grapes"],
    correctAnswer: 2	
	
}, {
    question: "What is a baby Hawk called?",
    choices: ["hawklett", "pup", "larva", "eyas"],
    correctAnswer: 3	
}, {
    question: "Which is the largest state in India ?",
    choices: ["rajasthan", "maharashtra", "gujarat", "madhya pradesh"],
    correctAnswer: 0
}, {
    question: "What is a baby Kangaroo called?",
    choices: ["kinga", "joey", "calf", "baby"],
    correctAnswer: 1

}, {
    question: "Which state is known as dev bhumi?",
    choices: ["nagaland", "goa", "uttrakhand", "himachal pradesh"],
    correctAnswer: 3

}, {
    question: "What is a baby Monkey called?",
    choices: ["infant", "baby", "calf", "pup"],
    correctAnswer: 0

	}, {
    question: "What is a baby Bear Called?",
    choices: ["cub", "baby balu", "young bear", "bearlet"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}