const gameContainer = document.getElementsByClassName("game-container")[0];

//generate the world
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

//constants define what is a block and what is a tool and the type of the tool
const shovels = ["diamond-shovel"];
const axes = ["diamond-axe"];
const pickaxes = ["diamond-pickaxe"];
const blocks = ["dirt" , "stone" , "grass"];
//what tool break each block
const blockTool = {
    dirt : shovels,
    stone : pickaxes,
    grass : shovels,
}

//hand item is the tool/block chosen from inventory
let handItem;

const inventory = document.getElementById("inventory");

//changing handItem from inventory
inventory.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("item")){
        handItem = e.target.getAttribute("itemtype");
        changeCursor();
    }
});

//make the cursor is the handItem
function changeCursor (){
    document.body.style.cursor = "url(./cursor/"+handItem+".png) , auto";
}

//this function go through inventory slots and and set background for them
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

//this functions sets background for one inventory item or one cell
//this is used when an update happens
function setBackground(item){
    if(item.getAttribute("itemtype")){
        item.style.background = "url(./blocks/"+ item.getAttribute("itemtype") +".webp) center center/cover";
    }
    else if(item.getAttribute("blocktype")){
        item.style.background = "url(./blocks/"+ item.getAttribute("blocktype") +".webp) center center/cover";
    }
    else{
        item.style.background = "";
    }
}

setBackgrounds();

//this handles clicks in the game container
gameContainer.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("cell")){
        //if there is no item in hand => do nothing
        if(!handItem){
            return;
        }
        //if the targeted cell is empty
        //if the handItem is a block => set the cell as the chosen block and refresh its background
        //if the handItem is a tool => do nothing
        if(!e.target.getAttribute("blocktype")){
            if(blocks.includes(handItem)){
                e.target.setAttribute("blocktype" , handItem);
                setBackground(e.target);
                return;
            }
            else{
                return;
            }
        }
        //if the targeted cell is not empty && the handItem is the right tool =>
        //set the cell as empty and refresh its background
        //and add the removed block to the inventory
        if(blockTool[e.target.getAttribute("blocktype")].includes(handItem)){
            const type = e.target.getAttribute("blocktype");
            e.target.setAttribute("blocktype" , "");
            setBackground(e.target);
            addToInventory(type);
        }
    }
});

//this function handles adding items to the inventory
function addToInventory(type){
    const items = document.querySelectorAll(".item");
    for (const item of items) {
        if(!item.getAttribute("itemtype")){
            item.setAttribute("itemtype" , type);
            setBackground(item);
            return;
        }
        else if(item.getAttribute("itemtype") === type){
            return;
        }
    }
}