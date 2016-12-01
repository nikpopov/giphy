angular.module('myapp').controller('collectionController', CollectionController);
CollectionController.$inject = ['$scope', '$window', '$http', '$timeout', 'storage'];

function CollectionController($scope, $window, $http, $timeout, storage) {
	console.log('Collection Controller');

	$scope.images = [];
	$scope.data = {};
	$scope.data.isSearch = false;
	$scope.data.isDeleted = true;
	$scope.data.popup = false;
	$scope.data.img = "";

	if(!$window.localStorage.getItem('collection')) {
		$scope.collection = []
	} else {
		$scope.collection = $window.localStorage.getItem('collection').split(',');
	};

	$http({
		method: 'GET',
		url: 'http://api.giphy.com/v1/gifs',
		params: {
			api_key: 'dc6zaTOxFJmzC',
			ids: $scope.collection.toString()
		}
	}).then(function(response) {
		$scope.images = response.data.data;
	});

	$scope.delete = function(index) {
		var link = $scope.images[index].url;
		var arr = link.split('/');
		var id = arr.pop();
		console.log(id);
		if($scope.collection.includes(id)) {
			var index = $scope.collection.indexOf(id);
			$scope.collection.splice(index, 1);
			$window.localStorage.removeItem('collection');
			if ($scope.collection.length) {
				$window.localStorage.setItem('collection', $scope.collection);
			}
		};
		$scope.images.splice(index, 1);
	};

	$scope.viewBig = function(id) {
		$scope.data.popup = true;
		$http({
			method: 'GET',
			url: 'http://api.giphy.com/v1/gifs/' + id,
			params: {
				api_key: 'dc6zaTOxFJmzC',
			}
		}).then(function(response) {
			console.log(response.data.data.images.original.url);
			$timeout(function() {
				$scope.data.tmpUrl = response.data.data.images.original.url;
			}, 50)
		})
	};

	$scope.close = function() {
		$scope.data.tmpUrl = "";
		$scope.data.popup = false;
	};
};
