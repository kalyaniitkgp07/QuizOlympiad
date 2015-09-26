import React      from 'react';
import Header     from './app-header.jsx';
import NavDrawer  from './nav-drawer.jsx';

let Template = React.createClass({
  componentDidUpdate: function() {
    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    componentHandler.upgraderDom();

    // We could have done this manually for each component
    /*
     * var submitButton = this.refs.submit.getDOMNode();
     * componentHandler.upgradeElement(submitButton, "MaterialButton");
     * componentHandler.upgradeElement(submitButton, "MaterialRipple");
     */
  },
  render: function(){
    return (
     	<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <NavDrawer />
        {this.props.children}
        <br/><br/>
        
	    </div>
   	)
  }
});

module.exports = Template;