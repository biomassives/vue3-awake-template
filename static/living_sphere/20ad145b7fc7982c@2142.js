import define1 from "./c1d870d0b90f6537@181.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./d422dd0a1d5ee8b8@231.js";

function _1(md){return(
md`# Nearest Neighbor Particles on a Sphere`
)}

function* _canvas(DOM,width,height,d3,projection,options,$0,$1,$2,$3,drag,n,positions,normalizeLongitude,velocities,normalizeLatitude,randomPoint,getCoords,$4,getDelaunayMesh,getVoronoiMesh,getNearestNeighborMesh)
{
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context).pointRadius(d => 2);

  function render() { 
    context.clearRect(0, 0, width, height);
    if (options.includes("rotate")) {
      var rotation = projection.rotate()
      projection.rotate([rotation[0] + 0.1,rotation[1],rotation[2]])
    }

    if (options.includes("graticule")) {
      context.beginPath()
      path(d3.geoGraticule10())
      context.lineWidth = 0.25;
      context.strokeStyle = "#ccc";
      context.stroke();
    }
    
    if (options.includes("points")) {
      context.beginPath();
      path({
        type: "MultiPoint",
        coordinates: $0.value
      });
      context.fill();
    }
    if (options.includes("delaunay")) {
      context.beginPath();
      path($1.value);
      context.lineWidth = 0.2;
      context.strokeStyle = "blue";
      context.stroke();
    }
    
    if (options.includes("voronoi")) {
      context.beginPath();
      path($2.value);
      context.lineWidth = 0.4;
      context.strokeStyle = "purple";
      context.stroke();
    }
    
    if (options.includes("neighbors")) {
      context.beginPath();
      path($3.value);
      context.lineWidth = 1;
      context.strokeStyle = "red";
      context.stroke();
    }
  }
  
  function dragged() {
    render();
  }
  
  while(true) {
    yield d3
      .select(context.canvas)
      .call(drag(projection).on("drag.render", dragged))
      .call(render)
      .node();
    
    for (let i = 0; i < n; i++) {
      // grab lon & lat, increment with little velocity vector, & ensure proper range for each
      const a = 2 * i; 
      const b = a + 1; 
      positions[a] = normalizeLongitude(positions[a] + velocities[a])
      positions[b] = normalizeLatitude(positions[b] + velocities[b]) 
      // grab an extra random point, interpolate a slerp baby-step towards it
      const random = randomPoint()
      const localRandom = d3.geoInterpolate([positions[a], positions[b]], random)(1/360) 
      // get slerp baby-step increments
      let diffA = normalizeLongitude(localRandom[0] - positions[a])
      let diffB = normalizeLatitude(localRandom[1] - positions[b])
      // increment velocity vectors with lightly weighted contribution from slerp baby-step
      velocities[a] = 0.95*velocities[a] + 0.05*diffA;
      velocities[b] = 0.95*velocities[b] + 0.05*diffB;
    }
    $0.value = getCoords()
    $4.value = new d3.geoDelaunay($0.value);
    if(options.includes("delaunay")) $1.value = getDelaunayMesh()
    if(options.includes("voronoi")) $2.value = getVoronoiMesh()
    if(options.includes("neighbors")) $3.value = getNearestNeighborMesh()
  }
}


function _options(checkbox){return(
checkbox({options: ["rotate", "graticule", "points", "neighbors", "delaunay", "voronoi"], value: ["rotate", "graticule", "points", "neighbors"]})
)}

function _n(){return(
400
)}

function _positions(n,randomPoint)
{
  const points = []
  for(let i = 0; i < n; ++i) {
    points.push(randomPoint())
  }
  return Float64Array.from(points.flat())
}


function _velocities(n){return(
new Float64Array(2 * n)
)}

function _coords(getCoords){return(
getCoords()
)}

function _delaunay(d3,$0){return(
new d3.geoDelaunay($0.value)
)}

function _nn_mesh(getNearestNeighborMesh){return(
getNearestNeighborMesh()
)}

function _delaunay_mesh(getDelaunayMesh){return(
getDelaunayMesh()
)}

function _voronoi_mesh(getVoronoiMesh){return(
getVoronoiMesh()
)}

function _sphere(){return(
{type: "Sphere"}
)}

function _height(){return(
480
)}

function _pi(){return(
Math.PI
)}

function _tau(){return(
2 * Math.PI
)}

function _getCoords(positions){return(
function getCoords() {
  let newArray = []
  let copy = [...positions]
  while (copy.length > 0) newArray.push(copy.splice(0, 2));
  return newArray
}
)}

function _getDelaunayMesh($0,$1){return(
function getDelaunayMesh() {
  return ({
  type: "MultiLineString",
  coordinates: $0.value.edges.map(arr => [$1.value[arr[0]],$1.value[arr[1]]])
})
}
)}

function _getVoronoiMesh($0){return(
function getVoronoiMesh() {
  return ({
    type: "MultiLineString",
    coordinates: $0.value.mesh.map(arr => {
      return [
        [$0.value.centers[arr[0]][0], $0.value.centers[arr[0]][1]],
        [$0.value.centers[arr[1]][0], $0.value.centers[arr[1]][1]]
      ]
    })
  })
}
)}

