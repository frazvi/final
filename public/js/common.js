<<<<<<< HEAD
function saveUsername(username) {
	sessionStorage.username = username;
}

function getUsername() {
	if (typeof sessionStorage.username === 'undefined') {
		return 'Anonymous user';
	} else {
		return sessionStorage.username;
	}
}
=======
// function saveUsername(username) {
// 	sessionStorage.username = username;
// }

// function getUsername() {
// 	if (typeof sessionStorage.username === 'undefined') {
// 		return 'Anonymous user';
// 	} else {
// 		return sessionStorage.username;
// 	}
// }
>>>>>>> f43a834def263d3f50d4cdc5beb65f27606845aa
