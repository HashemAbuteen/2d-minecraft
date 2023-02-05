const gameContainer = document.getElementsByClassName("game-container")[0];

//generate the world
function generateTheWorld(){
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
}
generateTheWorld();

//generate trees
function generateTrees(){
    const grassCells = document.querySelectorAll("[blocktype='grass']");
    const numOfTrees = Math.ceil(Math.random()*grassCells.length/4);
    console.log(numOfTrees);
    for(let i =0 ; i < numOfTrees ; i++){
        const randomGrassCell = grassCells[Math.floor(Math.random()*grassCells.length)];
        if(randomGrassCell.getAttribute("hasATree")){
            console.log("conflict");
            continue;
        }
        else{
            setTreeRestrictions(randomGrassCell);
            generateOakTree(randomGrassCell);
        }
    }
}

function generateOakTree(ground){
    console.log("generating atree");
    const height = Math.floor(Math.random()*3)+6;
    const id = ground.id;
    const x = id.split('-')[1];
    let y = parseInt(id.split('-')[2]);
    for(let i = 0; i<height ; i++){
        y++;
        const logCell = document.getElementById("cell-"+x +"-" + y);
        if(logCell && !logCell.getAttribute("blocktype")){
            logCell.setAttribute("blocktype" , "oak-log");
            setBackground(logCell);
        }
    }
}

//this is a function to not get trees to generate next to each other
function setTreeRestrictions(ground){
    ground.setAttribute("hasATree" , true);
    const id = ground.id;
    let x = parseInt(id.split('-')[1]);
    const y = parseInt(id.split('-')[2]);
    x = x-3;
    for(let i =0; i<7 ;i++){
        const cell = document.getElementById("cell-" + x +"-" + y);
        if(cell){
            cell.setAttribute("hasATree" , true);
        }
        x++;
    } 
}
generateTrees();

//constants define what is a block and what is a tool and the type of the tool
const shovels = ["diamond-shovel"];
const axes = ["diamond-axe"];
const pickaxes = ["diamond-pickaxe"];
const blocks = ["dirt" , "stone" , "grass" ,"oak-log"];
//what tool break each block
const blockTool = {
    dirt : shovels,
    stone : pickaxes,
    grass : shovels,
    "oak-log" : axes,
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