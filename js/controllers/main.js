angular.module('myapp').controller('mainController', MainController);
MainController.$inject = ['$scope', '$rootScope', 'storage'];

function MainController($scope, $rootScope, storage) {
	console.log('Main Controller');
	$scope.userStatus = storage.getDefault();

	$scope.catchCode = function(e) {
		console.log(e.keyCode);
		if(e.keyCode === 107) {
			$rootScope.$broadcast('saveInCollection')
		}
	};
};
