// Dinner controller that we use whenever we want to display detailed
// information for one dish
quizRApp.controller('QuickplayCtrl', function ($scope, Model) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.isStart = true; 


  $scope.createQuiz = function() {
  	Model.createQuiz();
  	$scope.status = "Done";
  	console.log("created");
    $scope.isStart = true;
  }

  $scope.viewQuestion = function() {
    $scope.quizLength = Model.getProgress(); 
    $scope.isGame = true;
    $scope.isStart = false;
    $scope.isNext = false;
    $scope.confirm = "";
  	$scope.checkedAnswer = "";
  	$scope.question = Model.getQuestion(); 
    if ($scope.quizLength == 90) { 
      $scope.isEnded = true;
    }
  	$scope.alternatives = Model.createAlternatives($scope.question);
    if ($scope.question == "Quiz ended") {
      $scope.isError = true;
      $scope.isGame = false;
    }
  }

  $scope.check = function(alt) {
    $scope.green = false;
    $scope.red = false;
  	$scope.checkedAnswer = Model.checkAnswer($scope.question, alt);
    if ($scope.checkedAnswer) {
      //$scope.alternatives = [];
      $scope.confirm = "Wrong!"; 
      $scope.confirmStyle = "fancyRed";
      $scope.isNext = true;
      $scope.selectedRow = alt;
      $scope.red = true;
      
    }
    else {
      //$scope.alternatives = []; 
      $scope.confirm = "Correct!";
      $scope.confirmStyle = "fancy";
      $scope.isNext = true;
      $scope.selectedRow = alt;
      $scope.green = true;
    }
    /*
    for (var i = 0; i < $scope.alternatives.length; i++) {
      var selectedRow = null;
      if ($scope.alternatives[i] == alt) {
        $scope.selectedRow = alt;
        console.log(selectedRow)
        console.log (alt)
        console.log("inside if")
      }
    }*/
  }

  $scope.setCat = function() {
    var cat = Model.getCat();
    if (cat == undefined) {
      cat = 9;
    }
    return cat;
  }
  
  
  $scope.changeData = function() {
    /*console.log("inne i model. email: "+ email + " password: " +password);*/
    Model.changeData();
  };
  
  
});






