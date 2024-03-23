function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Versor dragging</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Versor dragging

See also Jason Davies’ [Rotate the World](https://www.jasondavies.com/maps/rotate/).`
)}

function _projection(Inputs,d3){return(
Inputs.select(new Map([
  ["Orthographic", d3.geoOrthographic().precision(0.1)],
  ["Mercator", d3.geoMercator().precision(0.1)],
  ["Equal Earth", d3.geoEqualEarth().precision(0.1)]]))
)}

function _chart(DOM,width,height,d3,projection,sphere,drag,land110,land50)
{
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);

  function render(land) {
    context.clearRect(0, 0, width, height);
    context.beginPath(), path(sphere), context.fillStyle = "#fff", context.fill();
    context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
    context.beginPath(), path(sphere), context.stroke();
  }

  return d3.select(context.canvas)
    .call(drag(projection)
        .on("drag.render", () => render(land110))
        .on("end.render", () => render(land50)))
    .call(() => render(land50))
    .node();
}


function _drag(d3,versor){return(
function drag(projection) {
  let v0, q0, r0, a0, l;

  function pointer(event, that) {
    const t = d3.pointers(event, that);

    if (t.length !== l) {
      l = t.length;
      if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      dragstarted.apply(that, [event, that]);
    }

    // For multitouch, average positions and compute rotation.
    if (l > 1) {
      const x = d3.mean(t, p => p[0]);
      const y = d3.mean(t, p => p[1]);
      const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      return [x, y, a];
    }

    return t[0];
  }

  function dragstarted({x, y}) {
    v0 = versor.cartesian(projection.invert([x, y]));
    q0 = versor(r0 = projection.rotate());
  }

  function dragged(event) {
    const v1 = versor.cartesian(projection.rotate(r0).invert([event.x, event.y]));
    const delta = versor.delta(v0, v1);
    let q1 = versor.multiply(q0, delta);

    // For multitouch, compose with a rotation around the axis.
    const p = pointer(event, this);
    if (p[2]) {
      const d = (p[2] - a0) / 2;
      const s = -Math.sin(d);
      const c = Math.sign(Math.cos(d));
      q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
    }

    projection.rotate(versor.rotation(q1));

    // In vicinity of the antipode (unstable) of q0, restart.
    if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged);
}
)}

function _height(d3,projection,width,sphere)
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}


function _sphere(){return(
{type: "Sphere"}
)}

function _land50(FileAttachment,topojson){return(
FileAttachment("land-50m.json").json().then(world => topojson.feature(world, world.objects.land))
)}

function _land110(FileAttachment,topojson){return(
FileAttachment("land-110m.json").json().then(world => topojson.feature(world, world.objects.land))
)}

function _versor(require){return(
require("versor@0.2/dist/versor.min.js")
)}

function _note(md){return(
md`---
_Note:_ to understand the code it might be easier to start with this [earlier version](https://observablehq.com/d/569d101dd5bd332b) that did not have to account for multitouch.`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["land-110m.json", {url: new URL("./files/eec657afeffb70691657f56f78ce546cc20861c628c4272d902fb7ff94d07a73737fd5356d255cef2a092de8322c56bbbc4f0f6a3c0c12864101f37ec6da9321.json", import.meta.url), mimeType: "application/json", toString}],
    ["land-50m.json", {url: new URL("./files/efcaaf9f0b260e09b6afeaee6dbc1b91ad45f3328561cd67eb16a1754096c1095f70d284acdc4b004910e89265b60eba2706334e0dc84ded38fd9209083d4cef.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof projection")).define("viewof projection", ["Inputs","d3"], _projection);
  main.variable(observer("projection")).define("projection", ["Generators", "viewof projection"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["DOM","width","height","d3","projection","sphere","drag","land110","land50"], _chart);
  main.variable(observer("drag")).define("drag", ["d3","versor"], _drag);
  main.variable(observer("height")).define("height", ["d3","projection","width","sphere"], _height);
  main.variable(observer("sphere")).define("sphere", _sphere);
  main.variable(observer("land50")).define("land50", ["FileAttachment","topojson"], _land50);
  main.variable(observer("land110")).define("land110", ["FileAttachment","topojson"], _land110);
  main.variable(observer("versor")).define("versor", ["require"], _versor);
  main.variable(observer("note")).define("note", ["md"], _note);
  return main;
}
