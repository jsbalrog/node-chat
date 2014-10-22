var util = require('../middleware/utilities');

exports.index = function(req, res) {
	res.cookie('IndexCookie', 'hello');
	// Pass the title, the cookies, and the session to the view.
	res.render('index', { 
		title: 'Index', 
	});
};

exports.login = function(req, res) {
	res.render('login', { title: 'Login', message: req.flash('error') });
};

exports.loginProcess = function(req, res) {
	var isAuth = util.auth(req.body.username, req.body.password, req.session);
	if(isAuth) {
		res.redirect('/chat');
	} else {
		req.flash('error', 'Wrong Username or Password');
		res.redirect('/login');
	}
};

exports.chat = function(req, res) {
	res.render('chat', { title: 'Chat' });
};

exports.logout = function(req, res) {
	util.logout(req.session);
	res.redirect('/');
};