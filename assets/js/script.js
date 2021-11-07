// declarations
let appStates = {
    begin: "state.begin",
    quiz: "state.quiz",
    scoreRecord: "state.scoreRecord",
    board: "state.board",
  };
  
  
  let score = 0;
  let counter = 0;
  let stateActive;
  let statePrior;
  let interval;
  let contentId = $("#content");
  let timerClock = $("#clock");
  let tsElement = $("#topscores");
  
  
  const quizStartTime = 100;
  
  // question array
  const questions = [
    (random1 = {
      textContent: "____________ is the tainted property of a window object.",
      options: ["Pathname", "Defaultstatus", "Host", "Protocol"],
      answer: "Defaultstatus",
    }),
    (random2 = {
      textContent:
        "To enable data tainting, the end user sets the _________ environment variable.",
      options: [
        "ENABLE_TAINT",
        "MS_ENABLE_TAINT",
        "NS_ENABLE_TAINT",
        "ENABLE_TAINT_NS",
      ],
      answer: "NS_ENABLE_TAINT",
    }),
    (random3 = {
      textContent:
        "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
      options: ["a wrapper", "a link", "a cursor", "a form"],
      answer: "a wrapper",
    }),
    (random4 = {
      textContent:
        "_________ is a wrapped Java array, accessed from within JavaScript code.",
      options: ["JavaArray", "JavaClass", "JavaObject", "JavaPackage"],
      answer: "JavaArray",
    }),
    (random5 = {
      textContent: "Why do JavaScript and Java have a similar name:",
      options: [
        "JavaScript is a stripped down version fo Java",
        "JavaScript's syntax is loosely based on Java's",
        "They both originated on the island of Java",
        "None of the above",
      ],
      answer: "JavaScript's syntax is loosely based on Java's",
    }),
    (random6 = {
      textContent:
        "When a user views a page containing a JavaScript program, which machine actually executes the script?",
      options: [
        "The User's machine running a Web browser",
        "The Web server",
        "A central machine deep within Netscape's corporate offices",
        "None of the above",
      ],
      answer: "The User's machine running a Web browser",
    }),
    (random7 = {
      textContent: "What are variables used for in JavaScript Programs?",
      options: [
        "Causing high-school algebra flashbacks",
        "varying randomly",
        "Storing numbers, dates, or other values",
        "None of the above",
      ],
      answer: "Storing numbers, dates, or other values",
    }),
    (random8 = {
      textContent:
        "Which of the following can't be done with client-side JavaScript?",
      options: [
        "Validating a form",
        "Storing the form's contents to a database file on the server",
        "Sending a form's contents by email",
        "None of the above",
      ],
      answer: "Storing the form's contents to a database file on the server",
    }),
    (random9 = {
      textContent: "How does JavaScript store dates in a date object?",
      options: [
        "The number of seconds since Netscape's public stock offering.",
        "Military time",
        "The number of days since January 1st, 1900",
        "The number of milliseconds since January 1st, 1970",
      ],
      answer: "The number of milliseconds since January 1st, 1970",
    }),
    (random10 = {
      textContent: "Inside which HTML element do we put the JavaScript?",
      options: ["script", "scripting", "head", "javascript"],
      answer: "script",
    }),
  ];
  
  
  function startTimer() {
    clearInterval(interval);
  
    interval = setInterval(function () {
      counter++;
      $(timerClock).html(`Time: ${newTime()}`);
  
      if (counter >= quizStartTime) {
        clearInterval(interval);
        if (counter > quizStartTime) counter = quizStartTime;
        createSubmitPage();
      }
    }, 1000);
  }
  
  function newTime() {
    return quizStartTime - counter;
  }
  
  // coding quiz challenge start page
  function createInitialPage() {
    stateActive = appStates.begin;
  
    $(contentId).empty();
  
    let header = $("<header><h1>Coding Quiz Challenge</h1></header>");
    let paragraph = $(
      "<p>Test your knowledge by answering the following JavaSript questions within the provided limit. You score and time will be penalized for incorrect answers.</p>"
    );
    let button = $(
      '<button id="start-quiz-btn" type="button" class="btn btn-purple">Start Quiz</button>'
    );
  
    $(contentId).append(header, paragraph, button);
  
    $("#start-quiz-btn").on("click", function () {
      createNewQuestion();
    });
  }
  
  // provide quiz questions to quizzer
  function createNewQuestion() {
  
    if (activeQuestion >= questions.length) {
      createSubmitPage();
      return;
    }
  
    statePrior = stateActive;
    stateActive = appStates.quiz;
  
    $(contentId).empty();
  
    let questionObj = questions[activeQuestion];
    let header = $(`<h1>${questionObj.textContent}</h1>`);
    let unList = $("<ul>");
  
    $(questionObj.options).each(function (index, value) {
      let btn = $(
        `<li><button type="button" class="answerChoices btn btn-purple" options="${value}">${
          index + 1
        }. ${value}</button></li>`
      );
      $(unList).append(btn);
    });
  
    $(contentId).append(header, unList);
  
    if (statePrior != appStates.quiz) startTimer();
  
    $(".answerChoices").on("click", function (event) {
      event.preventDefault();
      lastSelectedAnswer = $(this).attr("options");
      let isCorrect = lastSelectedAnswer === questionObj.answer;
  
      if (isCorrect) score += 30;
      else if (!isCorrect) {
        counter += 10;
      }
  
      activeQuestion++;
      createNewQuestion();
  
      if (isCorrect) displayMessage("Correct!");
      else displayMessage("Wrong!");
    });
  
    function displayMessage(message) {
      let newMessage = $(`<div class="fader"><h3>${message}</h3></div>`);
      $("#content").append(newMessage);
    }
  }
  
  // provide initials for topscore listing
  function createSubmitPage() {
    clearInterval(interval);
    $(timerClock).html(`Time: ${newTime()}`);
    stateActive = appStates.scoreRecord;
  
    let totalScore = score + Math.floor(newTime() * 5);
  
    $(contentId).empty();
  
    let header = $("<h1>All Done!</h1>");
    let paragraph = $(
      `<p style="text-align: left">Your final score is ${totalScore}.</p>`
    );
    let submitField = $(
      '<div class="submit-field">Enter initials: <input id="initials" type="text"> <button id="initials-submit" type="button" class="btn btn-purple">Submit</button></div>'
    );
  
    $(contentId).append(header, paragraph, submitField);
  
    $("#initials-submit").on("click", function (event) {
      event.preventDefault();
  
      stateActive = appStates.begin;
  
      let initials = $("#initials").val();
  
      if (!initials) {
        alert("You need to provide your initials!!!!");
        return;
      }
  
      let highscores = localStorage.getItem("highscores");
  
      if (!highscores) highscores = {};
      else highscores = JSON.parse(highscores);
  
      highscores[initials] = totalScore;
  
      localStorage.setItem("highscores", JSON.stringify(highscores));
  
      boardRanking();
      reload();
    });
  }
  
  // scoreboard ranking
  function boardRanking() {
    if (stateActive != appStates.board) statePrior = stateActive;
    stateActive = appStates.board;
  
      $(tsElement).empty();
      
      $(contentId).empty();
  
      $(timerClock).empty();
  
    let header = $('<h1 style="margin-top:0;">Highscores!</h1>');
  
    let playerTopScores = localStorage.getItem("highscores");
  
    $(contentId).append(header);
  
    
    // topscores listing
    if (playerTopScores) {
      let parsedHighscores = JSON.parse(playerTopScores);
  
      let sortedHighscores = sortHighscores();
  
      let orderScores = $('<ol id="topscore-list"></ol>');
  
      let counter = 1;
      $.each(sortedHighscores, function (key, value) {
        let liElement = $(
          `<li class="highscore">${counter}. ${key} - ${value}</li>`
        );
  
        liElement.addClass("lightpurple");
  
        $(orderScores).append(liElement);
        counter++;
      });
  
      $(contentId).append(orderScores);
  
      function sortHighscores() {
        items = Object.keys(parsedHighscores).map(function (key) {
          return [key, parsedHighscores[key]];
        });
        items.sort(function (first, second) {
          return second[1] - first[1];
        });
        sorted_obj = {};
        $.each(items, function (k, v) {
          use_key = v[0];
          use_value = v[1];
          sorted_obj[use_key] = use_value;
        }
        );
        return sorted_obj;
      }
    }
  
    let topScoreBtn = $(
      '<div style="text-align:center"><button id="exit-rankings" type="button" class="btn btn-purple">Go Back</button> <button id="clear-rankings" type="button" class="btn btn-purple">Clear Highscores</button></div>'
    );
  
    $(contentId).append(topScoreBtn);
  
  //   clear rankings board
    $("#clear-rankings").on("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("highscores");
      $("#topscore-list").empty();
    });
  
    // exit out of rankings board
    $("#exit-rankings").on("click", function (event) {
      event.preventDefault();
  
      switch (statePrior) {
        case appStates.begin:
          createInitialPage();
          break;
        case appStates.quiz:
          createNewQuestion();
          break;
        case appStates.scoreRecord:
          createSubmitPage();
          break;
        default:
          break;
      }
  
      $(timerClock).html(`Speed: ${newTime()}`);
      $(tsElement).html("View High Scores");
    });
  }
  
  // load quiz challenge screen
  function startUp() {
    $(timerClock).html(`Time: ${newTime()}`);
    $(tsElement).html("View High Scores");
    reload();
    createInitialPage();
  
    $(tsElement).on("click", function () {
      clearInterval(interval);
      boardRanking();
    });
  }

  startUp();

  function reload() {
    counter = 0;
    activeQuestion = 0;
  }