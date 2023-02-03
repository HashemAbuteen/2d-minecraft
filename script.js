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
            cell.setAttribute("blocktype" , "grass");
        }
        //dirt blocks
        if(i<20 && i >15){
            cell.setAttribute("blocktype" , "dirt");
        }
        //stone blocks
        if(i<=15 && i>2){
            cell.setAttribute("blocktype" , "stone");
        }
        if(i<=2 && i>0){
            cell.setAttribute("blocktype" , "bedrock");
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

function setBackgrounds () {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        if(item.getAttribute("itemtype")){
        item.style.background = "url(./blocks/"+ item.getAttribute("itemtype") +".webp) center center/cover";
        }
    });
    const blocks = document.querySelectorAll(".cell");
    blocks.forEach(block => {
        if(block.getAttribute("blocktype")){
            block.style.background = "url(./blocks/"+ block.getAttribute("blocktype") +".webp) center center/cover";
        }
    });
}

function setBackground(item){
    if(item.getAttribute("itemtype")){
        item.style.background = "url(./blocks/"+ item.getAttribute("itemtype") +".webp) center center/cover";
    }
    else{
        item.style.background = "";
    }
}

setBackgrounds();

gameContainer.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("cell")){
        if(!handItem){
            return;
        }
        if(!e.target.getAttribute("blocktype")){
            return;
        }
        if(blockTool[e.target.getAttribute("blocktype")].includes(handItem)){
            const type = e.target.getAttribute("blocktype");
            e.target.setAttribute("blocktype" , "");
            setBackground(e.target);
        }
    }
});
const shovels = ["diamond-shovel"];
const axes = ["diamond-axe"];
const pickaxes = ["diamond-pickaxe"];
const blockTool = {
    dirt : shovels,
    stone : pickaxes,
    grass : shovels,
}