import UserRole from './user-role.jsx';
import {
	LEVEL_LINKS}	from './level-link.jsx';

function getCardActionLabel(levelInfo) {
	let label;
	if(!levelInfo.Unsupervised) {
		if(UserRole.isAdmin()) {
			label = 'start';
		} else {
			label = 'follow';
		}
	} else {
		if(levelInfo.IsInLevel) {
			label = 'play';
		} else if(UserRole.isAudience()) {
			label = 'join';
		} else {
			label = 'leader board';
		}
	}

	return label;
}

function getCardActionLink(levelInfo) {
	let link;
	if(!levelInfo.Unsupervised) {
		 link = LEVEL_LINKS.PLAY[levelInfo.LevelType](levelInfo.LevelLinkParams);
	} else {
		if(levelInfo.IsInLevel) {
			link = LEVEL_LINKS.PLAY[levelInfo.LevelType](levelInfo.LevelLinkParams);
		} else if(UserRole.isAudience()) {
			link = LEVEL_LINKS.JOIN[levelInfo.LevelType](levelInfo.LevelLinkParams);
		} else {
			link = LEVEL_LINKS.LEADER_BOARD[levelInfo.LevelType](levelInfo.LevelLinkParams);
		}
	}
	return link;
}

module.exports = {
	getCardActionLabel,
	getCardActionLink,
};