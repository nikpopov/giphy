var app = angular.module('myapp');

function response(response) {
     if(response.$$state.status === 0) return response; // success
};

app.factory('Giphy', function($http) {

	var host = 'http://api/giphy.com';
	var key = 'dc6zaTOxFJmzC';

	return {
		get: function(query) {
			return response($http({
				method: 'GET',
				url: host + '/v1/gifs/search',
				params: {
					api_key: key,
					q: query
				},
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': "'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'",
					'Access-Control-Allow-Headers': 'Content-Type, Accept, x-requested-with, cache-control',
					'Access-Control-Allow-Credentials': true
				}
			}))
		},
		trending: function(data) {
			return response($http({
				method: 'GET',
				url: host + '/v1/gifs/trending',
				params: {
					api_key: key,
					data: data
				}
			}))
		},
		translate: function(data) {
			return response($http({
				method: 'GET',
				url: host + '/v1/gifs/translate',
				params: {
					api_key: key,
					data: data
				}
			}))
		},
		random: function(data) {
			return response($http({
				method: 'GET',
				url: host + '/v1/gifs/random',
				params: {
					api_key: key,
					data: data
				}
			}))
		},
		getGifById: function(id) {
			return response($http({
				method: 'GET',
				url: host + '/v1/gifs/' + id,
			}))
		},
		getGifByIds: function(list) {
			return response($http({
				method: 'GET',
				url: host + '/v1/gifs/',
				params: list
			}))
		},
		upload: function(data) {
			return response($http({
				method: 'POST',
				url: host + '/v1/gifs/',
				params: data
			}))
		},
	}
});


