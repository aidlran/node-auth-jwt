const cookieParser = require('cookie-parser')();
const JWT = require('jwt-simple');

module.exports.load = (request, response, next) =>
	cookieParser(request, response, () => {
		if (request.cookies['JWT']) try {
			request.session = JWT.decode(request.cookies['JWT'], process.env.SESSION_SECRET);
		} catch (error) {}
		next();
	});

module.exports.save = payload => (request, response, next) => {
	response.cookie('JWT', JWT.encode(payload, process.env.SESSION_SECRET), {
		httpOnly: true,
		secure: true,
		maxAge: 1000 * 60 * 60 * 24 // 1 day
	});
	next();
};
