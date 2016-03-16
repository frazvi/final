angular.module('livkonApp', ['ngRoute']);

// tell module you're routing using ngRoute, then define the routes
angular.module('livkonApp')
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : '/html/home.html',
				controller: 'homeController'
			})

			.when('/signup', {
				templateUrl : '/html/signup.html',
				controller  : 'loginController'
			})

			.when('/konnect', {
				templateUrl : '/html/konnect.html',
				controller  : 'konnectController'
			})


			.when('/findspeaker', {
				templateUrl : '/html/findspeaker.html',
				controller  : 'findSpeakerController'
			})

			.when('/willNotify.html', {
				templateUrl : '/html/willNotify.html',
				controller 	: 'willNotifyController'
			})

			.when('/signUpSpeaker', {
				templateUrl : '/html/signUpSpeaker.html',
				controller  : 'signUpSpeakerController'
			})

			.when('/thankYouSpeaker', {
				templateUrl : '/html/thankYouSpeaker.html',
				controller 	: 'thankYouSpeakerController'
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
	.controller('konnectController', ['$scope', konnectController]) 

angular.module('livkonApp')
	.controller('videoChatController', ['$scope', function($scope) {

		var apiKey = 45525522;
                var sessionId = '1_MX40NTUyNTUyMn5-MTQ1ODE3MTcyMDg4M35BL0FIekt5RW5LYngxaWgzc1ZjQXVqNEJ-UH4';
                var session = OT.initSession(apiKey, sessionId);
                
        
                var token = 'T1==cGFydG5lcl9pZD00NTUyNTUyMiZzaWc9M2Q3ZmM1Yjc4ZWRmZjNmMmVmNGEyYzllMjIxY2JjMjdmYjQ4MGQxMzpyb2';
        var hostName = window.location.hash.split('/')[2]
        console.log('What gets sliced: ', hostName)
		$http.get('/api/shows/' + hostName)
			.then(function(returnData){
                console.log('Return data: ', returnData.data)
				$scope.thisShow = returnData.data
                $scope.counter = returnData.data.time * 60
                
                
                console.log($scope.currentUser, $scope.thisShow.host)
   
                session.connect(token, function(error) {
                if (error) {
                    console.log(error.message);
                } else {
                    session.publish('myPublisherDiv', {height: '100%', width: '100%'});
                }
            });
        
            session.on({
                streamCreated: function(event) { 
                session.subscribe(event.stream, 'subscribersDiv', {height: "100%", width: "100%"}); 
  }
});


		
		console.log('hello from videochat controller')
		getParameters= function () {
			var ret = {};

			var queryString = window.location.search.substring(1);
			var params = queryString.split('&')
			for (var co=0; co<params.length; co++) {
				var keyValue = params[co].split('-');
				ret[keyValue[0]] = unescape(keyValue[1]);
			}

			return ret;
		};

		onClientReady = function() {
			console.log('client ready')
			gapi.hangout.onApiReady.add(function(e) {
				if(e.isApiReady) {
					onApiReady();
				}
			});
		};

		onApiReady = function () {
			var param = getParameters();
			var now = new Date();

			var hangoutUrl = gapi.hangout.getHangoutUrl();

			var callbackUrl = "register_hangout.json";

			$.ajax({
				url: 'callbackUrl',
				dataType: 'json',
				data: {
					"hangoutUrl" : hangoutUrl,
					"topic" : param["gd"]
				}
			}).done(function (data, status, xhr) {
				$('#msg').html(data.msg);
				console.log('here is the data', data)
			}) .fail(function(xhr, status, error) {
				$('msg').html("There was a problem contacting the help desk. Please try again. ("+textStatus+")");
			});
		};
		onClientReady()

		{}
	}]) 

angular.module('livkonApp')
	.controller('findSpeakerController', ['$scope', '$http', '$window', function($scope, $http, $window) {
		
			 $http({
            method : 'GET',
            url    : '/api/me',
        }).then(function(returnData){
            console.log(returnData)
            if ( returnData.data.user ) {
                $scope.client = returnData.data.user
                $scope.update = function () {
				console.log($scope.user)
				console.log($scope.client)
			// $http ({
			// 	method: 'POST',
			// 	url : '/api/findspeaker',
			// 	data : $scope.user
			// }) .then(function(returnData) {
			// 	console.log('Here is your data', returnData);
			// 	if (returnData.data.success) {$window.location.href='/public/html/willNotify.html'}
			// 	else(console.log(returnData))
			// })

			}
            }
        })

			// $http ({
			// 	method: 'GET',
			// 	url : '/api/me',
			// }) .then(function(returnData) {
			// 	console.log(returnData)
			// 	if (returnData.data.user) {
			// 		$scope.client= returnData.data.user
			// 	}
			// })

			
	}]) 

angular.module('livkonApp')
	.controller('signUpSpeakerController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
			$scope.signUpSpeaker = function () {
			$http ({
				method: 'POST',
				url : '/api/signupspeaker',
				data : $scope.user
			}) .then(function(returnData) {
				console.log('Here is your data', returnData);
				if (returnData.data.success) {$window.location.href='/public/html/thankYouSpeaker.html'}
				else(console.log(returnData))
			})

		}
	}]) 


angular.module('livkonApp')
	.controller('aboutController', ['$scope', aboutController]) 

angular.module('livkonApp')
	.controller('contactController', ['$scope', contactController]) 

angular.module('livkonApp')
	.controller('newsController', ['$scope', newsController]) 

angular.module('livkonApp')
	.controller('fakeFactConnectController', ['$scope', fakeFactConnectController]) 


// <<<<<<< HEAD
// angular.module('livkonApp')
// 	.controller('videoChatController', ['$scope', videoChatController])
// $(document).ready(function() {
// 	var apiKey = 45525522;
// 	var sessionId = '1_MX40NTUyNTUyMn5-MTQ1NzY2NTAyNDU5MH5JTDR0VmlMUUwzT0xvdmNxQVE4eGZhSC9-UH4';
// 	var token = 'T1==cGFydG5lcl9pZD00NTUyNTUyMiZzaWc9YTc5YmY2YjMxMWY3MzFiNzQwNGYzM2EzZGE5M2Y0ZjBjMmRjZWM1Yzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXlOVFV5TW41LU1UUTFOelkyTlRBeU5EVTVNSDVKVERSMFZtbE1VVXd6VDB4dmRtTnhRVkU0ZUdaaFNDOS1VSDQmY3JlYXRlX3RpbWU9MTQ1NzgwNjU1NCZub25jZT0wLjkyNzgxMDQ2Mzc4Mzk3MyZleHBpcmVfdGltZT0xNDU3ODkyOTU0';
// 	var session, publisher;

// 	route();

//     $('#loginForm').on('submit', function(){
//         var username = $('#username').val();
//         if(username == "") {
//             alert('User name should not be empty.');
//             return false;
//         }

//         saveUsername(username);

//         $('#loginPage').hide();
//         $('#boxPage').show();
//         startInterviewBox();
//         location.hash = "#interviewbox"; 
//         return false;

//     });

//     function route() {
//         if(location.hash !== '#interviewbox') {
//             $('#loginPage').show();
//             $('#boxPage').hide();
//             autoFocusUsername();
//         } else {
//             startInterviewBox();
//         }
//     }

//     function autoFocusUsername() {
//         $('#username').select();
//     }


//     function sessionConnectedHandler (event) {
//         session.publish( publisher );
//         subscribeToStreams(event.streams);
//     }
//     function subscribeToStreams(streams) {
//         var subscribersElement = $('#subscribers');
//         var subscriberProperties = {width:200, height:150};
//         for (var i = 0; i < streams.length; i++) {
//             var stream = streams[i];
//             if (stream.connection.connectionId 
//              != session.connection.connectionId) 
//             {
//                 var div = document.createElement('div');
//                 var subscriberId = 'subscriber_' + i;
//                 div.setAttribute('id', subscriberId);

//                 subscribersElement.append(div);
//                 $(div).css('float','left');
//                 $(div).css('margin-right','20px');
//                 $(div).css('margin-bottom','20px');

//                 session.subscribe(stream, subscriberId, subscriberProperties);
//             }
//         }
//     }
//     function streamCreatedHandler(event) {
//         subscribeToStreams(event.streams);
//     }

//     function startInterviewBox() {
//         $('#loginPage').hide();
//         $('#boxPage').show();
//         var publisherName = getUsername();
//         var publisherProperties = { name:publisherName};

//         publisher = TB.initPublisher(apiKey, 'publisher', publisherProperties);
//         session   = TB.initSession(sessionId);

//         session.connect(apiKey, token);
//         session.addEventListener("sessionConnected", 
//         sessionConnectedHandler);

//         session.addEventListener("streamCreated", 
//         streamCreatedHandler);

//         window.setTimeout(function(){
//             $('body').trigger('welcome');
//         }, 500);
        

//     }
// })

// angular.module('livkonApp')
// 	.controller('videoChatController', ['$scope', videoChatController])
// $(document).ready(function() {
// 	var apiKey = 45525522;
// 	var sessionId = '1_MX40NTUyNTUyMn5-MTQ1NzY2NTAyNDU5MH5JTDR0VmlMUUwzT0xvdmNxQVE4eGZhSC9-UH4';
// 	var token = 'T1==cGFydG5lcl9pZD00NTUyNTUyMiZzaWc9YTc5YmY2YjMxMWY3MzFiNzQwNGYzM2EzZGE5M2Y0ZjBjMmRjZWM1Yzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXlOVFV5TW41LU1UUTFOelkyTlRBeU5EVTVNSDVKVERSMFZtbE1VVXd6VDB4dmRtTnhRVkU0ZUdaaFNDOS1VSDQmY3JlYXRlX3RpbWU9MTQ1NzgwNjU1NCZub25jZT0wLjkyNzgxMDQ2Mzc4Mzk3MyZleHBpcmVfdGltZT0xNDU3ODkyOTU0';
// 	var session, publisher;

// 	route();

//     $('#loginForm').on('submit', function(){
//         var username = $('#username').val();
//         if(username == "") {
//             alert('User name should not be empty.');
//             return false;
//         }

//         saveUsername(username);

//         $('#loginPage').hide();
//         $('#boxPage').show();
//         startInterviewBox();
//         location.hash = "#interviewbox"; 
//         return false;

//     });

//     function route() {
//         if(location.hash !== '#interviewbox') {
//             $('#loginPage').show();
//             $('#boxPage').hide();
//             autoFocusUsername();
//         } else {
//             startInterviewBox();
//         }
//     }

//     function autoFocusUsername() {
//         $('#username').select();
//     }


//     function sessionConnectedHandler (event) {
//         session.publish( publisher );
//         subscribeToStreams(event.streams);
//     }
//     function subscribeToStreams(streams) {
//         var subscribersElement = $('#subscribers');
//         var subscriberProperties = {width:200, height:150};
//         for (var i = 0; i < streams.length; i++) {
//             var stream = streams[i];
//             if (stream.connection.connectionId 
//              != session.connection.connectionId) 
//             {
//                 var div = document.createElement('div');
//                 var subscriberId = 'subscriber_' + i;
//                 div.setAttribute('id', subscriberId);

//                 subscribersElement.append(div);
//                 $(div).css('float','left');
//                 $(div).css('margin-right','20px');
//                 $(div).css('margin-bottom','20px');

//                 session.subscribe(stream, subscriberId, subscriberProperties);
//             }
//         }
//     }
//     function streamCreatedHandler(event) {
//         subscribeToStreams(event.streams);
//     }

//     function startInterviewBox() {
//         $('#loginPage').hide();
//         $('#boxPage').show();
//         var publisherName = getUsername();
//         var publisherProperties = { name:publisherName};

//         publisher = TB.initPublisher(apiKey, 'publisher', publisherProperties);
//         session   = TB.initSession(sessionId);

//         session.connect(apiKey, token);
//         session.addEventListener("sessionConnected", 
//         sessionConnectedHandler);

//         session.addEventListener("streamCreated", 
//         streamCreatedHandler);

//         window.setTimeout(function(){
//             $('body').trigger('welcome');
//         }, 500);
        

//     }
// })
// function videoChatController ($scope) {
// 	var apiKey = 45525522;
// 	var sessionId = '1_MX40NTUyNTUyMn5-MTQ1NzY2NTAyNDU5MH5JTDR0VmlMUUwzT0xvdmNxQVE4eGZhSC9-UH4';
// 	var session = OT.initSession(apiKey, sessionId);
// 		session.on({
// 	  streamCreated: function(event) { 
// 	    session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'}); 
// 	  }
// 	});

// 	<!-- Generating a token -->
// 	var token = 'T1==cGFydG5lcl9pZD00NTUyNTUyMiZzaWc9YTc5YmY2YjMxMWY3MzFiNzQwNGYzM2EzZGE5M2Y0ZjBjMmRjZWM1Yzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXlOVFV5TW41LU1UUTFOelkyTlRBeU5EVTVNSDVKVERSMFZtbE1VVXd6VDB4dmRtTnhRVkU0ZUdaaFNDOS1VSDQmY3JlYXRlX3RpbWU9MTQ1NzgwNjU1NCZub25jZT0wLjkyNzgxMDQ2Mzc4Mzk3MyZleHBpcmVfdGltZT0xNDU3ODkyOTU0';
// 	session.connect(token, function(error) {
// 	  if (error) {
// 	    console.log(error.message);
// 	  } else {
// 	    session.publish('myPublisherDiv', {width: 320, height: 240});
// 	  }
// 	});
// }

function homeController ($scope) {
	$scope.loginform = {}
	console.log('home Controller!')
	console.log('login Controller!')
	$scope.login = function () {
		$http.post('/login', $scope.loginform)
		.then(function (returnData){
			console.log(returnData)
		})

	}
}

function signupController ($scope) {
	console.log('signup Controller!')
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









