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