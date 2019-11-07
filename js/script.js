console.log("hello");

//chosit un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let carre = document.getElementById("carre");
let ennemi = document.getElementsByClassName("ennemi");
let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");

// fonction qui permet de bouger un élément dans une direction
function move(element, direction) {
    let top_element = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
    let left_element = parseInt(window.getComputedStyle(element).getPropertyValue("left"));

    switch (direction) {
        case "bas":
            top_element = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
            if (top_element < 650) {
                top_element += 50;
                element.style.top = top_element + "px";
            }
            break;
        case "haut":
            top_element = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
            if (top_element > 0) {
                top_element -= 50;
                element.style.top = top_element + "px";
            }
            break;
        case "droite":
            left_element = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
            if (left_element < 650) {
                left_element += 50;
                element.style.left = left_element + "px";
            }
            break;
        case "gauche":
            left_element = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
            if (left_element > 0) {
                left_element -= 50;
                element.style.left = left_element + "px";
            }
            break;
    }
}
// event listener pour écouter les touches du clavier, et bouger le carré en fonction de ces touches
window.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
        case 38: //code quand on va en haut
            move(carre, "haut");
            break;
        //droite
        case 39:
            move(carre, "droite");
            break;
        //bas
        case 40:
            move(carre, "bas");
            break;
        //gauche
        case 37:
            move(carre, "gauche");
            break;
    }
    for (let i = 0; i < ennemi.length; i++) {
        let gaucheCarre = window.getComputedStyle(carre).getPropertyValue("left");
        let hautCarre = window.getComputedStyle(carre).getPropertyValue("top");
        let gaucheEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("left");
        let hautEnnemi = window.getComputedStyle(ennemi[i]).getPropertyValue("top");
        if (gaucheCarre == gaucheEnnemi && hautCarre == hautEnnemi) {
            window.setTimeout(function() {
                cadre.style.backgroundColor = "lightgrey";
            }, 200);
            cadre.style.backgroundColor = "black";
        }
    }
});

setInterval(function() {
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
            window.setTimeout(function() {
                cadre.style.backgroundColor = "lightgrey";
            }, 200);
            cadre.style.backgroundColor = "black";
        }
    }
}, 300);

// faire bouger l'ennemi dans une direction aléatoirement

let cadre = document.querySelector(".cadre");

function creerBombe() {
    let bombe = document.createElement("div");
    bombe.classList.add("bombe");
    cadre.appendChild(bombe);
    bombe.style.top = window.getComputedStyle(carre).getPropertyValue("top");
    bombe.style.left = window.getComputedStyle(carre).getPropertyValue("left");
    window.setTimeout(function() {
        bombe.classList.add("explosion");
        bombe.innerText = "BOOM!!";
    }, 3000);
    window.setTimeout(function() {
        bombe.classList.remove("explosion");
    }, 6000);
    window.setTimeout(function() {
        cadre.removeChild(bombe);
    }, 6000);
}

window.addEventListener("keydown", function(e) {
    let nbBombes = document.querySelectorAll(".bombe").length;
    if (e.keyCode == 32 && nbBombes < 3) {
        creerBombe();
    }
});



function collision(bombe, perso) {
    let gaucheBombe = parseInt(window.getComputedStyle(bombe).getPropertyValue("left"));
    let hautBombe = parseInt(window.getComputedStyle(bombe).getPropertyValue("top"));
    let gauchePerso = parseInt(window.getComputedStyle(perso).getPropertyValue("left"));
    let hautPerso = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));

    if (gaucheBombe == gauchePerso && hautBombe == hautPerso) {
        return true;
    }
}

window.setInterval(function() {
    for (let i = 0; i < ennemi.length; i++) {
        let bombes = document.querySelectorAll(".bombe");
        for (let j = 0; j < bombes.length; j++) {
            if (bombes[j].classList.contains("explosion") && collision(bombes[j], ennemi[i])) {
                cadre.removeChild(ennemi[i]);
                // window.setTimeout(function(){
                //     cadre.style.backgroundColor = ('lightgrey')
                // }, 200);
                // cadre.style.backgroundColor = 'chartreuse'
            }
        }
    }
}, 100);

window.setInterval(function() {
    let bombes = document.querySelectorAll(".bombe");
    for (let j = 0; j < bombes.length; j++) {
        if (bombes[j].classList.contains("explosion") && collision(bombes[j], carre)) {
            window.setTimeout(function() {
                cadre.style.backgroundColor = "lightgrey";
            }, 200);
            cadre.style.backgroundColor = "chartreuse";
        }
    }
}, 100);
