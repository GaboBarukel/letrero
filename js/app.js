import * as UI from "./interfaz.js";
import Timer from "./timer.js";
import { setLyric,editModeHandler,lyricIteration } from './lyric_handling.js';
import { decreaseTempo,increaseTempo,tempoSlider,bpm,flashSpeed } from "./metronome_control.js";

//METRONOME CONTROL
//let bpm = 90;
//let flashSpeed = 150;
let beatsPerMeasure = 4;
let count = 0;
let activeIndex = 0;

// Increase and Decrease metronome speed btns
UI.decreaseTempoBTN.addEventListener("click", () => {
  decreaseTempo();
  //console.log(`event listener: ${bpm}`)
});
UI.increaseTempoBTN.addEventListener("click", () => {
  increaseTempo();
  //console.log(`event listener: ${bpm}`)
});

//metronome managing slider
UI.tempoSlider.addEventListener("input", () => {
 tempoSlider();
});


//Amount of beats per measure controller(functional)
UI.subtractBeats.addEventListener("click", () => {
  if (beatsPerMeasure <= 2) {
    return;
  }
  cleanPulseDisplay();
  beatsPerMeasure--;
  addPulseDisplay();
  count = 0;
  childrenCount = 1;
  UI.measureCount.innerText = beatsPerMeasure;
});
UI.addBeats.addEventListener("click", () => {
  if (beatsPerMeasure >= 12) {
    return;
  }
  cleanPulseDisplay();
  beatsPerMeasure++;
  addPulseDisplay();
  count = 0;
  childrenCount = 1;
  UI.measureCount.innerText = beatsPerMeasure;
});

//Amount of beats per measure controller(visual display)
function addPulseDisplay() {
  for (let i = 0; i < beatsPerMeasure; i++) {
    let pulseElement = document.createElement("div");
    pulseElement.classList.add("pulse");
    UI.pulseDisplay.appendChild(pulseElement);
  }
}

addPulseDisplay();

const pulseDisplayChildren = UI.pulseDisplay.children;
let childrenCount = 1;

//beat of the measure count function(different color for the first of every measure)
function playMeasureCount() {
  if (count === beatsPerMeasure) {
    count = 0;
    childrenCount = 1;
  }
  if (count === 0) {
    UI.pulseDisplay.firstChild.classList.add("pulse-first");
    childrenCount = 1;
    setTimeout(() => {
      UI.pulseDisplay.firstChild.classList.remove("pulse-first");
    }, flashSpeed);
  } else {
    pulseDisplayChildren[childrenCount].classList.add("pulse-other");
    setTimeout(() => {
      pulseDisplayChildren[childrenCount].classList.remove("pulse-other");
      childrenCount++;
    }, flashSpeed);
  }
  if (count === beatsPerMeasure - 1) {
    activeIndex++;
  }
  count++;
}

function cleanPulseDisplay() {
  while (UI.pulseDisplay.firstChild) {
    UI.pulseDisplay.removeChild(UI.pulseDisplay.firstChild);
  }
}

//TIMER
let isRunning = false;

const myTimer = new Timer(
  () => {
    let lyricUL = UI.lyricResult.children;
    lyricIteration(activeIndex, lyricUL);
    playMeasureCount();
  },
  60000 / bpm,
  { immediate: true }
);

const controlTimer = () => {
  if (!isRunning) {
    myTimer.start();
    isRunning = true;
    UI.metronomeControllerBTN.textContent = "STOP";
  } else {
    myTimer.stop();
    activeIndex = 0;
    count = 0;
    isRunning = false;
    UI.metronomeControllerBTN.textContent = "START";
  }
};

//MAIN EVENT LISTENERS
UI.textForm.addEventListener("submit", setLyric);

UI.editBTN.addEventListener("click", editModeHandler);

UI.metronomeControllerBTN.addEventListener("click", controlTimer);