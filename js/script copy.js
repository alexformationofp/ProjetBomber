console.log("hello");

/********** CHOISIR UN NB ALÉATOIRE *************/

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/********* VARIABLES GLOBALES ***********/


let carre = document.getElementById("carre");
let ennemi = document.getElementsByClassName("ennemi");
let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
let obstacle = document.querySelectorAll(".obstacle");

/************* FONCTION QUI PERMET DE BOUGER UN ÉLÉMENT DANS UNE DIRECTION *************/
/************* + DANS LE SWITCH : PERMET DE NE PAS TRAVERSER LES OBSTACLES *************/

function move(element, direction) {
    let top_element = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
    let left_element = parseInt(window.getComputedStyle(element).getPropertyValue("left"));

    switch (direction) {

        case "bas":
            top_element = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
            collision = false;
            for (let i = 0; i < obstacle.length; i++) {
                let tobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("top")) - 50;
                let lobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("left"));
                if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {
                    collision = true;
                    break;
                } else {
                    collision = false;
                }
            };
            if (collision == false) {
                if (top_element < 650) {
                    top_element += 50;
                    element.style.top = top_element + "px";
                }
            }
            break;

        case "haut":
            top_element = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
            collision = false
            for (let i = 0; i < obstacle.length; i++) {
                let tobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("top")) + 50;
                let lobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("left"));
                if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {

                    collision = true;
                    break;
                } else {
                    collision = false;
                }
            };
            if (collision == false) {
                if (top_element > 0) {
                    top_element -= 50;
                    element.style.top = top_element + "px";
                }
            }
            break;

        case "droite":
            left_element = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
            collision = false
            for (let i = 0; i < obstacle.length; i++) {
                let tobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("top"));
                let lobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("left")) - 50;
                if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {

                    collision = true;
                    break;
                } else {
                    collision = false;
                }
            };
            if (collision == false) {
                if (left_element < 650) {
                    left_element += 50;
                    element.style.left = left_element + "px";
                }
            }
            break;

        case "gauche":
            left_element = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
            collision = false
            for (let i = 0; i < obstacle.length; i++) {
                let tobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("top"));
                let lobs_ = parseInt(window.getComputedStyle(obstacle[i]).getPropertyValue("left")) + 50;
                if (parseInt(top_element) == tobs_ && parseInt(left_element) == lobs_) {

                    collision = true;
                    break;
                } else {
                    collision = false;
                }
            };
            if (collision == false) {
                if (left_element > 0) {
                    left_element -= 50;
                    element.style.left = left_element + "px";
                }
                break;

            }
    }
}



/*********** EVENT LISTENER : PERMET DE MOUVOIR LE HÉROS EN FONCTION DES TOUCHES ***********/

window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 38: // ALLER EN HAUT.
            move(carre, "haut");
            carre.src = "img/bomber_haut.gif"
            break;
            
        case 39: //ALLER À DROITE.
            move(carre, "droite");
            carre.src = "img/bomber_droite.gif"
            break;
            
        case 40: //ALLER EN BAS.
            move(carre, "bas");
            carre.src = "img/bomber_bas.gif"
            break;
            
        case 37: //ALLER À GAUCHE.
            move(carre, "gauche");
            carre.src = "img/bomber_gauche.gif"
            break;
    }

/*********** QUAND L'ENNEMI TOUCHE NOTRE HÉROS : VIE -1 **************/
    
    for (let i = 0; i < ennemi.length; i++) {
        let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
        let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
        let gaucheEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("left");
        let hautEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("top");

       
        if (gaucheCarre == gaucheEnnemi && hautCarre == hautEnnemi) {
            window.setTimeout(function () {
                life--;
                document.querySelector('#flash').style.opacity = '0';
            }, 100);
            document.querySelector('#flash').style.opacity = '0.8';
            carre.src = "img/bomber_touch.gif"
        }
    }
});

/********* FAIRE BOUGER L'ENNEMI ALÉATOIREMENT EN FONCTION DU getRandom ***********/

setInterval(function () {
    ennemi = document.querySelectorAll(".ennemi");
    for (let i = 0; i < ennemi.length; i++) {
        let random = getRandomInt(4);
        switch (random) {


            case 0:
                if (parseInt(window.getComputedStyle(ennemi[i]).getPropertyValue("top")) === 0) {
                    move(ennemi[i], "bas");

                } else {
                    move(ennemi[i], "haut");
                }
                break;


            case 1:
                if (parseInt(window.getComputedStyle(ennemi[i]).getPropertyValue("top")) === 650) {
                    move(ennemi[i], "haut");
                } else {
                    move(ennemi[i], "bas");
                }
                break;


            case 2:
                if (parseInt(window.getComputedStyle(ennemi[i]).getPropertyValue("left")) === 0) {
                    move(ennemi[i], "droite");
                } else {
                    move(ennemi[i], "gauche");
                }
                break;


            case 3:
                if (parseInt(window.getComputedStyle(ennemi[i]).getPropertyValue("left")) === 650) {
                    move(ennemi[i], "gauche");
                } else {
                    move(ennemi[i], "droite");
                }
                break;
        }


        let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
        let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
        let gaucheEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("left");
        let hautEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("top");

        if (gaucheCarre == gaucheEnnemi && hautCarre == hautEnnemi) {
            window.setTimeout(function () {
                life--;
                document.querySelector('#flash').style.opacity = '0';
            }, 100);
            document.querySelector('#flash').style.opacity = '0.8';
        }
    }
}, 300);

