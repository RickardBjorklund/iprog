// Dinner controller that we use whenever we want to display detailed
// information for one dish
quizRApp.controller('SettingsCtrl', function ($scope, Model) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.isStart = false; 

  $scope.createQuizWS = function(category, difficulty) {
  	Model.createQuizWS(category, difficulty);
  	Model.clearAll();
  }
  
});

