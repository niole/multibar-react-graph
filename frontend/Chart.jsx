"use strict";

var React = require('react/addons');
var Legend = require('./Legend');
var Bars = require('./Bars');

var Chart = React.createClass({
  getDefaultProps: function() {
    return {
      numberMap: {0:"zero",1:"one",2:"two",
                  3:"three",4:"four",5:"five",
                  6:"six",7:"seven",8:"eight",
                  9:"nine",10:"ten"},
      scale: null,
    };

  },

  propTypes: {
    titles: React.PropTypes.array,
    xHeader: React.PropTypes.string,
    yHeader: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    scale: React.PropTypes.number
  },

  render: function(){
    var bar = new Bars(this.props.width, this.props.height, this.props.data,this.props.numberMap, this.props.scale);
    var legend = new Legend(this.props.titles,this.props.numberMap);

    var tallest_numAttr = bar.get_tallest_numAttr();
    var tallest = tallest_numAttr[0];
    var numAttr = tallest_numAttr[1];

    var width_neg = bar.width_negspace_div(numAttr);
    var ChartObjects = bar.create_data_bars(width_neg, tallest);
    var bars = bar.create_neg_divs(ChartObjects, width_neg);

    var boxes_titles = legend.build_legend();
    var DisplayLegend = legend.ul_element(boxes_titles);


    var yScale = 0;

    if (this.props.scale === null){
      yScale = Math.pow(10, (tallest.toString().length-1));
    } else {
      yScale = this.props.scale;
    }

    var numTds = Math.floor(tallest/yScale);
    var pxPerTd = (this.props.height*yScale)/tallest;

    var ys = [];
    for (var i=2; i<numTds; i++){
      ys.push(React.createElement('tr', {
                                        style: {
                                          width: "10px",
                                          height: pxPerTd-5,
                                        }
                                        },
                                  React.createElement('td',{
                                                            style: {
                                                              width: "10px",
                                                              height: pxPerTd-5,
                                                              borderTop: "1px solid black",
                                                              textAlign: "left"
                                                             }
                                                            },
                                                            (numTds-i)*yScale
                                                      )
                                 )
               );
    }



    return (
      React.createElement('div',{},
        DisplayLegend,
        React.createElement('div',{
                                  style:{
                                    textAlign: "center",
                                    position: "relative",
                                    display: "inline-block",
                                    width: parseInt(this.props.width)+parseInt(this.props.width/5),
                                    height: parseInt(this.props.height)+parseInt(this.props.height/5)
                                    },
                                  },
          React.createElement('div',{
                                    style: {
                                      left: 0,
                                      bottom: "50%",
                                      position: "absolute",
                                      top: "50%",
                                      webkitTransform: 'rotate(90deg)',
                                      mozTransform: 'rotate(90deg)',
                                      msTransform: 'rotate(90deg)',
                                      oTransform: 'rotate(90deg)',
                                      transform: 'rotate(90deg)'
                                    }
                                    }, this.props.yHeader),

          React.createElement('div',{
                className: "chart-container",
                style: {
                  float: "right",
                  borderBottom: "1px solid black",
                  borderLeft: "1px solid black",
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
                                    left: "60%"
                                  }
                                  }, this.props.xHeader),
        React.createElement('table',{
                                    style:{
                                      height: this.props.height,
                                      position: "relative",
                                      left: (this.props.width*9/56).toString()+"px"
                                      }
                                    },ys)
      )
     )
    );
  }
});

module.exports = Chart;
