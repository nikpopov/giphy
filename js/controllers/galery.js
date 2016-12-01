angular.module('myapp').controller('galleryController', GalleryController);
GalleryController.$inject = ['$scope', '$http', '$window', '$timeout'];

function GalleryController($scope, $http, $window, $timeout) {
	console.log('Gallery Controller');

	$scope.images = [];
	$scope.isSearch = false;
	$scope.isDeleted = false;
	$scope.popup = false;
	$scope.img = "";
	
	$http({
		method: 'GET',
		url: 'http://api.giphy.com/v1/gifs/search',
		params: {
			api_key: 'dc6zaTOxFJmzC',
			q: 'any'
		}
	}).then(function(response) {
		console.log(response.data);
		$scope.images = response.data.data;
	});

	$scope.viewBig = function(id) {
		$scope.popup = true;
		$http({
			method: 'GET',
			url: 'http://api.giphy.com/v1/gifs/' + id,
			params: {
				api_key: 'dc6zaTOxFJmzC',
			}
		}).then(function(response) {
			console.log(response.data.data.images.original.url);
			$timeout(function() {
				$scope.tmpUrl = response.data.data.images.original.url;
			}, 50)
		})
	};

	$scope.close = function() {
		$scope.tmpUrl = "";
		$scope.popup = false;
	};

	$scope.markOn = function(e) {
		$scope.img = e.target.src;
		var str = $scope.img.split('/');
		$scope.id = str[str.length-2]
	};

	$scope.markOff = function(e) {
		if($scope.img) {
			$scope.img = "";
			$scope.id = ""
		}
	};

	$scope.$on('saveInCollection', function(event) {
		console.log('Event received');
		if($scope.img) {
			console.log($scope.img);
			if(!$window.localStorage.getItem('collection')) {
				$scope.collection = []
			} else {
				$scope.collection = $window.localStorage.getItem('collection').split(',');
			};
			if(!$scope.collection.includes($scope.id)) {
				$window.localStorage.removeItem('collection');
				$scope.collection = $scope.collection.concat($scope.id);
				$window.localStorage.setItem('collection', $scope.collection);
			}
		}
	});

	$window.onscroll = function() {
		var scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
		if (document.documentElement.clientHeight + $window.pageYOffset === scrollHeight) {
			console.log('Next page!');
			$http({
				method: 'GET',
				url: 'http://api.giphy.com/v1/gifs/search',
				params: {
					api_key: 'dc6zaTOxFJmzC',
					q: 'any',
					offset: $scope.images.length
				}
			}).then(function(response) {
				console.log(response.data);
				$timeout(function() {
					$scope.images = $scope.images.concat(response.data.data);
				}, 50)
			})
		}
	};
};
