var express = require('express');
var app = express();
var errorHandlers = require('./middleware/errorhandlers');
var routes = require('./routes');
var partials = require('express-partials');
var cookieParser = require('cookie-parser'); // For session cookies
var session = require('express-session'); // For sessions
var bodyParser = require('body-parser'); // For parsing the body from POSTs
var RedisStore = require('connect-redis')(session);
var csrf = require('csurf');
var util = require('./middleware/utilities');
var flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('G|4n<F7tL}0L8L4052|82$0`W1?N8)')); // Must match the secret used in the session to read it
app.use(session({ 
	secret: 'G|4n<F7tL}0L8L4052|82$0`W1?N8)',
	saveUninitialized: true,
	resave: true,
	store: new RedisStore({ url: 'redis://localhost' })
})); // secret is used to create a hash of our session id
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.use(partials());
app.set('view options', { defaultLayout: 'layout' });

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/logout', routes.logout);
app.get('/chat', util.requireAuthentication, routes.chat);
app.get('/error', function (req, res, next) {
	next(new Error('A contrived error'));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);
console.log('App server running on port 3000');