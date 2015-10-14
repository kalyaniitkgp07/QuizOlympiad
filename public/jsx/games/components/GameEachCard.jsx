import React						from 'react';
import {Link}						from 'react-router';
import AuthStore				from '../../auth/stores/stores.jsx';
import {
	Avatar,
	Card,
	CardHeader,
	CardText,
	CardActions,
	FlatButton}	 					from 'material-ui';
import {LEVELS}					from '../../shared/level-link.jsx';
import {
	getCardActionLabel,
	getCardActionLink}		from '../../shared/card-actions.jsx';

const GameEachCard = React.createClass({
	
	_getCardActionInfo(game) {
		game.IsInLevel       = game.IsInGame;
		game.LevelType       = LEVELS.GAME;
		game.LevelLinkParams = [game.TournamentInfo.TournamentName, game.GameIdName];
		const
			label  = getCardActionLabel(game),
			link 	 = getCardActionLink(game)
		;
		
		return ({
			label,
			link
		})
	},

	render() {
		const
			game          = this.props.gameInfo,
			avatar        = <Avatar>{game.GameDisplayName.charAt(0)}</Avatar>,
			{label, link} = this._getCardActionInfo(game),
			linkElement		= <Link to={link} />
		;
		return (
			<div className="col-xs-12 col-sm-6 col-md-4">
				<div className="box">
					<Card className="game-desc-card">
						<CardHeader
							className = "card-header"
							title  = {game.GameDisplayName}
							avatar = {avatar}
						/>
						<CardText className="card-text">
							{game.GameDescription}
						</CardText>
						<CardActions className="card-actions">
							<FlatButton
								secondary        = {true}
								label            = {label}
								linkButton       = {true}
								containerElement = {linkElement}
							/>
						</CardActions>
					</Card>
				</div>
			</div>
		);
	},
});

module.exports = GameEachCard;