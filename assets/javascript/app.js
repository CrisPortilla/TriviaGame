$(document).ready(function() {
	var numberCorrect = 0;
    var numberIncorrect = 0;
    var unanswered = 0;
    var thisQuestion;
    var answered;
    var storeAnswer;
    var answerDisplay;
    var currentQuestion = 0;

 var questions = [{
      question: "When was Harry Potter born?",
      choices: ["July 31st, 1980", "July 1st, 1980", "July 30th, 1980", "July 2nd, 1980"],
      answer: 0,
  }, {
      question: "Which one was NOT one of Voldemort horcruxes?",
      choices: ["Nagini", "Harry", "Buckbeak", "Tom Riddles diary"],
      answer: 2,
  }, {
      question: "What was Dumbledore's full name?",
      choices: ["Albus Brian Wulfric Percival Dumbledore", "Albus Percival Brian Wulfric Dumbledore ", "Albus Wulfric Brian Percival Dumbledore", "Albus Percival Wulfric Brian Dumbledore"],
      answer: 3,
  }, {
      question: "What was Harry Potter's patronus?",
      choices: ["A Bull", "A Stag", "An Owl", "A Phoenix", ],
      answer: 1,
  }];


    var countdown = 40;

    var intervalId;

    function waitForIt() {
        var windowTimeout = setTimeout(function() {
            displayResults();
        }, 1000);
    }

    function runtimer() {
        intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
        countdown--;
        $("#countdown").text("Time Remaining: " + countdown);
        if (countdown === 0) {
            stopTimer();
            clearDisplay();

            $("#response").text("Time is up! The correct answer was " + answerDisplay + ".");
            unanswered++;
            console.log("Unanswered questions: " + numberIncorrect)

            currentQuestion++;
            if (currentQuestion >= questions.length) {
                waitForIt();
            } else {
                resetTimer();
                displayDiv();
            }
        }
    };


    function stopTimer() {
        clearInterval(intervalId);
    };

    function resetTimer() {
        countdown = 40;
    };


    function displayResults() {
        $("#hiddenDiv").css("display", "none");
        $("#results-panel").css("display", "block");
        $("#correct-answers").text(numberCorrect);
        $("#incorrect-answers").text(numberIncorrect);
        $("#unanswered").text(unanswered);
        $("#restart").css("display", "block");
    };

    $("#restart").click(function(event) {
        $("#restart").css("display", "none");
        $("#results-panel").css("display", "none");
        currentQuestion = 0;
        numberCorrect = 0;
        numberIncorrect = 0;
        unanswered = 0;
        $("#response").empty();
        displayDiv();
        resetTimer();
    });

    function clearDisplay() {
        $("#the-question").empty();
        $("#option-0").empty();
        $("#option-1").empty();
        $("#option-2").empty();
        $("#option-3").empty();
        $("#response").empty();
        $("#hiddenDiv").css("display", "none");
    };

    function displayDiv() {
        $("#hiddenDiv").css("display", "block");
        postQuestions()
    };

    function postQuestions() {

        thisQuestion = questions[currentQuestion].question;
        storeAnswer = questions[currentQuestion].answer;
        console.log("The storeAnswer is " + storeAnswer);
        answered = "option-" + questions[currentQuestion].answer;
        console.log("Answer is: " + answered)
        answerDisplay = questions[currentQuestion].choices[storeAnswer];
        console.log("answerDisplay: " + answerDisplay);

        $("#the-question").text(thisQuestion);

        $("#option-0").text(questions[currentQuestion].choices[0]);
        $("#option-1").text(questions[currentQuestion].choices[1]);
        $("#option-2").text(questions[currentQuestion].choices[2]);
        $("#option-3").text(questions[currentQuestion].choices[3]);
        runtimer();
    };


    $(".choice").click(function(event) {
        console.log(event.target.getAttribute("id"));

        var getId = event.target.getAttribute("id");
        if (getId == answered) {
            stopTimer();
            clearDisplay();

            $("#response").text("That's correct! The answer was " + answerDisplay + ".");
            numberCorrect++;
            console.log("numberCorrect: " + numberCorrect)
            $("#computerimg").empty();
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                waitForIt();

            } else {
                resetTimer();
                displayDiv();
            };


        } else if (getId != answered) {
            stopTimer();
            clearDisplay();

            $("#response").text("Good guess! The correct answer was " + answerDisplay + ".");
            numberIncorrect++;
            console.log("numberIncorrect: " + numberIncorrect)
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                waitForIt();
            } else {
                resetTimer();
                displayDiv();
            };
        }
    });

    function hideStart() {
        $("#startGame").css("display", "none");
    };

    $("#startGame").on("click", displayDiv);

    $("#startGame").on("click", hideStart);


});