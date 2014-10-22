module.exports.csrf = function(req, res, next) {
	// res.locals is available to all templates that have access to this response.
	res.locals.token = req.csrfToken();
	next();
};

/**
 * Function to add an isAuthenticated variable for all templates.
 * isAuthenticated is placed on res.locals. If it is true, the
 * session.user is also placed on res.locals.
 * 
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next call the next middleware in the stack
 */
exports.authenticated = function(req, res, next) {
	res.locals.isAuthenticated = req.session.isAuthenticated;
	if(req.session.isAuthenticated) {
		res.locals.user = req.session.user;
	}
	next();
};

/**
 * Function to determine whether the user is authenticated or not. 
 * If not, redirect to login page. You'll want to use this middleware
 * on a per-route basis.
 * 
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next call the next middleware in the stack
 */
exports.requireAuthentication = function(req, res, next) {
	console.log(req.session.isAuthenticated);
	if(req.session.isAuthenticated) {
		next();
	} else {
		res.redirect('/login');
	}
};

/**
 * Function to authorize a user.
 * 
 * @param  {string} username the username to check against
 * @param  {string} password the password to check against
 * @param  {object} session  the session object
 * @return {boolean}          returns whether the user is authorized.
 */
exports.auth = function(username, password, session) {
	var isAuth = username === 'joshua' || username === 'brian';
	if(isAuth) {
		session.isAuthenticated = isAuth;
		session.user = { username: username };
	}
	return isAuth;
};

/**
 * Function to log out a user. Deletes the user from the session
 * and sets isAuthenticated to false.
 * 
 * @param  {object} session the session object
 */
exports.logout = function(session) {
	session.isAuthenticated = false;
	delete session.user;
};