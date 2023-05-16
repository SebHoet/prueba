var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');

canvas.width = 400
canvas.height = 400



class Jugador {
    
    constructor({position, velocidad, tamano}){
        this.position = position
        this.velocidad = velocidad
        this.tamano = tamano
        
    }
    draw() {
        c.fillStyle = "black"
        c.shadowBlur = 2;
        c.shadowColor = "black";
        c.globalAlpha = 1;
        c.fillRect(this.position.x, this.position.y, this.tamano.x, this.tamano.y);
    }

    update(){
    let positionSuelo = 250
    this.position.y += this.velocidad.y
    if (this.position.y >= positionSuelo) {
        this.position.y = positionSuelo
        
    } else if (this.position.y < 100) {
        this.position.y = 100
        if (booleanos.salto.permitido) {
            booleanos.salto.permitido = false;
            setTimeout(() => {
                booleanos.salto.permitido = true
            }, 
            750);
        }
    }

    this.position.x +=10*this.velocidad.x
    this.position.x -= this.velocidad.x
    if (this.position.x >200) {
        this.position.x = 200
    } else if (this.position.x < 25) {
        this.position.x = 25
    }
    this.draw()
    
    }
} 


class Obstaculo {
    
    constructor({position, velocidad, tamano}){
        this.position = position
        this.velocidad = velocidad
        this.tamano = tamano
        
    }
    draw() {
        c.fillStyle = "gray";
        c.shadowBlur = 2;
        c.shadowColor = "black";  
        c.globalAlpha = 0.2;
        c.fillRect(this.position.x, this.position.y - this.tamano.y+50, this.tamano.x, this.tamano.y);
    }

    update(){
    this.position.x -= this.velocidad.x
    this.draw()
    if (this.position.x <0-this.tamano.x) {
        obstaculos.splice(obstaculos.indexOf(this),1)
        }
    }
} 

class Suelo {
    constructor({position, velocidad}){
        this.position = position
        this.velocidad = velocidad
    }
    draw() {

        c.fillStyle = 'black'
        c.shadowBlur = 0;
        c.shadowColor = "black";
        
        c.globalAlpha = 1;
        c.beginPath();
        c.moveTo(0,300);
        c.lineTo(400, 300);

        for (let i = 0; i <8; i++) {
            if (this.position.x+(100*i) < -400) {
                this.position.x+=400;
            }
            
            c.moveTo(this.position.x+(100*i),this.position.y);
            c.lineTo(this.position.x+100+(100*i),this.position.y+100);
            
        }

        c.stroke()
    }

    update(){
    this.draw()
    this.position.x -=2 * (this.velocidad.x/2)
    
    
    
    }
} 
//////////////////////////////
const jugador = new Jugador({
    position:   {
    x: 100,
    y: 250
    },
    velocidad: {
        x: 0,
        y: 5
    },
    tamano:   {
        x: 30,
        y: 50
    }
})

const obstaculos = [new Obstaculo({
    position:   {
    x: 400,
    y: 250
    },
    velocidad: {
        x: 2,
        y: 0
    },
    tamano:   {
        x: 30,
        y: 50
    }
})]

const suelo = new Suelo( {
    position:   {
        x: 0,
        y: 300
        },
        velocidad: {
            x: 2,
            y: 0
        }
})


const teclas = {
    arriba: {
        pressed : false
    },
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    abajo: {
        pressed: false
    }

}

const booleanos = {
    salto:{
        permitido: true
    }
}
const propiedades = {
    jugador: {
        velocidad__actual_y : 5
    },
    objectos: {
        velocidad_inicio :2,
        velocidad_actual: 2,
        velocidad_maxima:9
    }
    
}

jugador.draw()
suelo.draw()
obstaculos[0].draw()
/////////////////
animate()
//////////

window.addEventListener('keydown', (event) =>{
    switch (event.key) {
        case 'w':
            teclas.arriba.pressed=true

            break;
        case 'a':
            teclas.left.pressed=true

            break;
        case 'd':
            teclas.right.pressed=true
    
            break;
        case 's':
            teclas.abajo.pressed=true
                break;
    }

})
window.addEventListener('keyup', (event) =>{
    switch (event.key) {
        case 'w':
            teclas.arriba.pressed=false
            break;
        case 'a':
            teclas.left.pressed=false
    
                break;
        case 'd':
            teclas.right.pressed=false
        
                break;
        case 's':
            teclas.abajo.pressed=false
            break;
    }


})


async function moreObstaculos(){
      
        if (obstaculos.length <=4 && fechanow < Date.now()) {
            fechanow = Date.now()+750
            let numRandom = Math.random();
           if (numRandom > 0.5) {
            
             obstaculos.push(new Obstaculo({
                position:   {
                x: 400+Math.random()*750,
                y: 250
                },
                velocidad: {
                    x: 2,
                    y: 0
                },
                tamano:   {
                    x: 30,
                    y: 50
                }
            }))
           }
           
        }
    
   
}
//

//
var fechanow= Date.now();
function animate(){
    window.requestAnimationFrame(animate)
    
    c.clearRect(0,0,canvas.width,canvas.height)
    jugador.update();
    suelo.update();
    obstaculos.forEach((obstaculo) => {
        obstaculo.update();
        obstaculo.velocidad.x = propiedades.objectos.velocidad_actual
    });
    moreObstaculos()
    //console.log("Aullando como lobaa aaaaaauuuuuuuuuuuu uuuuuuuuuu soy quien no se enamoraaaaaaaaaaaaaaa aaaaaaaaaaaauuuuuuuuu uuuuuuuuuuu uuuuuuuuuuuuuuuuuu");
    jugador.velocidad.x = 0
    jugador.velocidad.y = propiedades.jugador.velocidad__actual_y
    suelo.velocidad.x  = propiedades.objectos.velocidad_actual;
    
    if (propiedades.objectos.velocidad_actual < propiedades.objectos.velocidad_maxima) {
        propiedades.objectos.velocidad_actual*= 1.001
        console.log(propiedades.objectos.velocidad_actual)
    }
    //console.log(jugador.velocidad.y)
    //console.log(booleanos.salto.permitido)
    if (teclas.arriba.pressed && booleanos.salto.permitido) {
        jugador.velocidad.y *= -2
    } else if (teclas.abajo.pressed) {
        jugador.velocidad.y *= 4
    }
    if (teclas.left.pressed) {
        jugador.velocidad.x +=-0.5
    } else if (teclas.right.pressed){
        jugador.velocidad.x +=0.5
    }
    
    
    
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

