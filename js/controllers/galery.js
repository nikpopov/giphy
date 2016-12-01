angular.module('myapp').controller('galleryController', GalleryController);
GalleryController.$inject = ['$scope', '$http', '$window', '$timeout'];

function GalleryController($scope, $http, $window, $timeout) {
	console.log('Gallery Controller');

	$scope.data = {};
	$scope.data.isDeleted = false;
	$scope.data.popup = false;
	$scope.data.img = "";
	$scope.data.addShadow = 'off';
	$scope.data.fit = '';
	
	$http({
		method: 'GET',
		url: 'http://api.giphy.com/v1/gifs/search',
		params: {
			api_key: 'dc6zaTOxFJmzC',
			q: 'any'
		}
	}).then(function(response) {
//		console.log(response.data);
		$scope.images = response.data.data;
	});

	$scope.search = function(query) {
		console.log(query);
		$scope.query = query;
		$http({
			method: 'GET',
			url: 'http://api.giphy.com/v1/gifs/search',
			params: {
				api_key: 'dc6zaTOxFJmzC',
				q: query
			}
		}).then(function(response) {
			console.log(response.data);
			$scope.images = response.data.data;
		})
	};

	$scope.viewBig = function(id) {
		$scope.data.popup = true;
		$http({
			method: 'GET',
			url: 'http://api.giphy.com/v1/gifs/' + id,
			params: {
				api_key: 'dc6zaTOxFJmzC'
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

	$scope.markOn = function(e) {
		$scope.data.img = e.target.src;
		var str = $scope.data.img.split('/');
		$scope.data.id = str[str.length-2];
		console.log($scope.data.id);
	};

	$scope.markOff = function() {
		if($scope.data.img) {
			$scope.data.img = "";
			$scope.data.id = ""
		};
//		console.log("Data removed");
	};

	$scope.shadowOn = function(index) {
		$scope.data.addShadow = '';
		$scope.data.fit = index;
	};

	$scope.shadowOff = function(index) {
		$scope.data.addShadow = 'off';
		$scope.data.fit = '';
	};

	$scope.switchData = function(item, index) {
		if ($window.localStorage.getItem('collection') === null) {
			$scope.collection = []
		} else {
			$scope.collection = $window.localStorage.getItem('collection').split(',');
			$window.localStorage.removeItem('collection');
		};
		if($scope.collection.includes(item.id)) {
			if($scope.images[index].picked === false) {
				var index = $scope.collection.indexOf(item.id);
				$scope.collection.splice(index, 1)
			}
		} else {
			$scope.collection = $scope.collection.concat(item.id)
		};
//		console.log($scope.collection);
//		console.log($scope.collection.length);
		if($scope.collection.length) {
			$window.localStorage.setItem('collection', $scope.collection)
		}
	};

//	$scope.$on('$routeChangeSuccess', function (event, current, previous) {
//		console.log(current);
//        if(current.loadedTemplateUrl === '../view/search.html') {
//            $scope.data.isSearch = true;
//        } else {
//        	$scope.data.isSearch = false;
//        };
//    });

	$scope.$on('saveInCollection', function(event) {
		console.log('Event received');
		if($scope.img) {
			console.log($scope.data.img);
			if(!$window.localStorage.getItem('collection')) {
				$scope.collection = []
			} else {
				$scope.collection = $window.localStorage.getItem('collection').split(',');
			};
			if(!$scope.collection.includes($scope.data.id)) {
				$window.localStorage.removeItem('collection');
				$scope.collection = $scope.collection.concat($scope.data.id);
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