/********* CRÉER UNE BOMBE ***********/

let cadre = document.querySelector(".cadre");

function creerBombe() {
    if (life > 0) {
        let bombe = document.createElement("div");
        bombe.classList.add("bombe");
        cadre.appendChild(bombe);
        bombe.style.top = window.getComputedStyle(carre).getPropertyValue("top");
        bombe.style.left = window.getComputedStyle(carre).getPropertyValue("left");
        window.setTimeout(function () {
            bombe.classList.add("explosion");
            
        }, 3000);
        window.setTimeout(function () {
            bombe.classList.remove("explosion");
        }, 5000);
        window.setTimeout(function () {
            cadre.removeChild(bombe);
        }, 5000);
    }

}

window.addEventListener("keydown", function (e) {
    let nbBombes = document.querySelectorAll(".bombe").length;
    if (e.keyCode == 32 && nbBombes < 3) {
        creerBombe();
    }
});

/*********** LES COLLISIONS DES BOMBES ************/

function collision(bombe, perso) {
    let gaucheBombe = parseInt(window.getComputedStyle(bombe).getPropertyValue("left"));
    let hautBombe = parseInt(window.getComputedStyle(bombe).getPropertyValue("top"));
    let gauchePerso = parseInt(window.getComputedStyle(perso).getPropertyValue("left"));
    let hautPerso = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));

    if (gaucheBombe == gauchePerso && hautBombe == hautPerso) {
        return true;
    }
}

window.setInterval(function () {
    for (let i = 0; i < ennemi.length; i++) {
        let bombes = document.querySelectorAll(".bombe");
        for (let j = 0; j < bombes.length; j++) {
            if (bombes[j].classList.contains("explosion") && collision(bombes[j], ennemi[i])) {
                cadre.removeChild(ennemi[i]);

            }
        }
    }
}, 100);


/************ PERTE DE VIES & MORT ************/

let life = 5;
let vie = document.querySelector(".vie")
let kill_interval = window.setInterval(function () {
let bombes = document.querySelectorAll(".bombe");

    if (life <= 0) {
        clearInterval(kill_interval);
        for (let i = 0; i < bombes.length; i++) {
            bombes[i].remove();
        }
        carre.src = "img/dead.gif";
        window.setTimeout(function () {
            cadre.removeChild(carre);
            document.querySelector(".got").append("GAME OVER");
            document.querySelector('#flash').style.backgroundColor = 'black';
            document.querySelector('#flash').style.transitionDuration = '1s';
            document.querySelector('#flash').style.opacity = '0.8';
        }, 1500);
        window.setTimeout(function () {
            document.querySelector('#replay').style.transform = 'scale(1)'
        }, 1500)

    } else {
        for (let j = 0; j < bombes.length; j++) {
            if (bombes[j].classList.contains("explosion") && collision(bombes[j], carre)) {
                window.setTimeout(function () {
                    vie.innerHTML = life
                    life--;
                    document.querySelector('#flash').style.opacity = '0';
                }, 100);
                document.querySelector('#flash').style.opacity = '0.8';
                carre.src = "img/bomber_touch.gif"
            };
        }
    }
}, 125);

/************** COMPTEUR DE VIE ********************/

let decompteVies = window.setInterval(function () {
    switch (life) {
        case 4:
            document.getElementById('ombre4').style.opacity = ".9"
            break;
        case 3:
            document.getElementById('ombre3').style.opacity = ".9"
            break;
        case 2:
            document.getElementById('ombre2').style.opacity = ".9"
            break;
        case 1:
            document.getElementById('ombre1').style.opacity = ".9"
            break;
        case 0:
            document.getElementById('ombre0').style.opacity = ".9"
            break;
    }
})

/***************** POSITION WALLPAPER *****************/



let leftBody = 0
let scrollBackground = window.setInterval(function () {

    document.querySelector('body').style.backgroundPositionX = (leftBody + 'px')
    leftBody++
}, 80)

document.querySelector('#replay').addEventListener('hover', function () {
    document.querySelector('#flash').style.backgroundColor = 'white';
})




/*************** code pour son ************************/
