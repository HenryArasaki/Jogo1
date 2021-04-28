var pontos = 0
var numSpawn = 0
var pontosText = document.getElementById("score")
gameRunning = false

function startGame() {
    numSpawn=1
    pontos = 0
    var personagem = document.createElement("div")
    personagem.id = "personagem"
    document.getElementById("game").append(personagem)
    document.getElementById("timer").classList.remove("animation2")
    document.getElementById("timer").classList.remove("animation")
    document.getElementById("timer").classList.add("animation")
    document.getElementById("btnStart").style.display="none"
    gameRunning = true;
    player = document.getElementById("personagem")
    setTimeout(acabouTempo,30000)
    pontosText.innerText = pontos
}

function acabouTempo(){
    gameRunning=false;
    document.getElementById("btnStart").style.display="block"
    document.getElementById("personagem").remove()
    document.querySelectorAll('.block').forEach(function(a){
        a.remove()
        })
        document.getElementById("timer").classList.add("animation2")
}

function moveLeft() {
    left = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    if(gameRunning){
        if (left != 0) {
            player.style.left = left - 100 + "px";
            keyPressed()
        }
    }
}

function moveRight() {
    left = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    if(gameRunning){
        if (left != 200) {
            player.style.left = left + 100 + "px";
            keyPressed()
        }
    }
}

function spawnBlock0() {
    var block = document.createElement("div")
    block.className = "block"
    block.style.top = "0"
    block.style.left = "0px"
    block.id = "0px"
    document.getElementById("game").append(block)
}

function spawnBlock100() {
    var block = document.createElement("div")
    block.className = "block"
    block.style.top = "0"
    block.style.left = "100px"
    block.id = "100px"
    document.getElementById("game").append(block)
}

function spawnBlock200() {
    var block = document.createElement("div")
    block.className = "block"
    block.style.top = "0"
    block.style.left = "200px"
    block.id = "200px"
    document.getElementById("game").append(block)
}

function spawn() {

    var random = Math.floor(Math.random() * 3 + 1);

    switch (random) {
        case 1:
            spawnBlock100()
            spawnBlock200()
            break;

        case 2:
            spawnBlock0()
            spawnBlock100()

            break;

        case 3:

            var random2 = Math.floor(Math.random() * 3 + 1)

            switch (random2) {

                case 1:
                    spawnBlock100()
                    spawnBlock200()
                    break;
                case 2:
                    spawnBlock0()
                    spawnBlock100()
                    break
                case 3: break
            }

            var block = document.createElement("div")
            block.className = "block"
            block.style.top = "-100px"
            block.style.left = "0px"
            document.getElementById("game").append(block)

            var block = document.createElement("div")
            block.className = "block"
            block.style.top = "-100px"
            block.style.left = "200px"
            document.getElementById("game").append(block)
            numSpawn = numSpawn + 0
            break;
    }
}


function foward() {
    var allBlocks = document.getElementsByClassName("block")
    var allBlocksArr = Array.from(allBlocks)
    allBlocksArr.forEach(element => {
        var blockPositionY = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
        element.style.top = blockPositionY + 100 + "px";
        if (blockPositionY == 500) {
            var player = document.getElementById("personagem")
            var blockPositionX = parseInt(window.getComputedStyle(element).getPropertyValue("left"))
            playerPositionX = parseInt(window.getComputedStyle(player).getPropertyValue("left"))

            if (blockPositionX == playerPositionX) {
                acabouTempo()
            }
        }

        if (blockPositionY > 600) {
            document.getElementById("game").removeChild(element)
        }
    });
}


document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "a") moveLeft()
    if (event.key === "ArrowRight" || event.key === "d") moveRight()
})

function keyPressed() {
    
    if (numSpawn == 0) {
        spawn()
        numSpawn += 2
    }
    pontos++
    foward();
    numSpawn -= 1

    pontosText.innerText = pontos

}

