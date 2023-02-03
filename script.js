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

let handItem;

const inventory = document.getElementById("inventory");

inventory.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("item")){
        handItem = e.target.getAttribute("itemtype");
        changeCursor();
    }
});

function changeCursor (){
    document.body.style.cursor = "url(./cursor/"+handItem+".png) , auto";
    console.log("cursor changed");
    console.log(document.body.style);
}

function giveInventoryItemsBackground () {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        console.log(item);
        item.style.background = "url(./blocks/"+ item.getAttribute("itemtype") +".webp) center center/cover";
    });
}

giveInventoryItemsBackground();