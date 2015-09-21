let LOADING_STATE = {
	NOT_REQUESTED	: 0,
	LOADING 			: 1,
	SUCCESS				: 2,
	FAILURE				: 3,
};

function notRequested(response) {
	return response.status === LOADING_STATE.NOT_REQUESTED;
}
function isLoading(response) {
	return response.status === LOADING_STATE.LOADING;
}
function hasLoaded(response) {
	return response.status === LOADING_STATE.SUCCESS;
}
function hasFailed(response) {
	return response.status === LOADING_STATE.FAILURE;
}

module.exports = {
	LOADING_STATE,
	notRequested,
	isLoading,
	hasLoaded,
	hasFailed,
}