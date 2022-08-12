import * as UI from "./interfaz.js";
import Timer from "./timer.js";

//CONTROL DEL METRÓNOMO
let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let flashSpeed = 150;
let countDown = true;
let activeIndex = 0;

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
  UI.measureCount.innerText = beatsPerMeasure;
});
UI.addBeats.addEventListener("click", () => {
  if (beatsPerMeasure >= 12) {
    return;
  }
  cleanPulseDisplay();
  beatsPerMeasure++;
  addPulseDisplay();
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
  console.log(childrenCount);
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

//MANEJO DE LA LETRA
const armarCancion = (e) => {
  e.preventDefault();

  const letra = document.querySelector("#lyric-area").value;
  // Arreglo de letra
  const lyrArr = document.querySelector("#lyric-area").value.split("\n");
  limpiarLetra();
  if (letra === "") {
    UI.divMensajes.textContent = "Error.. no hay letra..";
    UI.divMensajes.classList.add("error");

    setTimeout(() => {
      UI.divMensajes.textContent = "";
      UI.divMensajes.classList.remove("error");
    }, 3000);

    return;
  }

  llenarLetra(lyrArr);
};

const limpiarLetra = () => {
  while (UI.headingResultado.firstChild) {
    UI.headingResultado.removeChild(UI.headingResultado.firstChild);
  }
};

const llenarLetra = (lineas) => {
  if (countDown) {
    let liElement = document.createElement("li");
    liElement.classList.add("estilo-li");

    let br = document.createElement("br");
    liElement.appendChild(br);
    UI.headingResultado.appendChild(liElement);
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
    UI.headingResultado.appendChild(liElement);
  });
};

//ITERACIÓN DE LA LETRA
const lyricIteration = (activeIndex, lyricUL) => {
  if (activeIndex < lyricUL.length) {
    lyricUL[activeIndex].classList.add("active");
    if (activeIndex >= 1) {
      lyricUL[activeIndex - 1].classList.remove("active");
    }
  }
};

//TIMER
let isRunning = false;

const myTimer = new Timer(
  () => {
    let lyricUL = UI.headingResultado.children;
    lyricIteration(activeIndex, lyricUL);
    playMeasureCount();
  },
  60000 / bpm,
  { immediate: true }
);

//TIMER
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

UI.formularioText.addEventListener("submit", armarCancion);

UI.metronomeControllerBTN.addEventListener("click", controlTimer);
