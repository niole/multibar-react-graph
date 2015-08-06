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

  getInitialState: function() {
    var bar = new Bars(this.props.width, this.props.height, this.props.data,this.props.numberMap, this.props.scale);
    var legend = new Legend(this.props.titles,this.props.numberMap);

    var tallest_numAttr = bar.get_tallest_numAttr();
    var tallest = tallest_numAttr[0];
    var numAttr = tallest_numAttr[1];

    var width_neg = bar.width_negspace_div(numAttr);
    var ChartObjects = bar.create_data_bars(width_neg, tallest);
    this.bars = bar.create_neg_divs(ChartObjects, width_neg);

    var boxes_titles = legend.build_legend();
    this.DisplayLegend = legend.ul_element(boxes_titles);

    this.yScale = 0;
    if (this.props.scale === null){
      this.yScale = Math.pow(10, (tallest.toString().length-1));
    } else {
      this.yScale = this.props.scale;
    }
    this.pxPerTd = Math.ceil((this.props.height*this.yScale)/tallest);
    return null;

  },
  componentDidMount: function(){
    var y = this.props.height;
    var x = 30;
    var canvas = document.createElement('canvas');
    var numTds = this.props.height/this.pxPerTd;
    var rem = this.props.height%this.pxPerTd;

    canvas.height = this.props.height;
    canvas.width = 30;
    canvas.style.position = "absolute";
    canvas.style.bottom = this.props.height/5;
    canvas.style.left = (this.props.width/5)+x;

    $('.chart-container').append(canvas);
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    for (var h=0; h < numTds; h++){
        var b = 0;
        ctx.moveTo(x,y);
        y -= this.pxPerTd;
        ctx.lineTo(x,y);
        ctx.stroke();

        ctx.moveTo(x,y);
        ctx.lineTo(x-10,y);
        ctx.stroke();
        ctx.font="20px Georgia";
        ctx.fillText((this.yScale*h).toString(),x-10,y);
    }
    ctx.moveTo(x,y);
    ctx.lineTo(x,y-rem);
    ctx.stroke();
  },

  render: function(){

    return (
      React.createElement('div',{},
        this.DisplayLegend,
        React.createElement('div',{
                                  style:{
                                    textAlign: "center",
                                    position: "relative",
                                    display: "inline-block",
                                    width: parseInt(this.props.width)+parseInt(this.props.width/5),
                                    height: parseInt(this.props.height)+parseInt(this.props.height/5)
                                    },
                                  className: "chart-parent"
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
                                      //borderBottom: "1px solid black",
                                      //borderLeft: "1px solid black",
                                      width: this.props.width+"px",
                                      height: this.props.height+"px"
                                    }
                                   },
                                   this.bars
          ),
          React.createElement('div',{
                                  style: {
                                    position: "absolute",
                                    bottom: "7%",
                                    left: "60%"
                                  }
                                  }, this.props.xHeader)
      )
     )
    );
  }
});

module.exports = Chart;
