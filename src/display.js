const ROLL_RADIUS = 50;

let mainCanvas;
let leftRollCanvas;
let rightRollCanvas;


function setupDisplay(spacing) {
  rollSpacing = spacing || ROLL_SPACING;
  let height = tapeCanvas.height
  leftRollCanvas = document.querySelector('.rollcanvas.left');
  leftRollCanvas.width = ROLL_RADIUS;
  leftRollCanvas.height = height+ROLL_RADIUS;
  rightRollCanvas = document.querySelector('.rollcanvas.right');
  rightRollCanvas.width = ROLL_RADIUS;
  rightRollCanvas.height = height+ROLL_RADIUS;

  mainCanvas = document.getElementById('maincanvas');
  mainCanvas.width = rollSpacing;
  mainCanvas.height = height;

}

function updateDisplay(tapeCanvas, tapePos) {

  let ctx = mainCanvas.getContext('2d');

  displayTape(mainCanvas.getContext('2d'), tapeCanvas, tapePos);
  displayRoll(leftRollCanvas.getContext('2d'), tapeCanvas, tapePos, true);
  displayRoll(rightRollCanvas.getContext('2d'), tapeCanvas, tapePos, false);
}


function displayTape(ctx, tapeCanvas, tapePos){
  clearCanvas(ctx);
  let pos = {...tapePos};
  do {
    ctx.drawImage(tapeCanvas, pos.x, pos.y);
    pos = vsub(pos, v(-tapeCanvas.width, 0))
  } while (pos.x<=mainCanvas.width+tapeCanvas.width);
}


function displayRoll(ctx, tapeCanvas, tapePos, left) {
  clearCanvas(ctx);
  let start = tapePos;
  let r = ctx.canvas.width
    for (var i = 0; i < r; i++) {
      let offset = left ? -r : mainCanvas.width;
      let sx = mod(i-tapePos.x+offset, tapeCanvas.width);
      let y = left ? Math.sqrt(r*r-(i-r)*(i-r)) : Math.sqrt(r*r-(i)*(i));
      ctx.drawImage(tapeCanvas, sx, 0, 1, tapeCanvas.height, i, y, 1, tapeCanvas.height);
    }
}
