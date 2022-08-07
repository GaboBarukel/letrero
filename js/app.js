import * as UI from "./interfaz.js";
import Timer from "./timer.js";

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

    // ADD ACTIVE CLASS TO FIRST
    // if (lineas.indexOf(linea) === 0) {
    //   liElement.classList.add("active");
    // } else {
    //   liElement.classList.add("estilo-li");
    // }

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

const lyricIteration = (activeIndex, lyricUL) => {
  if (activeIndex < lyricUL.length) {
    lyricUL[activeIndex].classList.add("active");
    if (activeIndex >= 1) {
      lyricUL[activeIndex - 1].classList.remove("active");
    }
  }
};

let activeIndex = 0;

const myTimer = new Timer(
  () => {
    let lyricUL = UI.headingResultado.children;
    lyricIteration(activeIndex, lyricUL);
    activeIndex++;
  },
  500,
  () => {
    console.log("ERROR!!");
  }
);

const startTimer = () => {
  myTimer.start();
};

const stopTimer = () => {
  myTimer.stop();
  activeIndex = 0;
};

UI.formularioText.addEventListener("submit", armarCancion);

UI.playBTN.addEventListener("click", startTimer);

UI.stopBTN.addEventListener("click", stopTimer);
