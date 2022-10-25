let _mouseState = {};
let prevMouseState = {};
let firstMouseState = {};
let firstTapePos = {};



function setupMouse(){
  mainCanvas.addEventListener('mousedown', (event) => {
    storeMousePos(event);
    _mouseState.down = true;
  });

  window.addEventListener('mousemove', (event) => {
    storeMousePos(event);
  });

  window.addEventListener('mouseup', (event) => {
    storeMousePos(event);
    _mouseState.down = false;
  });
}

function storeMousePos(event) {
  let rect = mainCanvas.getBoundingClientRect();
  let x = event.clientX-rect.left;
  let y = event.clientY-rect.top;
  _mouseState.pos = v(x,y);
}


function getMouseState(tapePos, dt) {

  if (mouseJustClicked()) {
    firstTapePos = {...tapePos};
  }
  else {
    firstTapePos = vadd(firstTapePos,vscale(v(-tapeCanvas.width, 0), cycleSpeed*dt));
  }
  if(_mouseState.pos){
    let pos = vsub(_mouseState.pos, firstTapePos);
    _mouseState.posOnTape = v(pos.x%tapeCanvas.width, pos.y);
    _mouseState.tapeInstance = Math.floor(pos.x/tapeCanvas.width);
  }
  return _mouseState;
}

function mouseJustClicked() {
  return _mouseState.down && !prevMouseState.down;
}

function mousePressed(){
  return _mouseState.down && prevMouseState.down
  && _mouseState.pos
  && posInsideCanvas(_mouseState.pos, mainCanvas);
}
