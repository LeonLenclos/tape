function lerp(a, b, t) {
  return a+(b-a)*t;
}

function mod(n, m){
  return(n % m + m) % m;
}

function v(x,y){
  return {x:x,y:y};
}

function vadd(a, b){
  return {x:a.x+b.x,y:a.y+b.y};
}

function vsub(a, b){
  return {x:a.x-b.x,y:a.y-b.y};
}

function vscale(v, s){
  return {x:v.x*s,y:v.y*s};
}

function vfloor(v){
  return {x:Math.floor(v.x), y:Math.floor(v.y)};
}

function posInsideCanvas(pos, canvas) {
  return pos.x > 0 && pos.y > 0 && pos.x < canvas.width && pos.y < canvas.height;
}

function vinside(a, b) {
  return a.x > 0 && a.y > 0 && a.x < b.x && a.y < b.y;
}
