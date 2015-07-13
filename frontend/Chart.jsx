"use strict";

var React = require('react/addons');

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
    //var barW = (this.props.width/Object.keys(this.props.data[0]).length).toString();
    var tallest = 0;
    var numAttr = 0;
    this.props.data.forEach( function(d) {
      numAttr = 0;
      for (var key in d){
        numAttr += 1;
        if (d[key] >= tallest){
          tallest += d[key];
        }
      }
    });
    //if more than one data entity being graphed
    var NSDW = this.props.width/numAttr;

    // ChartSectionsObjs = {attr: [ReactElements]},...}

    var ChartSectionObjs = {};

    /*create for loop for inner divs to append to parent neg space div*/
    this.props.data.forEach(function(entity,i){
      var offset = ((NSDW*9)/10)/this.props.data.length;
      var height = 0;
      for (var k in entity){
        height = ((this.props.height*entity[k])/tallest).toString();

        var bar = React.createElement('div',{
                                             style: {
                                               bottom: 0,
                                               right: 0 + offset*i,
                                               width: offset,
                                               height: height,
                                               position: "absolute"
                                             },
                                             className: this.props.numberMap[i]
                                            });
        if (k in ChartSectionObjs){
          ChartSectionObjs[k].push(bar);
        } else {
          ChartSectionObjs[k] = [bar];
        }
      }
    }.bind(this));

    // when finished building ChartSectionObjs, place attr.bars as children of a negspacediv, and place array of negspacedivs as children of graph container
    for (var k in ChartSectionObjs){
          bars.push( React.createElement('div',{
                                                      style: {
                                                        backgroundColor: "white",
                                                        width: NSDW,
                                                        height: this.props.height,
                                                        float: "right",
                                                        position: "relative"
                                                      },
                                                      className: "negative-space"
                                                      },
                                                      ChartSectionObjs[k]
                                               )
                           );
    }

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
