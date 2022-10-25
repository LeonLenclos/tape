let wheels, potentiometers;

function setupUI() {
  document.querySelector('button[name=new]').addEventListener('click', ()=>{
    let dialog = openDialog('new',()=>{
      newTape(inputValue('width'), inputValue('height'));
      setupDisplay(inputValue('spacing'));
    });

    function onChange(e){
      if(e){
        e.target.value = Math.min(e.target.value, e.target.max);
        e.target.value = Math.max(e.target.value, e.target.min);
      }
      let c = dialog.querySelector("#sizepreview");
      c.style.setProperty('--w', inputValue('width'))
      c.style.setProperty('--h', inputValue('height'))
      c.style.setProperty('--s', inputValue('spacing'))
      // c.style.width = inputValue('width')/10 + 'px';
      // c.style.height = inputValue('height')/10 + 'px';
    }  
    onChange();
    dialog.querySelectorAll('input').forEach(input=>input.addEventListener('change', onChange))

  })

  document.querySelector('button[name=export]').addEventListener('click', ()=>{
    let dialog = openDialog('export', ()=>{
      exportVid();
      openDialog('loading', undefined, ()=>{
        stopExport();
      })
    });

    function onChange(e){
      let time = inputValue('loop') / cycleSpeed
      let html = '<em>'+inputValue('name')+'.webmv</em> (~'+time.toFixed(1)+'s)';
      dialog.querySelector('#filename').innerHTML = html;
      if(e && e.min){
        e.target.value = Math.min(e.target.value, e.target.max);
        e.target.value = Math.max(e.target.value, e.target.min);
      }
    }  
    onChange();
    dialog.querySelectorAll('input').forEach(input=>input.addEventListener('change', onChange))
    dialog.querySelectorAll('input').forEach(input=>input.addEventListener('input', onChange))

  })

  wheels = document.querySelectorAll('.wheel');
  rangeInputs = document.querySelectorAll('input[type=range]');
  rangeInputs.forEach((el) => {
    let updateRangeInput = () => {
        const end = 180;
        let val = (el.value-el.min)/(el.max-el.min);
        let angle = Math.floor(val*end) ;
        el.style.setProperty("--angle", angle+'deg');
    };
    updateRangeInput();
    el.addEventListener('change', updateRangeInput);
    el.addEventListener('input', updateRangeInput);

  });
}


function closeDialogs(){
  let popups = document.querySelector('#popups');
  let dialogs = document.querySelectorAll('.popup');
  popups.style.display = 'none';
  dialogs.forEach(popup=>popup.style.display='none');
}

function openDialog(name, onOk, onCancel){
  onOk = onOk || (()=>{});
  onCancel = onCancel || (()=>{});
  let popups = document.querySelector('#popups');
  let popup = document.querySelector('#'+name+'dialog');
  popups.style.display = 'flex';
  popup.style.display = 'flex';
  let ok = popup.querySelector('button[name=ok]');
  let cancel = popup.querySelector('button[name=cancel]');
  if(cancel){
    cancel.addEventListener('click', ()=>{
      closeDialogs();
      onCancel();
    });
  }
  if(ok){
    ok.addEventListener('click', ()=>{
      closeDialogs();
      onOk();
    });
  };
  return popup;
}

function inputValue(name){
  return document.querySelector('input[name='+name+']').value
}


function updateUI() {
  wheels.forEach((wheel) => {
    let deg = lerp(0,360, cycle); //tapeCanvas.width/permimeter
    wheel.style.transform = 'rotate('+Math.floor(deg)+'deg)'
  });
  let ctx = document.querySelector('#pencanvas').getContext('2d');

  clearCanvas(ctx);
  drawLine(ctx, v(25,25), v(125, 25));
}
