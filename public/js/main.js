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

			.when('/videoChat', {
				templateUrl : '/html/videoChat.html',
				controller 	: 'videoChatController'
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
				if (returnData.data.success) {$scope.user=servRes.data}
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

			$http.get('/me')
				.then(function(servRes) {
					if ('.servRes.data') {

					}
					else {
						$scope.user=servRes.data
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


angular.module('livkonApp')
	.controller('videoChatController', ['$scope', videoChatController])
function videoChatController ($scope) {
	var apiKey = 45525522;
	var sessionId = '1_MX40NTUyNTUyMn5-MTQ1NzY2NTAyNDU5MH5JTDR0VmlMUUwzT0xvdmNxQVE4eGZhSC9-UH4';
	var session = OT.initSession(apiKey, sessionId);
		session.on({
	  streamCreated: function(event) { 
	    session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'}); 
	  }
	});

	<!-- Generating a token -->
	var token = 'T1==cGFydG5lcl9pZD00NTUyNTUyMiZzaWc9MWJmMDVkMWQ4NTEyNGNmZTgyYmFkMzkwZjFhYTEwYWMxZmJiOGIxZjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXlOVFV5TW41LU1UUTFOelkyTlRBeU5EVTVNSDVKVERSMFZtbE1VVXd6VDB4dmRtTnhRVkU0ZUdaaFNDOS1VSDQmY3JlYXRlX3RpbWU9MTQ1NzcxNzg1MSZub25jZT0wLjIxNjMwMjU0OTY4MDAzMzM3JmV4cGlyZV90aW1lPTE0NTc4MDQyNTE=';
	session.connect(token, function(error) {
	  if (error) {
	    console.log(error.message);
	  } else {
	    session.publish('myPublisherDiv', {width: 320, height: 240});
	  }
	});
}

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









