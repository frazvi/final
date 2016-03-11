angular.module('livkonApp', ['ngRoute']);

// tell module you're routing using ngRoute, then define the routes
angular.module('livkonApp')
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : '/html/home.html',
				controller: 'homeController'
			})

			.when('/login', {
				templateUrl : '/html/login.html',
				controller  : 'loginController'
			})

			.when('/konnect', {
				templateUrl : '/html/konnect.html',
				controller  : 'konnectController'
			})

			.when('/speakerServices', {
				templateUrl : '/html/speakerServices.html',
				controller  : 'speakerServicesController'
			})

			.when('/findSpeaker', {
				templateUrl : '/html/findSpeaker.html',
				controller  : 'findSpeakerController'
			})

			.when('/signUpSpeaker', {
				templateUrl : '/html/signUpSpeaker.html',
				controller  : 'signUpSpeakerController'
			})

			.when('/about', {
				templateUrl : '/html/about.html',
				controller  : 'aboutController'
			})

			.when('/contact', {
				templateUrl : '/html/contact.html',
				controller  : 'contactController'
			})

			.when('/news', {
				templateUrl : '/html/news.html',
				controller  : 'newsController'
			})

			.when('/fakeFactConnect', {
				templateUrl : '/html/fakeFactConnect.html',
				controller  : 'fakeFactConnectController'
			})
	})




angular.module('livkonApp')
	.controller('homeController', ['$scope', '$http', '$window', function($scope, $http, $window) {
		$scope.signupForm = {}
		$scope.loginForm={}
		$scope.signup= function() {
			console.log($scope.signupForm)
			$http({
				method: 'POST',
				url : '/signup',
				data: $scope.signupForm
			}) .then(function (returnData) {
				console.log('hello', returnData);
				// $rootScope.user = returnData.data.user 
				if (returnData.data.success) {$window.location.href='/'}
				else {console.log(returnData)}
			})
		}

			$scope.login = function () {
				$http ({
					method : 'POST',
					url : '/login',
					data : $scope.loginForm
				}) .then (function(returnData) {
					console.log('hello', returnData);
					if (returnData.data.success) {$window.location.href="/"}
					else { console.log(returnData)}
				})
			}

			$http ({
				method: 'GET',
				url : '/api/me',
			}) .then(function(returnData) {
				console.log(returnData)
				if (returnData.data.user) {
					$scope.user= returnData.data.user
				}
			})
	}]) 

angular.module('livkonApp')
	.controller('loginController', ['$scope', loginController]) 

angular.module('livkonApp')
	.controller('konnectController', ['$scope', konnectController]) 

angular.module('livkonApp')
	.controller('speakerServicesController', ['$scope', speakerServicesController]) 

angular.module('livkonApp')
	.controller('findSpeakerController', ['$scope', findSpeakerController]) 

angular.module('livkonApp')
	.controller('signUpSpeakerController', ['$scope', signUpSpeakerController]) 

angular.module('livkonApp')
	.controller('aboutController', ['$scope', aboutController]) 

angular.module('livkonApp')
	.controller('contactController', ['$scope', contactController]) 

angular.module('livkonApp')
	.controller('newsController', ['$scope', newsController]) 

angular.module('livkonApp')
	.controller('fakeFactConnectController', ['$scope', fakeFactConnectController]) 


function homeController ($scope) {
	console.log('home Controller!')
}

function loginController ($scope) {
	console.log('login Controller!')
}
function konnectController ($scope) {
	console.log('konnect Controller!')
}

function speakerServicesController ($scope) {
	console.log('speaker Services Controller!')
}

function findSpeakerController ($scope) {
	console.log('find Speaker Controller!')
}

function signUpSpeakerController ($scope) {
	console.log('sign Up Speaker Controller!')
}

function aboutController ($scope) {
	console.log('about Controller!')
}
function contactController ($scope) {
	console.log('contact Controller!')
}

function newsController ($scope) {
	console.log('news Controller!')
}

function fakeFactConnectController ($scope) {
	console.log('fake Fact Connect Controller!')
}









