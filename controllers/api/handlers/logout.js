'use strict'

module.exports = {
	getMethod: function resetSessionCookie(req, res) {
		req.session.reset();
		res.json({
			status	: true,
			error		: false,
			result	: null,
		})
	}
};