console.log("hello");

//chosit un nombre aléatoire
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let carre = document.getElementById("carre");
let ennemi = document.getElementsByClassName("ennemi");
let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
let obstacle = document.querySelectorAll(".obstacle");

// fonction qui permet de bouger un élément dans une direction
function move(element, direction) {
  let top_element = parseInt(
    window.getComputedStyle(element).getPropertyValue("top")
  );
  let left_element = parseInt(
    window.getComputedStyle(element).getPropertyValue("left")
  );

  switch (direction) {
    case "bas":
      top_element = parseInt(
        window.getComputedStyle(element).getPropertyValue("top")
      );
      collision = false;
      for (let i = 0; i < obstacle.length; i++) {
        let tobs_ =
          parseInt(
            window.getComputedStyle(obstacle[i]).getPropertyValue("top")
          ) - 50;
        let lobs_ = parseInt(
          window.getComputedStyle(obstacle[i]).getPropertyValue("left")
        );
        if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {
          collision = true;
          break;
        } else {
          collision = false;
        }
      }
      if (collision == false) {
        if (top_element < 650) {
          top_element += 50;
          element.style.top = top_element + "px";
        }
      }
      break;

    case "haut":
      top_element = parseInt(
        window.getComputedStyle(element).getPropertyValue("top")
      );
      collision = false;
      for (let i = 0; i < obstacle.length; i++) {
        let tobs_ =
          parseInt(
            window.getComputedStyle(obstacle[i]).getPropertyValue("top")
          ) + 50;
        let lobs_ = parseInt(
          window.getComputedStyle(obstacle[i]).getPropertyValue("left")
        );
        if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {
          collision = true;
          break;
        } else {
          collision = false;
        }
      }
      if (collision == false) {
        if (top_element > 0) {
          top_element -= 50;
          element.style.top = top_element + "px";
        }
      }
      break;

    case "droite":
      left_element = parseInt(
        window.getComputedStyle(element).getPropertyValue("left")
      );
      collision = false;
      for (let i = 0; i < obstacle.length; i++) {
        let tobs_ = parseInt(
          window.getComputedStyle(obstacle[i]).getPropertyValue("top")
        );
        let lobs_ =
          parseInt(
            window.getComputedStyle(obstacle[i]).getPropertyValue("left")
          ) - 50;
        if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {
          collision = true;
          break;
        } else {
          collision = false;
        }
      }
      if (collision == false) {
        if (left_element < 650) {
          left_element += 50;
          element.style.left = left_element + "px";
        }
      }
      break;

    case "gauche":
      left_element = parseInt(
        window.getComputedStyle(element).getPropertyValue("left")
      );
      collision = false;
      for (let i = 0; i < obstacle.length; i++) {
        let tobs_ = parseInt(
          window.getComputedStyle(obstacle[i]).getPropertyValue("top")
        );
        let lobs_ =
          parseInt(
            window.getComputedStyle(obstacle[i]).getPropertyValue("left")
          ) + 50;
        if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {
          collision = true;
          break;
        } else {
          collision = false;
        }
      }
      if (collision == false) {
        if (left_element > 0) {
          left_element -= 50;
          element.style.left = left_element + "px";
        }
        break;
      }
  }
}

// event listener pour écouter les touches du clavier, et bouger le carré en fonction de ces touches
window.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 38: //code quand on va en haut
      move(carre, "haut");
      carre.src = "img/bomber_haut.gif";
      break;
    //droite
    case 39:
      move(carre, "droite");
      carre.src = "img/bomber_droite.gif";
      break;
    //bas
    case 40:
      move(carre, "bas");
      carre.src = "img/bomber_bas.gif";
      break;
    //gauche
    case 37:
      move(carre, "gauche");
      carre.src = "img/bomber_gauche.gif";
      break;
  }
  for (let i = 0; i < ennemi.length; i++) {
    let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
    let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
    let gaucheEnnemi = window
      .getComputedStyle(ennemi[i])
      .getPropertyValue("left");
    let hautEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("top");

    // ICI -> on a essayé de faire perdre des vies et faire marcher le compteur aussi, quand on touche un ennemi, on a donc essayé d'appliquer la même chose qu'avec les bombes mais ca marche pas.
    if (gaucheCarre == gaucheEnnemi && hautCarre == hautEnnemi) {
      window.setTimeout(function() {
        life--;
        document.querySelector("#flash").style.opacity = "0";
      }, 100);
      document.querySelector("#flash").style.opacity = "0.8";

      carre.src = "img/bomber_touch.gif";
    }
  }
});

setInterval(function() {
  ennemi = document.querySelectorAll(".ennemi");
  for (let i = 0; i < ennemi.length; i++) {
    let random = getRandomInt(4);
    switch (random) {
      case 0:
        if (
          parseInt(
            window.getComputedStyle(ennemi[i]).getPropertyValue("top")
          ) === 0
        ) {
          move(ennemi[i], "bas");
        } else {
          move(ennemi[i], "haut");
          // ennemi.src = "img/mechant_haut.gif"
        }
        break;
      case 1:
        if (
          parseInt(
            window.getComputedStyle(ennemi[i]).getPropertyValue("top")
          ) === 650
        ) {
          move(ennemi[i], "haut");
          // ennemi.src = "img/mechant_haut.gif"
        } else {
          move(ennemi[i], "bas");
        }
        break;
      case 2:
        if (
          parseInt(
            window.getComputedStyle(ennemi[i]).getPropertyValue("left")
          ) === 0
        ) {
          move(ennemi[i], "droite");
        } else {
          move(ennemi[i], "gauche");
        }
        break;
      case 3:
        if (
          parseInt(
            window.getComputedStyle(ennemi[i]).getPropertyValue("left")
          ) === 650
        ) {
          move(ennemi[i], "gauche");
        } else {
          move(ennemi[i], "droite");
        }
        break;
    }
    let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
    let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
    let gaucheEnnemi = window
      .getComputedStyle(ennemi[i])
      .getPropertyValue("left");
    let hautEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("top");
    if (gaucheCarre == gaucheEnnemi && hautCarre == hautEnnemi) {
      window.setTimeout(function() {
        life--;
        document.querySelector("#flash").style.opacity = "0";
      }, 100);
      document.querySelector("#flash").style.opacity = "0.8";
    }
  }
}, 300);

