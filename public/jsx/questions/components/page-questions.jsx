import React 						from 'react';
import QuestionsStore		from '../stores/round-questions.jsx';
import Actions					from '../actions/actions.jsx';
import ParamUtils				from '../../shared/param.jsx';
import ApiUtils					from '../../shared/api.jsx';
import QuestionSelect		from './QuestionSelect.jsx';
import QuestionDetails	from './QuestionDetails.jsx';

const QuestionsPage = React.createClass({
	_getQuestionsStore() {
		return ({
			questionsResponse	: QuestionsStore.getQuestionsResponse(),
		});
	},

	getInitialState() {
		return this._getQuestionsStore();
	},

	componentDidMount() {
		console.log('ROUND Questions DIDI MOUNT');
		QuestionsStore.addChangeListener(this._onQuestionsChange);
		Actions.fetchRoundQuestions(this.props.params);
	},

	componentWillReceiveProps(newProps) {
		const newParams = {
			tidname : newProps.params.tidname,
			gidname	: newProps.params.gidname,
			ridname	: newProps.params.ridname,
		};
		console.log('OLD PARAMS::::', this.props.params);
		console.log('NEW PARAMS::::', newParams);
		
		if(ParamUtils.hasChanged(this.props.params, newParams)) {
			Actions.fetchRoundQuestions(newParams);
		}
	},

	componentWillUnmount() {
		QuestionsStore.removeChangeListener(this._onQuestionsChange);
	},

	_onQuestionsChange() {
		this.setState(this._getQuestionsStore());
	},

	render() {
		return (
			<div>
				{this.props.params.qindex
					? (
							<QuestionDetails
								questionsResponse = {this.state.questionsResponse}
								params            = {this.props.params}
							/>
						)
					: (
							<QuestionSelect
								questionsResponse = {this.state.questionsResponse}
							/>
						)
				}
			</div>
		);
	},
});

module.exports = QuestionsPage;