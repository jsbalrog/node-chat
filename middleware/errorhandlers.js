exports.notFound =  function(req, res, next) {
	res.send(404, 'You seem lost. You must\'ve taken a wrong turn.');
};

exports.error = function (err, req, res, next) {
	console.log(err);
	res.send(500, 'Something broke. What did you do?');
};