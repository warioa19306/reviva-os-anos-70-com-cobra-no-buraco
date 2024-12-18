const canva = document.getElementById("cobracanva");
const ctx = canva.getContext("2d");
const caxa = 20 ;
let direction ="up";
let cobra = [{x:10,y:10}];
let comida ={x:Math.random()*canva.width/caxa,y:Math.random()*canva.height/caxa};
let ponto = 0


function cobradese() {
    ctx.fillStyle="green"
    cobra.forEach(segment => {
        ctx.fillRect(segment.x*caxa,segment.y*caxa,caxa,caxa)
        ctx.strokeStyle="red"
        ctx.strokeRect(segment.x*caxa,segment.y*caxa,caxa,caxa)

    })
}
function cumidacome(){
    do {
        comida.x =Math.floor(Math.random()*canva.width/caxa)
        comida.y =Math.floor(Math.random()*canva.height/caxa)
    } while (cobra.some(segment=>segment.x === comida.x && segment.y === comida.y));
    return{
        x:comida.x , y:comida.y
    }
}
function gamelobe(){
    drawboard()
    cobradese()
    cobrameche()
    comidacor()
    txponto()

}
comida = cumidacome()
function comidacor() {
    ctx.fillStyle="red"
    ctx.fillRect(comida.x*caxa,comida.y*caxa,caxa,caxa) 
 
}

function drawboard(){
    ctx.clearRect(0,0,canva.width,canva.height)
    for (let i = 0; i <canva.width / caxa; i++) {
        for (let j = 0; j <canva.height / caxa; j++) {
            ctx.fillStyle=(i + j) % 2 ===0 ? '#ffffff' : "#cdcdcd";
            ctx.fillRect(i*caxa,j*caxa,caxa,caxa);

        }
    }
}
function txponto(){
    ctx.fillStyle = "red"
    ctx.fillText(`a queidi com ${ponto} pontos`,10,380) 
}
function cobrameche(){
    const cabeca = {x: cobra[0].x,y:cobra[0].y};
    switch (direction){
        case "up":
            cabeca.y--;
            break;
        case 'down':
            cabeca.y++;
            break;
        case 'left':
            cabeca.x--;
            break
        case 'right':
            cabeca.x++;
            break;
    }
    if  (cabeca.x < 0 || cabeca.x >= canva.width / caxa || cabeca.y < 0 ||cabeca >= canva.height / caxa){
        clearInterval(jojo)// vawarado
        alert('quilerquin ja tocou ai baitetadis bummmmmmmmmmm e');
        return;
    }

      
 
    if (cabeca.x === comida.x && cabeca.y === comida.y){
        comida = cumidacome() ;// comida "sendo ferrada novamente"
        ponto+=1
    }else{
    cobra.pop()// vol dechar a vida me levar pra onde ela quiser
    }
    cobra.unshift(cabeca);
}
//eventos
document.addEventListener('keydown',e =>{
    switch (e.key) {
        case "w":
            if (direction !== 'down')direction= "up";
             console.log("para cima");
            break;
        case "s":
            if (direction !== 'up')direction= "down";
            console.log("para baixo");
             break;
        case "a":
            if (direction !== "right")direction ="left";
            console.log("direita")
            break
        case "d":
            if (direction !== 'left')direction ="right"
            console.log("direita")
       
    }
    
})
let jojo=setInterval(gamelobe,150)