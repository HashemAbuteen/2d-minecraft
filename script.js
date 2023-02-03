const gameContainer = document.getElementsByClassName("game-container")[0];

for (let i = 30; i > 0; i--) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.y = i;
    row.id = "row-" + i;
    gameContainer.appendChild(row);
    for (let j = 0; j < 100; j++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.x = j;
        cell.y = i;
        cell.id = "cell-" + j +"-" + i;
        //grass blocks
        if(i === 20){
            cell.classList.add("grass");
        }
        //dirt blocks
        if(i<20 && i >15){
            cell.classList.add("dirt");
        }
        //stone blocks
        if(i<=15 && i>2){
            cell.classList.add("stone");
        }
        if(i<=2 && i>0){
            cell.classList.add("bedrock");
        }
        row.appendChild(cell);
    }
}