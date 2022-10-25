let tapeCanvas;
let patternSquare;

const ROLL_SPACING = 700;
const TAPE_HEIGHT = 500;
const TAPE_WIDTH = 700;

function newTape(width, height){
  tapeCanvas = document.createElement('canvas');
  tapeCanvas.width = width || TAPE_WIDTH;
  tapeCanvas.height = height || TAPE_HEIGHT;
  fillCanvas(tapeCanvas.getContext('2d'));
}

function getTapePos(){
  return vfloor(vscale(v(-tapeCanvas.width, 0), cycle));
}

function drawLine(ctx, a, b) {
  ctx.beginPath();
  c = inputValue('color');
  ctx.strokeStyle = 'rgb('+c+','+c+','+c+')';
  // ctx.strokeStyle = 'black';
  ctx.lineWidth = inputValue('pen');
  ctx.lineCap = "round";
  ctx.moveTo(Math.floor(a.x),Math.floor(a.y));
  ctx.lineTo(Math.floor(b.x),Math.floor(b.y));
  ctx.stroke();
}