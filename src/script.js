let cycleSpeed = 0.1; // turn per sec
let cycle = 0;

function setup() {
  newTape();
  setupDisplay();
  setupUI();
  setupMouse();
  setupExport();
}


function loop(dt) {
  // Move the tape
  cycleSpeed = inputValue('speed');
  cycle = mod(cycle+cycleSpeed*dt,1);
  let tapePos = getTapePos();
  let mouseState = getMouseState(tapePos, dt);

  if(mousePressed()){
      let tapeInstanceDiff = mouseState.tapeInstance-prevMouseState.tapeInstance
      let a = prevMouseState.posOnTape;
      let b = vadd(mouseState.posOnTape, vscale(v(-tapeCanvas.width, 0), -tapeInstanceDiff));
      let direction = vscale(v(-tapeCanvas.width, 0), Math.sign(tapeInstanceDiff)||1)
      a = vsub(a, direction);
      b = vsub(b, direction);
      do {
        drawLine(tapeCanvas.getContext('2d'), a, b);
        a = vadd(a, direction);
        b = vadd(b, direction);
      } while ((a.x>0 && a.x<mainCanvas.width)||(b.x>0 && b.x<mainCanvas.width));
      drawLine(tapeCanvas.getContext('2d'), a, b);
  
    }

  prevMouseState = {...mouseState};
  updateDisplay(tapeCanvas, tapePos);
  updateUI();
  updateExport(dt);
}

function fillCanvas(ctx){
  ctx.fillStyle = 'ghostwhite';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function clearCanvas(ctx){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

window.addEventListener('load', (event) => {
    setup();
    let lastTimeStamp = undefined;
    let _loop = (timeStamp) => {
      let deltaTime = timeStamp - (lastTimeStamp||timeStamp);
      deltaTime /= 1000;
      lastTimeStamp = timeStamp;
      loop(deltaTime);
      requestAnimationFrame(_loop);
    };
    requestAnimationFrame(_loop);
});
