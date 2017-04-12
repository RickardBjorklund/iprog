// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
quizRApp.controller('SideCtrl', function ($scope,Model) {


	$scope.correctPercentage = function() { 
		return Model.getNumberOfCorrectAnswers();
	}

	$scope.incorrectPercentage = function() {
		if (Model.getNumberOfCorrectAnswers() == 0 && Model.getNumberOfIncorrectAnswers() == 0) {
			return Model.getNumberOfIncorrectAnswers();
		}
		else {
			return (100 - Model.getNumberOfCorrectAnswers());
		}
	}

	$scope.progressPercentage = function() {
		return Model.getProgress();
	}
	

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});
