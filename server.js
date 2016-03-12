var express = require ('express');
var bodyParser = require ('body-parser');
var logger = require ('morgan');
var mongoose = require ('mongoose');
var OpenTok = require('opentok')
// Create express app object
var app = express();


// App config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

// Express Session Setup
var session = require('express-session')
app.sessionMiddleware = session ({
	secret : 'something',
	resave : false,
	saveUninitialized: true,
})
app.use(app.sessionMiddleware)

// Setting up Database
var userSchema = require('mongoose')
mongoose.connect('mongodb://localhost/userDatabase')

var userSchema = mongoose.Schema ({
	username: {type: String, required: true, unique: true},
	email 	: {type: String, required: true, unique: true},
	identifyingReligion : {type: String, required: true},
	languages: {type: Array, required: true},
	countryOfResidence: {type: String, required: false},
	Gender: {type: String, required: true},
	profilePicture: {type: String, required: false},
	password: {type: String, required: true},
});

var User = mongoose.model('user', userSchema);

// Video Chat
//Creating a session that will attempt to transmit streams directly 
//between clients. Session uses the openTok TURN server if clients can't connect
opentok = new OpenTok(apiKey, apiSecret);

opentok.createSession(properties, function(err, session) {
	if (err) return console.log(err);

	//saving the sessionID
	db.save('session', session.sessionId, done);
})

//creating a session that will use the openTok Media Router
opentok.createSession ({mediaMode: "routed"}, function (err, session) {
	if (err) return console.log(err);

	//saving the session ID
	db.save('session', session.sessionId, done);
)}

// Creating(?) a session with a location hint
opentok.createSession({location: '12.34.56.78'}, function (err, session) {
	if (err) return console.log(err);

	//Saving the session ID
	db.save('session', session.sessionId, done);
)}

//Session with automatic archiving
opentok.createSession ({mediaMode: 'routed', archiveMode: 'always'}, function(err, session) {
	if (err) return console.log(err);

	//saving the session ID
	db.save('session', session.sessionId, done);
})

//Generating a Token from just a sessionId taken from a database
token = opentok.generateToken(sessionId);

	//setting options within the Token
	token = session.generateToken({
		role : 'moderator',
		expireTime : (new Data().getTime() / 1000)+(7 * 24 * 60 * 60), //in one week 
		date : 'name = username' 
});

//Passport Config
var passport = require ('passport')
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done (err, user);
	});

});

//Determining that the person who's logging in is who they say they are
var bcrypt = require ('bcryptjs')
passport.use(new LocalStrategy (
	function(username, password, done) {
		console.log('xxx')
		User.findOne({username: username}, function(err, user) {
			console.log('yyy', err, user)
			if(err) {return done(err);}
			if (!user) {
				return done(null, false);
			}
			//User exists, now make sure they put in the right password
			bcrypt.compare(password, user.password, function(error, response) {
				if (response === true) {
					return done (null, user)
				}
				else {
					return done (null, false)
				}
			})
		});
	}
));

app.isAuthenticated = function(req, res, next) {
	//If the current user is logged in
	if(req.isAuthenticated()){
		return next();
	}
	//If the current user is not logged in, redirect to login
	console.log("Please login to continue; redirecting to login page")
	res.redirect('/');
}

app.isAuthenticatedAjax = function(req, res, next) {
	//If the current user is logged in
	if (req.isAuthenticated()){
		return next();
	}
	//If the current user is not logged in, redirect to login
	res.send({error: 'not logged in; redirecting to login page'});
}

app.get('/me', function(req, res) {
	res.send(req.user)
})

// End of Passport Config

// Routes
app.get('/', function (req, res) {
	res.sendFile('/shell.html', {root: './public/html'});
})

app.get('/', function(req, res) {
	if (!req.session.count) {req.session.count = 0}
		console.log(req.session.count++)
		console.log(req.user)
		res.sendFile('/html/login.html', {root : './public'})
})

app.post('/signup', function(req, res) {
	console.log(req.body)
	bcrypt.genSalt(11, function(error, salt) {
		bcrypt.hash(req.body.password, salt, function(hashError, hash) {
			var newUser = new User ({
				username: req.body.username,
				email: req.body.email,
				identifyingReligion : req.body.religion,
				languages : req.body.languages,
				countryOfResidence : req.body.countryOfResidence,
				gender : req.body.gender,
				profilePicture : req.body.profilePicture,
				password: hash,
			});
			newUser.save(function(saveErr, user) {
				if (saveErr) { res.send({err:saveErr})}
				else {
					req.login(user, function(loginErr) {
						if (loginErr) {res.send({err:loginErr})}
						else {res.send({success: 'success', user: user})}
					})
				}
			})
		})
	})
})

app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {return next(err); }
		if (!user) {return res.send({error: 'something went wrong :('}); }
		req.logIn(user, function(err) {
			if (err) {return next(err);}
			return res.send({success: 'success'});
		});
	}) (req, res, next);
})

app.get('/api/me', function (req, res) {
	res.send(req.user)
})

// Create server and listen for connections
var port = 3000
app.listen(port, function(){
	console.log("I am listening to your thoughts!");
})