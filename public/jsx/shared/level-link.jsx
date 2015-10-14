const
	LEVELS = {
		TOURNAMENT : 'TOURNAMENT',
		STAGE      : 'STAGE',
		GAME       : 'GAME',
		ROUND      : 'ROUND',
		QUESTION   : 'QUESTION',
	},

	LEVEL_LINKS = {
		PLAY: {
			[LEVELS.TOURNAMENT] : (params) => `/tournaments/${params[0]}/games`,
			[LEVELS.GAME]       : (params) => `/tournaments/${params[0]}/games/${params[1]}/rounds`,
		},
		JOIN: {
			[LEVELS.TOURNAMENT] : (params) => `/tournaments/${params[0]}/join`,
			[LEVELS.GAME] 			: (params) => `/tournaments/${params[0]}/join`,
		},
		LEADER_BOARD: {
			[LEVELS.TOURNAMENT] : (params) => `/tournaments/${params[0]}/leaderboard`,
			[LEVELS.GAME] 			: (params) => `/tournaments/${params[0]}/leaderboard`,
		},
	}
;

module.exports = {
	LEVELS,
	LEVEL_LINKS,
};