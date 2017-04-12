// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
quizRApp.factory('Model',function ($resource) {
  
  var quiz = []; 
  var correctAnswers = 0; 
  var incorrectAnswers = 0; 
  var answers = [];
  var answeredQuestions = [];
  var categorySelected = "";

  this.clearAll = function() {
    quiz = []; 
    correctAnswers = 0; 
    incorrectAnswers = 0; 
    answers = [];
    answeredQuestions = []; 
  }


  this.createUser = function(email, password) {
    var returnMessage = "";
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      returnMessage = error.message
      console.log(error.code);
      console.log(error.message);
    });

    this.logoutUser();
    returnMessage = "You've created a new user! Please log in to play";
    return returnMessage
  }

  this.loginUser = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
    console.log("logged in")
    return;
  }

  this.logoutUser = function() {
      firebase.auth().signOut().then(function() {
        console.log("Logged out!")
      }, function(error) {
       console.log(error.code);
       console.log(error.message);
    });
  }

  this.changeData = function(answer) {
    var ref = firebase.database().ref("users");

    /* Get data */
    var userId = firebase.auth().currentUser.uid;

    if (answer == "right") {
      var getRight = ref.child(userId).child('right');
      getRight.transaction(function(right) {
   		console.log("right" + right)
        return right + 1 ;
      });
    }

    if (answer == "wrong") {
      var getWrong = ref.child(userId).child('wrong');
      getWrong.transaction(function(wrong) {
      	console.log("wrong" + wrong)
        return wrong + 1 ;
      });
    }
    console.log("end of changeData")
  }

   this.getData = function(answer) {
    var ref = firebase.database().ref("users");
    /* Get data */
    var userId = firebase.auth().currentUser.uid;
	var getRight = ref.child(userId).child('right');
    	getRight.transaction(function(right) {
   		console.log("right" + right)
        getRight = right; });
    var getWrong = ref.child(userId).child('wrong');
        getWrong.transaction(function(wrong) {
   		console.log("wrong" + wrong)
        getWrong = wrong ; });
    console.log("inne i hej"+ userId.right)
    return [getRight, getWrong]
  }

  this.updateStats = function(emailIn, rightIn, wrongIn) {
    var email = firebase.database().ref("players/emailIn");

    email.update({
       "right": rightIn,
       "wrong": wrongIn
    });
  }

  this.getCat = function() {
    return categorySelected;
  }

  this.getQuiz = $resource('https://opentdb.com/api.php?amount=10',{},{
    get: {}
  });

  this.createQuiz = function() {
    quiz = [];
    this.getQuiz.get( {}, function(data) {
      quiz.push(data.results);
      })
  }

  this.createQuizWS = function(category, difficulty) {
    quiz = [];
    categorySelected = category;
    this.getQuiz.get( {category:category,difficulty:difficulty}, function(data) {
      quiz.push(data.results);
      })
  }

  this.getQuestion = function() {
    if (quiz[0].length > 0 ) {
      var question = quiz[0].shift(); 
      answeredQuestions.push(question.question);
      return question 
    }
    else {
      console.log("Quiz ended")
      return ["Quiz ended"]
    }
  }

  this.createAlternatives = function(question) {
    if (question[0] == "Quiz ended") {
      return
    }
    else {
		var alternatives = [];
		alternatives.push(question.correct_answer);
		for (var i = 0; i < question.incorrect_answers.length; i++) {
		alternatives.push(question.incorrect_answers[i])
		}
		return alternatives.sort();
    }
  }
  
  this.checkAnswer= function(question, answer) {
    if (answer == question.correct_answer) {
      correctAnswers += 1;
      answers.push('Right answer');
      this.changeData("right");
      return false
    }
    else {
      incorrectAnswers += 1;
      answers.push('Wrong answer');
      this.changeData("wrong");
      return true
    }
  }

  this.getAnswers = function() {
    return answers
  }

  this.getAnsweredQuestions = function() {
  	return answeredQuestions
  }

  this.getNumberOfCorrectAnswers = function() {
    var sum = correctAnswers+incorrectAnswers
    if (sum == 0) {
      return 0
    }
    else {
      return Math.floor((correctAnswers/(correctAnswers+incorrectAnswers))*100)
    }
  }

  this.getNumberOfIncorrectAnswers = function() {
    var sum = correctAnswers+incorrectAnswers
    if (sum == 0) {
      return 0
    }
    return Math.floor((incorrectAnswers/(correctAnswers+incorrectAnswers))*100)
  }

  this.getProgress = function() {
    
    return Math.floor(((correctAnswers+incorrectAnswers))*10)
  }

  return this;

});