// faire bouger l'ennemi dans une direction aléatoirement

let cadre = document.querySelector(".cadre");

function creerBombe() {
  if (life > 0) {
    let bombe = document.createElement("div");
    bombe.classList.add("bombe");
    cadre.appendChild(bombe);
    bombe.style.top = window.getComputedStyle(carre).getPropertyValue("top");
    bombe.style.left = window.getComputedStyle(carre).getPropertyValue("left");
    window.setTimeout(function() {
      bombe.classList.add("explosion");
      // bombe.innerText = "BOOM!!";
    }, 2000);
    window.setTimeout(function() {
      bombe.classList.remove("explosion");
    }, 4000);
    window.setTimeout(function() {
      cadre.removeChild(bombe);
    }, 4000);
  }
}

window.addEventListener("keydown", function(e) {
  let nbBombes = document.querySelectorAll(".bombe").length;
  if (e.keyCode == 32 && nbBombes < 3) {
    creerBombe();
  }
});

let collisionB = function(bombe, perso) {
  let gaucheBombe = parseInt(
    window.getComputedStyle(bombe).getPropertyValue("left")
  );
  let hautBombe = parseInt(
    window.getComputedStyle(bombe).getPropertyValue("top")
  );
  let gauchePerso = parseInt(
    window.getComputedStyle(perso).getPropertyValue("left")
  );
  let hautPerso = parseInt(
    window.getComputedStyle(perso).getPropertyValue("top")
  );

  if (gaucheBombe == gauchePerso && hautBombe == hautPerso) {
    return true;
  }
};

window.setInterval(function() {
  for (let i = 0; i < ennemi.length; i++) {
    let bombes = document.querySelectorAll(".bombe");
    for (let j = 0; j < bombes.length; j++) {
      if (
        bombes[j].classList.contains("explosion") &&
        collisionB(bombes[j], ennemi[i])
      ) {
        cadre.removeChild(ennemi[i]);
      }
    }
  }
}, 100);

let life = 5;
let vie = document.querySelector(".vie");

let kill_interval = window.setInterval(function() {
  let bombes = document.querySelectorAll(".bombe");

  if (life <= 0) {
    clearInterval(kill_interval);
    // for (let i = 0; i < bombes.length; i++) {
    //     bombes[i].remove();
    // }
    carre.src = "img/dead.gif";
    window.setTimeout(function() {
      cadre.removeChild(carre);
      document.querySelector(".got").append("GAME OVER");
      document.querySelector("#flash").style.backgroundColor = "black";
      document.querySelector("#flash").style.transitionDuration = "1s";
      document.querySelector("#flash").style.opacity = "0.8";
    }, 0);
    window.setTimeout(function() {
      document.querySelector("#replay").style.transform = "scale(1)";
    }, 1500);
  } else {
    for (let j = 0; j < bombes.length; j++) {
      if (
        bombes[j].classList.contains("explosion") &&
        collisionB(bombes[j], carre)
      ) {
        window.setTimeout(function() {
          life--;
          document.querySelector("#flash").style.opacity = "0";
        }, 100);
        document.querySelector("#flash").style.opacity = "0.8";
        carre.src = "img/bomber_touch.gif";
      }
    }
  }
}, 125);

let decompteVies = window.setInterval(function() {
  switch (life) {
    case 4:
      document.getElementById("ombre4").style.opacity = ".9";
      break;
    case 3:
      document.getElementById("ombre3").style.opacity = ".9";
      break;
    case 2:
      document.getElementById("ombre2").style.opacity = ".9";
      break;
    case 1:
      document.getElementById("ombre1").style.opacity = ".9";
      break;
    case 0:
      document.getElementById("ombre0").style.opacity = ".9";
      break;
  }
}, 125);

let leftBody = 0;
let scrollBackground = window.setInterval(function() {
  document.querySelector("body").style.backgroundPositionX = leftBody + "px";
  leftBody++;
}, 80);

document.querySelector("#replay").addEventListener("mouseenter", function() {
  document.querySelector("#flash").style.opacity ='0'
});
document.querySelector("#replay").addEventListener("mouseleave", function() {
    document.querySelector("#flash").style.opacity ='1';
  });

/*************** code pour son ************************/

/*
let Sound = function(src) {
    let sound = document.createElement("audio");
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    this.play = function() {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    console.log(src + " is playing");
    };
    this.stop = function() {
    sound.stop();
    };
    };
    let aList = ['../ProjetBomber/son/',"../ProjetBomber/son/"];
    let onChangeSound = new Sound(aList[Math.floor(Math.random() * 1)]);
    document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function() {
    onChangeSound.play();
    });
    document.getElementById("btn").addEventListener("click", function() {
    onChangeSound.play();
    });
    });
    */
