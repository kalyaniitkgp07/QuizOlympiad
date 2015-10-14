function isInContest(contestantIdList, userId) {
	if(userId === null || !contestantIdList){
		return false;
	}
	var contestantStrIdList = contestantIdList.map(function(objId) {
		return objId.toString();
	});
	return (contestantStrIdList.indexOf(userId) >= 0);
}

module.exports = {
	isInContest,
};