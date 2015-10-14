import React from 'react';
import ApiUtils 		from '../../shared/api.jsx';
import {
	CircularProgress} from 'material-ui';

const QuestionDetailsPage = React.createClass({
	_questionByIndex(qIndex) {
		const allQuestions	= this.props.questionsResponse.result.roundQuestions.GameRounds[0].RoundQuestions;	
		let retQGrp = null;
		$.each(allQuestions, (i, qGrpInfo) => {
			if(qGrpInfo.QuestionGroupIndex == qIndex) {
				retQGrp = qGrpInfo;
				return false;
			}
		});
		return retQGrp;
	},

	render() {
		const
			questionsResponse 	= this.props.questionsResponse
		;
		let renderHtml = null;
		if(ApiUtils.hasLoaded(questionsResponse)) {
			const questionGrp = this._questionByIndex(this.props.params.qindex);
			if(questionGrp) {
				renderHtml = $.map(questionGrp.QuestionGroup, (questionInfo) => {
					return(
						<div key={questionInfo.QuestionRefId}>
							{questionInfo.QuestionText}
						</div>
					);
				});
			} else {
				// TODO-ALERT : ERROR== Question out of index
			}
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

module.exports = QuestionDetailsPage;