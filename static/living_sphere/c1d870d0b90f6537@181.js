// https://observablehq.com/@mbostock/random-points-on-a-sphere@181
function _1(md){return(
md`# Random Points on a Sphere

Ref. [MathWorld](http://mathworld.wolfram.com/SpherePointPicking.html), [Jason Davies](https://www.jasondavies.com/maps/random-points/)`
)}

function _2(md){return(
md`## Corrected`
)}

function _3(chart,randomPoint){return(
chart(randomPoint)
)}

function _randomPoint(){return(
function randomPoint() {
  return [
    (Math.random() * 2 - 1) * 180,
    Math.asin(Math.random() * 2 - 1) / Math.PI * 180,
  ];
}
)}

function _5(md){return(
md`## Uncorrected`
)}

function _6(chart,randomPointUncorrected){return(
chart(randomPointUncorrected)
)}

function _randomPointUncorrected(){return(
function randomPointUncorrected() {
  return [
    (Math.random() * 2 - 1) * 180,
    (Math.random() * 2 - 1) * 90
  ];
}
)}

function _8(md){return(
md`---

## Appendix`
)}

function _chart(DOM,width,height,d3,projection,graticule,sphere){return(
function* chart(randomPoint) {
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context).pointRadius(0.75);
  context.beginPath();
  path(graticule);
  context.strokeStyle = "#ccc";
  context.stroke();
  context.beginPath();
  path(sphere);
  context.strokeStyle = "#000";
  context.lineWidth = 1.5;
  context.stroke();
  context.globalAlpha = 0.5;
  for (let i = 0; i < 3e5; ++i) {
    context.beginPath();
    path({type: "Point", coordinates: randomPoint()});
    context.fill();
    if (i % 1000 === 0) yield context.canvas;
  }
}
)}

function _projection(d3,width,height,sphere){return(
d3.geoOrthographic()
    .fitExtent([[1, 1], [width - 1, height - 1]], sphere)
    .rotate([0, -30])
    .precision(0.1)
)}

function _height(){return(
640
)}

function _sphere(){return(
{type: "Sphere"}
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["chart","randomPoint"], _3);
  main.variable(observer("randomPoint")).define("randomPoint", _randomPoint);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["chart","randomPointUncorrected"], _6);
  main.variable(observer("randomPointUncorrected")).define("randomPointUncorrected", _randomPointUncorrected);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("chart")).define("chart", ["DOM","width","height","d3","projection","graticule","sphere"], _chart);
  main.variable(observer("projection")).define("projection", ["d3","width","height","sphere"], _projection);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("sphere")).define("sphere", _sphere);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
