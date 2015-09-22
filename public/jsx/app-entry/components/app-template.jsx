import React  from 'react';
import Header from './app-header.jsx';

function getCart() {
  return AppStore.getCart();
}

let Template = React.createClass({
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