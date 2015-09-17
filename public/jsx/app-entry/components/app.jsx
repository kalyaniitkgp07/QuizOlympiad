/** @jsx React.DOM */
var
	React 				= require('react'),
	RouteHandler 	= require('react-router').RouteHandler,
	Template 			= require('./app-template.jsx')
;

var APP = React.createClass({
  render: function () {
    return (
      <Template>
        <RouteHandler />
      </Template>
    );
  }
});

exports.APP = APP;