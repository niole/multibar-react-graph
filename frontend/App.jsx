"use strict";
/*global React*/

var React = require('react');
var Chart = require('./Chart.jsx');
var Data = require('./Data.js');


var Interface = React.createClass({

  render: function(){
    return(
      <Chart
        data={Data.data}
        titles={Data.titles}
        height={500}
        width={500}
        xHeader={"days of the week"}
        yHeader={"number of organisms"}
      />
    );
  }
});

React.render( <Interface/>, $('#container')[0]);
