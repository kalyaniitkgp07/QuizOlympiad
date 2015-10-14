import React from 'react';

const HeadingTag = React.createClass({
	render() {
		return (
			<div className="row center-xs myui-heading-tag">
				<span className="myui-heading-tag-placeholder">{this.props.label}</span>
			</div>
		);
	},
});

module.exports = {
	HeadingTag,
};