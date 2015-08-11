"use strict";
var React = require('react');

//takes titles and number map, returns legend as react element

function Legend(titles,numberMap){
  this.titles = titles;
  this.numberMap = numberMap;
}

Legend.prototype.build_legend = function(font, size){
  var boxes_titles = [];
  this.titles.forEach(function(c,i){
    boxes_titles.push(
      React.createElement('tr',{},
        React.createElement('td',{
                                  style: {
                                          width: "10px",
                                          height: "10px",
                                          },
                                  className: this.numberMap[i]
                                 },
          React.createElement('td',{
                                    style: {
                                      width: "100%",
                                      float: "right",
                                      fontFamily: font,
                                      fontSize: size,
                                            }
                                    },
                                    this.titles[i])
                           )
                         )
                     );
  }.bind(this));
  return boxes_titles;
};

Legend.prototype.ul_element = function(list_elts){
  return (
    React.createElement('table',{
                                className: "legend-table",
                                style: {
                                       float: "left"
                                       }
                                },
        React.createElement('tbody',{},
                                    list_elts)
                       )
         );
};

module.exports = Legend;
