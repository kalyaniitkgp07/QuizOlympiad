function _validateUsername(username) {
	return {status: true, error: null};
}
function _validatePassword(password) {
	return {status: true, error: null};
}
function _matchPassword(password, confirmpass) {
	if(password === confirmpass) {
		return {status: true, error: null};
	} else {
		return {status: false, error: 'Password doesn\'t match.'};
	}
}

var register = function ValidateRegisterArgumnets(args) {
	console.log('ARGS::::', args);
	var valRes = _validateUsername(args.username);
	if(valRes.status) {
		valRes = _validatePassword(args.password);
	}
	if(valRes.status) {
		valRes = _matchPassword(args.password, args.confirmpass);
	}
	return valRes;
};

module.exports = {
	register,
};