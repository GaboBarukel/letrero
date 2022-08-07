import * as UI from "./interfaz.js";
import Timer from "./timer.js";

//CONTROL DEL METRÓNOMO
let bpm = 140;

UI.decreaseTempoBTN.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  updateMetronome();
});
UI.increaseTempoBTN.addEventListener("click", () => {
  if (bpm >= 280) {
    return;
  }
  bpm++;
  updateMetronome();
});

UI.tempoSlider.addEventListener("input", () => {
  bpm = UI.tempoSlider.value;
  updateMetronome();
});

function updateMetronome() {
  UI.tempoDisplay.textContent = bpm;
  UI.tempoSlider.value = bpm;
  myTimer.timeInterval = 60000 / bpm;
}

//MANEJO DE LA LETRA
const armarCancion = (e) => {
  e.preventDefault();

  const letra = document.querySelector("#lyric_area").value;
  // Arreglo de letra
  const lyrArr = document.querySelector("#lyric_area").value.split("\n");
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

let activeIndex = 0;

//TIMER
let isRunning = false;

const myTimer = new Timer(
  () => {
    let lyricUL = UI.headingResultado.children;
    lyricIteration(activeIndex, lyricUL);
    activeIndex++;
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
    isRunning = false;
    UI.metronomeControllerBTN.textContent = "START";
  }
};

UI.formularioText.addEventListener("submit", armarCancion);

UI.metronomeControllerBTN.addEventListener("click", controlTimer);
