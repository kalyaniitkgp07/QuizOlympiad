'use strict'

module.exports = {
	SESSION_CONFIG: {
		cookieName			: "session",
    secret					: "iukjnaljksabanljq0934",
    duration 				: 30 * 60 * 1000,
    activeDuration	: 300000,
	},

	USER_ROLES: {
		ADMIN								: 'ADMIN',
		AUDIENCE						: 'AUDIENCE',
		CONTESTANT					: 'CONTESTANT',
		VIRTUAL_CONTESTANT	: 'VIRTUAL_CONTESTANT',
		DEFAULT							: 'AUDIENCE',
	},
};