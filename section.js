//BARRA LATERAL MOVIMIENTO

document.addEventListener("DOMContentLoaded", function() {
    const listaButton = document.querySelector(".lista");
    const sidebar = document.querySelector(".sidebar");

    listaButton.addEventListener("click", function() {
        sidebar.classList.toggle("visible");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const listaButton = document.querySelector(".lista");
    const body = document.querySelector("body");

    listaButton.addEventListener("click", function() {
        body.classList.toggle("visible");
    });
});

//ROTACION IMAGEN 

const imagen = document.querySelector('.imagen');
let rotation = 0;
let isRotating = false;

function rotateImage() {
    rotation += 1;
    imagen.style.transform = `rotate(${rotation}deg)`;
    if (isRotating) {
      requestAnimationFrame(rotateImage);
    }
  }
  
  document.getElementById('play').addEventListener('click', () => {
    isRotating = !isRotating;
    if (isRotating) {
      rotateImage();
    }
  });


document.getElementById('play').addEventListener('click', function() {
    const imagen = document.getElementById('play');
    if (imagen.src.match("jugar-buttton.png")) {
      imagen.src = "img/boton-de-pausa.png";
    } else {
      imagen.src = "img/jugar-buttton.png";
    }
  });

//REPRODUCIR AUDIO
document.addEventListener('DOMContentLoaded', () => { 
  let tiempo = document.getElementById('tiempo');
  let tiempoTotal = document.getElementById('tiempoTotal');
  let songs = ['music/Without You.mp3', 'music/always.mp3', 'music/desde mi cielo.mp3', 'music/dont cry.mp3', 'music/Proyecto x.mp3', 'music/pensando_en_ella.mp3'];
  let songInfo = [
    {
      image: 'img/without you.jpg',
      title: 'Avicii - Without You “Audio” ft. Sandro Cavazza'
    },
    {
      image: 'img/always.jpg',
      title: 'Bon Jovi - Always'
    },
    {
      image: 'img/desde mi cielo.jpg',
      title: 'Mago de Oz - Desde mi cielo'
    },
    {
      image: 'img/guns N´ Roses.jpg',
      title: 'Bon Jovi - Dont Cry'
    },
    {
      image: 'img/proyecto x.jfif',
      title: 'Pursuit Of Happiness - Projecto X'
    },
    {
      image: 'img/sofi.jfif',
      title: 'Canserbero - Pensando en ti'
    }
  ];
  
  let currentSongIndex = 0;
  let sound = new Audio(songs[currentSongIndex]);
  let imageElement = document.querySelector('.imagen');
  let titleElement = document.querySelector('.titulo');

  
  document.getElementById('play').addEventListener('click', ()=>{ // funcionalidad de los iconos reproducir y pausar
    if (sound.paused) {
      sound.play();
    } else {
      sound.pause();
    }
  });

  const seekBar = document.getElementById('control');

  sound.addEventListener('ended', () => { // funcion para cuando la cnacion se acaba pasar directamente a la siguiente
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    sound.src = songs[currentSongIndex];
    sound.play();
    imageElement.src = songInfo[currentSongIndex].image;
    titleElement.textContent = songInfo[currentSongIndex].title;
    seekBar.value = 0;

  });

  document.getElementById('anterior').addEventListener('click', () => {
    const wasPlaying = !sound.paused; // Verifica si la canción estaba sonando
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    sound.src = songs[currentSongIndex];
    if (wasPlaying) { // condicional para determinar si sound.pause = pasar cancion pero no reproducir, de lo contrario reproducir
      imageElement.src = songInfo[currentSongIndex].image;
      titleElement.textContent = songInfo[currentSongIndex].title;
      sound.play();
      seekBar.value = 0;
    } else {
      imageElement.src = songInfo[currentSongIndex].image;
      titleElement.textContent = songInfo[currentSongIndex].title;
      seekBar.value = 0;
    }
  });

  document.getElementById('siguiente').addEventListener('click', () => {
    const wasPlaying = !sound.paused; 
    currentSongIndex = (currentSongIndex + 1 + songs.length) % songs.length;
    sound.src = songs[currentSongIndex];
    if (wasPlaying) { 
      imageElement.src = songInfo[currentSongIndex].image;
      titleElement.textContent = songInfo[currentSongIndex].title;
      sound.play();
      seekBar.value = 0;
    } else {
      imageElement.src = songInfo[currentSongIndex].image;
      titleElement.textContent = songInfo[currentSongIndex].title;
      seekBar.value = 0;
    }

    sound.addEventListener('timeupdate', () => {
      let currentTime = formatTime(sound.currentTime);
      tiempo.textContent = currentTime;
    });
  
    sound.addEventListener('loadedmetadata', () => {
      let totalDuration = formatTime(sound.duration);
      tiempoTotal.textContent = totalDuration;
    });
  
    function formatTime(seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
  
  
  });


// Actualizar la posición del rango mientras se reproduce el audio
sound.ontimeupdate = function() {
  control.value = sound.currentTime;
};

// Cambiar la posición del audio cuando se cambia el valor del rango
control.oninput = function() {
    sound.currentTime = control.value;
};
});



