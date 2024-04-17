import * as UI from "./interfaz.js";

let bpm = 90;
let beatsPerMeasure = 4;
let count = 0;
let flashSpeed = 150;

function updateMetronome() {
    UI.tempoDisplay.textContent = bpm;
    UI.tempoSlider.value = bpm;
    //myTimer.timeInterval = 60000 / bpm;
  }

function pulseSpeedUpdate() {
  if (bpm <= 80) {
    flashSpeed = 200;
  } else if (bpm > 80 && bpm <= 140) {
    flashSpeed = 150;
  } else {
    flashSpeed = 70;
  }
}

const decreaseTempo = () => {
    if (bpm <= 20) {
        return;
      }
      bpm--;
      updateMetronome();
      pulseSpeedUpdate();
      console.log(`decrease: ${bpm}`);
}

const increaseTempo = () => {
    if (bpm >= 160) {
        return;
      }
      bpm++;
      updateMetronome();
      pulseSpeedUpdate();
      console.log(`increase: ${bpm}`);
}

const tempoSlider = () => {
    bpm = UI.tempoSlider.value;
    updateMetronome();
    pulseSpeedUpdate()
}

export {decreaseTempo,increaseTempo,tempoSlider, bpm, flashSpeed}