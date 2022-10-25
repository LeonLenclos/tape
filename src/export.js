let capturer;
let exportCycleTime;
let chunks;

function setupExport() {
  capturer = undefined;
  exportCycleTime = undefined;
}

function updateExport(dt) {
  if(capturer){
    exportCycleTime += cycleSpeed*dt;
    const end = 360;
    let loop = inputValue('loop');
    let val = exportCycleTime/loop;
    let angle = Math.floor(val*end) ;
    document.querySelector('.progress').style.setProperty("--angle", angle+'deg');
    if (exportCycleTime >= loop) {
      capturer.stop();
      capturer = undefined;
      closeDialogs();
    }
  }
}


function downloadURI(name, uri) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function stopExport(){
  if(capturer){
    capturer.onstop = undefined;
    capturer.stop();
  }
}

function exportVid() {
  chunks = []; // here we will store our recorded media chunks (Blobs)
  const stream = mainCanvas.captureStream(); // grab our canvas MediaStream
  const rec = new MediaRecorder(stream); // init the recorder
  // every time the recorder has new data, we will store it in our array
  rec.ondataavailable = e => chunks.push(e.data);
  // only when the recorder stops, we construct a complete Blob from all the chunks
  rec.onstop = e => {
    let name = inputValue('name');
    if(!name || name.length<1){name = 'untitled'}
    let blob = new Blob(chunks, {type: 'video/webm'})
    downloadURI(name+'.webm', URL.createObjectURL(blob));
  }
  rec.start();
  exportCycleTime = 0;
  capturer = rec;
}
