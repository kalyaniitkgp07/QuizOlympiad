import React 				from 'react';
import SortUtils 		from '../../shared/sort.jsx';
import {
	HeadingTag } 			from '../../shared/custom-comps.jsx';
import GameEachCard from './GameEachCard.jsx';

const GameDescCards = React.createClass({
	render() {
		let
			renderHtml 	= [],
			gameList 		= this.props.gameList
		;
		if(gameList.length) {
			gameList.sort(SortUtils.sortByKey.bind(this, 'GameIndex'));
			let
				currStageIdx = 0, //gameList[0].TournamentInfo.GameStageIndex,
				idx = 0
			;
			//renderHtml = [<HeadingTag label={'Stage ' + currStageIdx}  key={'stage' + currStageIdx}/>];
			while(idx < gameList.length) {
				currStageIdx = gameList[idx].TournamentInfo.GameStageIndex;
				renderHtml.push(<HeadingTag label={'Stage ' + currStageIdx} key={'stage' + currStageIdx}/>);
				let stageGamesHtml = [];
				while(idx < gameList.length && currStageIdx === gameList[idx].TournamentInfo.GameStageIndex) {
					stageGamesHtml.push(<GameEachCard gameInfo={gameList[idx]} key={gameList[idx].GameIdName}/>);	
					idx++;
				}
				renderHtml.push(<div className="row" key={'stageGames' + currStageIdx}>{stageGamesHtml}</div>);				
			}
		}
		return(
			<div>{renderHtml}</div>
		);
	},
});

module.exports = GameDescCards;