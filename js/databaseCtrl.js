
quizRApp.controller('DatabaseCtrl', function ($scope, Model) {

  $scope.isStandard = true;

  $scope.newUser = function(email, password) {
    /*console.log("inne i model. email: "+ email + " password: " +password);*/
    var message = Model.createUser(email, password);
    console.log("message: "+ message)
    if (message == "You've created a new user! Please log in to play") { 
      $scope.confirmNewUser = true;
      $scope.isStandard = false;
    }
    return message;
  };
  
  $scope.loginUser = function(email, password) {
    /*console.log("inne i model. email: "+ email + " password: " +password);*/
    Model.loginUser(email, password);

  };


  $scope.changeData = function() {
    /*console.log("inne i model. email: "+ email + " password: " +password);*/
    Model.changeData();
  };


});

