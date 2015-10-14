import {USER_ROLES}	from '../../../config/constants.js';
import LocalStorage from './local-storage.jsx';
import STORAGE_KEYS from './storage-keys.jsx';

module.exports = {
	isAdmin() {
		const authToken = JSON.parse(LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN));
		return (authToken && authToken.userrole === USER_ROLES.ADMIN);
	},
	isAudience() {
		const authToken = JSON.parse(LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN));
		return (authToken && authToken.userrole === USER_ROLES.AUDIENCE);
	},
	isSupervisedContestant() {
		const authToken = JSON.parse(LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN));
		return (authToken && authToken.userrole === USER_ROLES.SUPERVISED_CONTESTANT);
	},
	isUnsupervisedContestant() {
		const authToken = JSON.parse(LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN));
		return (authToken && authToken.userrole === USER_ROLES.UNSUPERVISED_CONTESTANT);
	}
};