// $(document).ready(function(){

// 	var socket = io.connect('http://ec2-54-213-131-240.us-west-2.compute.amazonaws.com:1339');

// 	socket.on('newMessage', function (data) {
// 		console.log('get new message: ', data);
// 		if(data.username != getUsername()) {
// 			addMessageToChatroom(data.username, data.message);
// 		}
		
// 	});


// 	$('#sendMessageForm').on('submit', function(){
// 		var message = $('#message').val();
// 		if(message == '') {
// 			alert('Message should not be empty.');
// 			return false;
// 		}

// 		addMessageToChatroom(getUsername(), message);
// 		sendMessageToOtherUsers(getUsername(), message);
// 		$('#message').val('');
// 		return false;


// 	});

// 	$('body').on("welcome", function(){
// 		sendWelcomeInformation();
// 	});

// 	function sendWelcomeInformation() {

// 		var message = 'Welcome ' + getUsername() + ' to Interview Box.'
// 		addMessageToChatroom('Admin', message);
// 		sendMessageToOtherUsers('Admin', message);
// 	}

// 	function addMessageToChatroom(username, message) {
// 		var messages = $('#chatroom').val();
// 		messages = messages + '\n' + username + ': ' + message;

// 		$('#chatroom').val(messages);
// 		var  chatroom = document.getElementById('chatroom');
// 		chatroom.scrollTop = chatroom.scrollHeight;
// 		$('#chatroom').scrollTop = $('#chatroom').scrollHeight;

// 	}

// 	function sendMessageToOtherUsers(username, message) {
		
// 		socket.emit('newMessage', {username:username, message:message});
// 	}




// })