function _getNearestNeighborMesh($0,$1,haversine){return(
function getNearestNeighborMesh() {
  return ({
    type: "MultiLineString",
    coordinates: $0.value.neighbors.map((arr,i) => {
      const lon0 = $1.value[i][0] 
      const lat0 = $1.value[i][1]
      let lon1, lat1;
      let min = Infinity;
      arr.forEach((nbr, j) => {
        const dist = haversine($1.value[i], $1.value[nbr])
        if(dist < min) {
          lon1 = $1.value[nbr][0]
          lat1 = $1.value[nbr][1]
          min = dist;
        }
      })
      return [[lon0,lat0], [lon1, lat1]]
    })
  })
}
)}

function _normalizeLatitude(pi){return(
function normalizeLatitude(num) {
  return 180 * Math.acos(Math.cos(pi*(num + 90)/180))/pi - 90
}
)}

function _normalizeLongitude(pi){return(
function normalizeLongitude(num) {
  return 360 * Math.atan(Math.tan(pi*num/360))/pi
}
)}

function _haversine(){return(
function haversine([lon0,lat0], [lon1,lat1]) {
  let toRad  = t => t * Math.PI/180;
  const r = 1;
  // *fixed* 02/18/2023
  // const a = Math.sin(toRad(lat1-lat0)/2)**2+Math.cos(toRad(lat0))**2*Math.sin(toRad(lon1-lon0)/2)**2;
  const a = Math.sin(toRad(lat1-lat0)/2)**2+Math.cos(toRad(lat0))*Math.cos(toRad(lat1))*Math.sin(toRad(lon1-lon0)/2)**2;
  return 2 * r * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}
)}

function _projection(d3,width,height,sphere){return(
d3
  .geoOrthographic()
  .fitExtent([[2, 2], [width - 2, height - 2]], sphere)
  .rotate([0,-30,-30])
)}

function _d3(require){return(
require("d3@6", "d3-geo-voronoi@1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","d3","projection","options","mutable coords","mutable delaunay_mesh","mutable voronoi_mesh","mutable nn_mesh","drag","n","positions","normalizeLongitude","velocities","normalizeLatitude","randomPoint","getCoords","mutable delaunay","getDelaunayMesh","getVoronoiMesh","getNearestNeighborMesh"], _canvas);
  main.variable(observer("viewof options")).define("viewof options", ["checkbox"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("n")).define("n", _n);
  main.variable(observer("positions")).define("positions", ["n","randomPoint"], _positions);
  main.variable(observer("velocities")).define("velocities", ["n"], _velocities);
  main.define("initial coords", ["getCoords"], _coords);
  main.variable(observer("mutable coords")).define("mutable coords", ["Mutable", "initial coords"], (M, _) => new M(_));
  main.variable(observer("coords")).define("coords", ["mutable coords"], _ => _.generator);
  main.define("initial delaunay", ["d3","mutable coords"], _delaunay);
  main.variable(observer("mutable delaunay")).define("mutable delaunay", ["Mutable", "initial delaunay"], (M, _) => new M(_));
  main.variable(observer("delaunay")).define("delaunay", ["mutable delaunay"], _ => _.generator);
  main.define("initial nn_mesh", ["getNearestNeighborMesh"], _nn_mesh);
  main.variable(observer("mutable nn_mesh")).define("mutable nn_mesh", ["Mutable", "initial nn_mesh"], (M, _) => new M(_));
  main.variable(observer("nn_mesh")).define("nn_mesh", ["mutable nn_mesh"], _ => _.generator);
  main.define("initial delaunay_mesh", ["getDelaunayMesh"], _delaunay_mesh);
  main.variable(observer("mutable delaunay_mesh")).define("mutable delaunay_mesh", ["Mutable", "initial delaunay_mesh"], (M, _) => new M(_));
  main.variable(observer("delaunay_mesh")).define("delaunay_mesh", ["mutable delaunay_mesh"], _ => _.generator);
  main.define("initial voronoi_mesh", ["getVoronoiMesh"], _voronoi_mesh);
  main.variable(observer("mutable voronoi_mesh")).define("mutable voronoi_mesh", ["Mutable", "initial voronoi_mesh"], (M, _) => new M(_));
  main.variable(observer("voronoi_mesh")).define("voronoi_mesh", ["mutable voronoi_mesh"], _ => _.generator);
  main.variable(observer("sphere")).define("sphere", _sphere);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("pi")).define("pi", _pi);
  main.variable(observer("tau")).define("tau", _tau);
  main.variable(observer("getCoords")).define("getCoords", ["positions"], _getCoords);
  main.variable(observer("getDelaunayMesh")).define("getDelaunayMesh", ["mutable delaunay","mutable coords"], _getDelaunayMesh);
  main.variable(observer("getVoronoiMesh")).define("getVoronoiMesh", ["mutable delaunay"], _getVoronoiMesh);
  main.variable(observer("getNearestNeighborMesh")).define("getNearestNeighborMesh", ["mutable delaunay","mutable coords","haversine"], _getNearestNeighborMesh);
  main.variable(observer("normalizeLatitude")).define("normalizeLatitude", ["pi"], _normalizeLatitude);
  main.variable(observer("normalizeLongitude")).define("normalizeLongitude", ["pi"], _normalizeLongitude);
  main.variable(observer("haversine")).define("haversine", _haversine);
  main.variable(observer("projection")).define("projection", ["d3","width","height","sphere"], _projection);
  const child1 = runtime.module(define1);
  main.import("randomPoint", child1);
  const child2 = runtime.module(define2);
  main.import("checkbox", child2);
  const child3 = runtime.module(define3);
  main.import("drag", child3);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
