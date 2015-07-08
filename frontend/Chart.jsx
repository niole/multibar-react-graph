"use strict";

var React = require('react');

var Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    title: React.PropTypes.array,
    xHeader: React.PropTypes.string,
    yHeader: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },
  render: function(){
    var bars = [];
    //TODO add width between bars option
    var barW = (this.props.width/Object.keys(this.props.data[0]).length).toString();
    var tallest = 0;
    this.props.data.forEach( function(d) {
      for (var key in d){
        if (d[key] >= tallest){
          tallest += d[key];
        }
      }
    });

    this.props.data.forEach( function(entity,i){
      for (var k in entity){
        var height = ((this.props.height*entity[k])/tallest).toString();
        bars.push( React.createElement('div',{
                                              style: {
                                                      width: barW,
                                                      height: this.props.height,
                                                      backgroundColor: "white",
                                                      float: "right",
                                                      position: "relative"
                                                      }
                                              },
          React.createElement('div',{
                                    style: {
                                      height: height,
                                      width: barW,
                                      backgroundColor: "blue",
                                      borderStyle: "solid",
                                      borderWidth: "1",
                                      borderColor: "black",
                                      float: "right",
                                      position: "absolute",
                                      bottom: 0
                                    },
                                    className: this.props.titles[i]
                                    })
                    )
                 );
      }
    }.bind(this));

    return (
      React.createElement('div',{
                                style:{
                                  borderColor: "black",
                                  borderStyle: "solid",
                                  borderWidth: "1px"
                                      }
                                },
        React.createElement('div',{
              className: "chart-container",
              style: {
                width: this.props.width+"px",
                height: this.props.height+"px",
                padding: "50px"
              }
              },
              bars
        )
      )
    );
  }
});

module.exports = Chart;
