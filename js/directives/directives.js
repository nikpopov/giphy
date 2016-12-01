var appDirectives = angular.module('myapp');

//Data File Getting Directive from Input Field
appDirectives.directive('getFile', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.getFile);
            element.bind('change', onChangeFunc)
        }
    }
});
