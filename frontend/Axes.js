"use strict";
var React = require('react');

// actual html5 code
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 100);
    context.lineWidth = 20;
    context.strokeStyle = '#0000ff';
    context.lineCap = 'butt';
    context.stroke();

//for crewating the actual height of the ticks up chart container
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

//for the height and placement of the current axes
  React.createElement('table',{
                                    style:{
                                      height: this.props.height,
                                      position: "relative",
                                      left: (this.props.width*9/56).toString()+"px"
                                      }
                                    },ys)
