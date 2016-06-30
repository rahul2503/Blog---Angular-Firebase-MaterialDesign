var app = angular.module('blogApp',['ngRoute','ngMaterial','ngMessages','ui.router']);

var config = {
    apiKey: "AIzaSyAhahD30VRvulhrYqyp6U08-9zNYV_0RzQ",
    authDomain: "blog-365fa.firebaseapp.com",
    databaseURL: "https://blog-365fa.firebaseio.com",
    storageBucket: "blog-365fa.appspot.com",
  };
firebase.initializeApp(config);
var database = firebase.database();

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	// $routeProvider.
	// when('/createBlog', {
	// 	templateUrl: 'createBlog.html',
	// 	controller: 'createBlogController'
	// }).
	// when('/home', {
	// 	templateUrl: 'home.html',
	// 	controller: 'homeController'
	// }).
	// when('/viewBlog', {
	// 	templateUrl: 'viewBlog.html',
	// 	controller: 'viewBlogController'
	// }).
	// otherwise ({
	// 	redirectTo: '/home'
	// });
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('createBlog', {
			url: "/createBlog",
			templateUrl: 'createBlog.html',
			controller: 'createBlogController'
		}).
		state('home', {
			url: "/home",
			templateUrl: 'home.html',
			controller: 'homeController'
		}).
		state('viewBlog', {
			url: "/viewBlog/{blogId}",
			templateUrl: 'viewBlog.html',
			controller: 'viewBlogController'
		})
}]);

app.config(function ($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('pink')
    .warnPalette('deep-orange')
    .backgroundPalette('blue-grey');
});