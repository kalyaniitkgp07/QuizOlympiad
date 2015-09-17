/** @jsx React.DOM */
var
	React = require('react'),
	//AppStore = require('../stores/app-store.js'),
	//AppActions = require('../actions/app-actions.js'),
	Header = require('./app-header.jsx')
;

function getCart() {
  return AppStore.getCart();
}

var Template = 
	React.createClass({
		/*
    handleClick: function(){
      AppActions.addItem();
      console.log(getCart());
    },    
  	*/
    render: function(){
      return (
       	<div>
          <Header />
          {this.props.children}
          <br/><br/>
          
  	    </div>
     	)
    }
	});

module.exports = Template;