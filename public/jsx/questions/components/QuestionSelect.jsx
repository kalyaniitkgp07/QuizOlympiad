import React 				from 'react';
import ApiUtils 		from '../../shared/api.jsx';
import {
	CircularProgress} from 'material-ui';

const QuestionSelect = React.createClass({
	render() {
		const
			questionsResponse 	= this.props.questionsResponse
		;
		let renderHtml = null;
		if(ApiUtils.hasLoaded(questionsResponse)) {
			const allQuestions	= questionsResponse.result.roundQuestions.GameRounds[0].RoundQuestions;
			renderHtml = $.map(allQuestions, (questionInfo) => {
				return(
					<div key={questionInfo.QuestionGroupIndex}>{questionInfo.QuestionGroupIndex}</div>
				);
			});
		} else if(ApiUtils.hasFailed(questionsResponse)) {
			// TODO-ALERT: 
		} else {
			renderHtml = <CircularProgress mode="indeterminate" size={1.5} />;
		}

		return (
			<div>{renderHtml}</div>
		);
	},
});

module.exports = QuestionSelect;