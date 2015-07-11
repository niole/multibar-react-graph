"use strict";

var React = require('react/addons');
//var Legend = require('./Legend.jsx');

var Chart = React.createClass({
  getDefaultProps: function() {
    return {
      numberMap: {0:"zero",1:"one",2:"two",
                  3:"three",4:"four",5:"five",
                  6:"six",7:"seven",8:"eight",
                  9:"nine",10:"ten"}
    };
  },

  propTypes: {
    color: React.PropTypes.array,
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
      var height = '';
      for (var k in entity){
        height = ((this.props.height*entity[k])/tallest).toString();
        bars.push( React.createElement('div',{
                                              style: {
                                                      width: barW,
                                                      height: this.props.height,
                                                      backgroundColor: "white",
                                                      float: "right",
                                                      position: "relative"
                                                      },
                                              className: "negative-space"
                                              },
          React.createElement('div',{
                                    style: {
                                      height: height,
                                      width: barW,
                                      borderStyle: "solid",
                                      borderWidth: "1",
                                      borderColor: "black",
                                      float: "right",
                                      position: "absolute",
                                      bottom: 0
                                    },
                                    className: this.props.numberMap[i]
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
                                  borderWidth: "1px",
                                  textAlign: "center",
                                  position: "relative",
                                  display: "inline-block",
                                  width: parseInt(this.props.width)+parseInt(this.props.width/7),
                                  height: parseInt(this.props.height)+parseInt(this.props.height/7)
                                      },
                                },
        React.createElement('div',{
              className: "chart-container",
              style: {
                marginLeft: "70px",
                width: this.props.width+"px",
                height: this.props.height+"px"
              }
              },
              bars
        ),

        React.createElement('div',{
                                style: {
                                  position: "absolute",
                                  bottom: "7%",
                                  right: "60%"
                                }
                                }, this.props.xHeader),
        React.createElement('div',{
                                  style: {
                                    left: 0,
                                    bottom: "50%",
                                    position: "absolute",
                                    webkitTransform: 'rotate(90deg)',
                                    mozTransform: 'rotate(90deg)',
                                    msTransform: 'rotate(90deg)',
                                    oTransform: 'rotate(90deg)',
                                    transform: 'rotate(90deg)'
                                  }
                                  }, this.props.yHeader)
      )
    );
  }
});

module.exports = Chart;
