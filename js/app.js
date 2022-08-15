import * as UI from "./interfaz.js";
import Timer from "./timer.js";

//METRONOME CONTROL
let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let flashSpeed = 150;
let countDown = true;
let activeIndex = 0;
// let playState = false;

UI.decreaseTempoBTN.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  updateMetronome();
  pulseSpeedUpdate();
});
UI.increaseTempoBTN.addEventListener("click", () => {
  if (bpm >= 160) {
    return;
  }
  bpm++;
  updateMetronome();
  pulseSpeedUpdate();
});

UI.tempoSlider.addEventListener("input", () => {
  bpm = UI.tempoSlider.value;
  updateMetronome();
  pulseSpeedUpdate();
});

UI.countDownControllerBTN.addEventListener("click", () => {
  if (countDown) {
    countDown = false;
    UI.countDownControllerBTN.textContent = "No CountDown";
  } else {
    countDown = true;
    UI.countDownControllerBTN.textContent = "CountDown";
  }
});

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

function pulseSpeedUpdate() {
  if (bpm <= 80) {
    flashSpeed = 200;
  } else if (bpm > 80 && bpm <= 140) {
    flashSpeed = 150;
  } else {
    flashSpeed = 70;
  }
}

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

function updateMetronome() {
  UI.tempoDisplay.textContent = bpm;
  UI.tempoSlider.value = bpm;
  myTimer.timeInterval = 60000 / bpm;
}

function cleanPulseDisplay() {
  while (UI.pulseDisplay.firstChild) {
    UI.pulseDisplay.removeChild(UI.pulseDisplay.firstChild);
  }
}

//LYRIC HANDLING
const setLyric = (e) => {
  e.preventDefault();

  const letra = document.querySelector("#lyric-area").value;
  const lyrArr = document.querySelector("#lyric-area").value.split("\n");
  cleanLyric();
  if (letra === "") {
    UI.errorMessage.textContent = "Error.. no hay letra..";
    UI.errorMessage.classList.add("error");
    setTimeout(() => {
      UI.errorMessage.textContent = "";
      UI.errorMessage.classList.remove("error");
    }, 3000);

    return;
  }

  makeLyricUL(lyrArr);
};

const cleanLyric = () => {
  while (UI.lyricResult.firstChild) {
    UI.lyricResult.removeChild(UI.lyricResult.firstChild);
  }
};

const makeLyricUL = (lineas) => {
  UI.textDisplay.classList.remove("edit");
  UI.textDisplay.classList.add("play");
  UI.formContainer.classList.add("play");
  if (countDown) {
    let liElement = document.createElement("li");
    liElement.classList.add("estilo-li");

    let br = document.createElement("br");
    liElement.appendChild(br);
    UI.lyricResult.appendChild(liElement);
  }
  lineas.forEach((linea) => {
    let liElement = document.createElement("li");

    liElement.classList.add("estilo-li");

    if (linea === "") {
      let br = document.createElement("br");
      liElement.appendChild(br);
    } else {
      liElement.innerText = `${linea}`;
    }
    UI.lyricResult.appendChild(liElement);
  });
};

const editModeHandler = () => {
  UI.textDisplay.classList.remove("play");
  UI.textDisplay.classList.add("edit");
  UI.formContainer.classList.remove("play");
};

const lyricIteration = (activeIndex, lyricUL) => {
  if (activeIndex < lyricUL.length) {
    lyricUL[activeIndex].classList.add("active");
    if (activeIndex >= 1) {
      lyricUL[activeIndex - 1].classList.remove("active");
    }
  }
  if (activeIndex < lyricUL.length) {
    lyricUL[activeIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }
};

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
