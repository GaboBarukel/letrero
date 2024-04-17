import * as UI from "./interfaz.js";

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

  export {setLyric,editModeHandler,lyricIteration}