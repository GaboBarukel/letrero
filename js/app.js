import * as UI from "./interfaz.js";

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

UI.formularioText.addEventListener("submit", armarCancion);
