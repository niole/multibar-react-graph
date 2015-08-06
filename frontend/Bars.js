"use strict";

var React = require('react');

//builds bars and sends them back to Charts.jsx ready to go into the chart container

function Bars(width, height, data, numberMap, scale){
  this.width = width;
  this.data = data;
  this.height = height;
  this.numberMap = numberMap;
  this.scale = scale;
}

Bars.prototype.get_tallest_numAttr = function(){
  var tallest = 0;
  var numAttr = 0;
  this.data.forEach(function(d) {
    numAttr = 0;
    for (var key in d){
      numAttr += 1;
      if (d[key] >= tallest){
        tallest = d[key];
      }
    }
  });
  return [tallest, numAttr];
};

Bars.prototype.width_negspace_div = function(numAttr){
  return (this.width/numAttr);
};

Bars.prototype.create_data_bars = function(width_neg, tallest){
  var ChartObjects = {};
  var offset = ((width_neg*9)/10)/this.data.length;
  this.data.forEach(function(entity,i){
    var height_bar = 0;
    for (var k in entity){
      height_bar = (entity[k]*(this.height/tallest)).toString();
      var bar = React.createElement('div',{
                                           style: {
                                             bottom: 0,
                                             right: 0 + offset*i,
                                             width: offset,
                                             height: height_bar+"px",
                                             position: "absolute"
                                                  },
                                           className: this.numberMap[i]
                                          }
                                   );
      if (k in ChartObjects){
        ChartObjects[k].push(bar);
      } else {
        ChartObjects[k] = [bar];
      }
    }
  }.bind(this));
  return ChartObjects;
};

Bars.prototype.create_neg_divs = function(ChartObjects, width_neg){
  var bars = [];
  for (var k in ChartObjects){
    bars.push(React.createElement('div',{
                                         style: {
                                            zIndex: 0,
                                            backgroundColor: "white",
                                            width: width_neg,
                                            height: this.height,
                                            float: "right",
                                            position: "relative"
                                          },
                                        className: "negative-space"
                                        },
                                        ChartObjects[k]
                                 )
              );
  }
  return bars;
};

module.exports = Bars;
