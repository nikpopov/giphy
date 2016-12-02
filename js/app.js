var app = angular.module('myapp', ['ngRoute']);

//Page Routing Configuring
app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../view/main.html',
                controller: 'mainController'
            })   
            .when('/gallery', {
                templateUrl: '../view/galery.html',
                controller: 'galleryController'
            })            
            .when('/search', {
                templateUrl: '../view/search.html',
                controller: 'galleryController'
            })
            .when('/collection', {
                templateUrl: '../view/collection.html',
                controller: 'collectionController'
            })
            .otherwise({
                redirectTo: '/'
            });  
}]);


app.service('storage', function() {
    var userStatus = {
        userID: '',
        userFirstName: '',
        userLastName: '',
        isLoggedIn: true,
        isAdmin: true,
        isForgotPass: true
    };
    this.getDefault = function() {
        return userStatus
    };
    this.getStatus = function(name) {
        return userStatus[name]
    };
    this.setStatus = function(name, value) {
        userStatus[name] = value
    }
});


app.run(['$window', '$rootScope', 'storage', function($window, $rootScope, storage) {
    
    storage.setStatus('isAdmin', false);

}]);

