'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.interceptors.push('Intercept')
	$urlRouterProvider.otherwise('/');
	$urlRouterProvider.when('/auth/:provider', function () {
		window.location.reload();
	});
});

app.run(function (Auth) {
	Auth.refreshMe();
});