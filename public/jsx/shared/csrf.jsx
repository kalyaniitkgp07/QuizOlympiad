module.exports = {
	get: function getCSRFToken() {
		return $('body').data('csrf');
	}
};