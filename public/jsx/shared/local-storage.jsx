module.exports = {
	get: function getKeyValueFromLocalStorage(key) {
		return localStorage.hasOwnProperty(key) ? localStorage[key] : null; 
	},
	update: function updateKeyValueToLocalStorage(key, value) {
		localStorage[key] = value;
	},
	remove: function removeKeyFromLocalStorage(key) {
		if(localStorage.hasOwnProperty(key)) {
			delete localStorage[key];
		}
	},
};