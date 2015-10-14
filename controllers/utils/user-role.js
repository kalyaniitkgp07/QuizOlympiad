var USER_ROLES = require('../../config/constants').USER_ROLES;

module.exports = {
	isAdmin(user) {
		return (user && user.userrole === USER_ROLES.ADMIN);
	},
	isAudience(user) {
		return (user && user.userrole === USER_ROLES.AUDIENCE);
	},
	isSupervisedContestant(user) {
		return (user && user.userrole === USER_ROLES.SUPERVISED_CONTESTANT);
	},
	isUnsupervisedContestant(user) {
		return (user && user.userrole === USER_ROLES.UNSUPERVISED_CONTESTANT);
	}
};