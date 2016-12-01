var appServices = angular.module('myapp');

//Data Exchange Service
appServices.service('storage', function() {

    var status = {
        userID: '',
        userFirstName: '',
        userLastName: '',
        isLoggedIn: true,
        isAdmin: true,
        isForgotPass: true,
        isProfileEditOn: true,
        isMainMenuOn: true,
        isAdminMenuOn: true,
    };

    this.getDefault = function() {
        return status
    };

    this.getStatus = function(name) {
        return status[name]
    };

    this.setStatus = function(name, value) {
        status[name] = value
    }
});