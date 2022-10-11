// game variables
let checkedCount = 0;
let gridItemArray = [];
let columnCount = 12;
let checkCount = 0;
let checkedArray = [];
let numberArray = [];

// main elements of website
let grid = document.getElementById("grid-container");
let title = document.getElementById("title");

// each item of the grid needs its own properties
function gridItem(element, x, y, checkbox, label) {
    this.item = element;
    this.x = x;
    this.y = y;
    this.checkbox = checkbox;
    this.label = label;
    
    this.checkbox.addEventListener("input", itemChecked);
    
    this.fadeOut = function() {
        this.item.style.display = "none";
    };
}

// we need to create the items every time the game restarts
function createItems(numberOfColumns) {
    for (let i = 0; i < gridItemArray.length; i++) {
        gridItemArray[i].item.remove();
    }
    
    gridItemArray = [];
    
    grid.style.gridTemplateColumns = "auto" + " auto".repeat(numberOfColumns - 1);
    
    for (let x = 1; x <= numberOfColumns; x++) {
        for (let y = x + 1; y <= numberOfColumns + 1; y++) {
            
            let element = document.createElement("div");
            element.classList.add("grid-item");
            grid.appendChild(element);
            
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            let cbid = ("point" + x) + y;
            checkbox.id = cbid;
            element.appendChild(checkbox);
            
            let label = document.createElement("label");
            label.textContent = x + ", " + y;
            label.htmlFor = cbid;
            element.appendChild(label);
            
            element.style.gridColumn = (y - 1) + " / " + y;
            
            gridItemArray.push(new gridItem(element, x, y, checkbox, label));
        }
    }
}

createItems(columnCount);

// we need to size everything perfectly, and this function will let us do that
function size() {
    title.style.fontSize = 0.05 * window.innerHeight + "px";
    let gdHeight = window.innerHeight - title.offsetHeight;
    let gdWidth = grid.offsetWidth;
    grid.style.height = gdHeight + "px";
    let itemWidth;

    if (gdHeight > gdWidth) {
        itemWidth = gdWidth / (columnCount * 1.1);
    } else {
        itemWidth = gdHeight / (columnCount * 1.1);
    }
    
    let itemFontSize = itemWidth / 3;
    
    for (let i = 0; i < gridItemArray.length; i++) {
        let elmnt = gridItemArray[i].item;
        elmnt.style.width = itemWidth + "px";
        elmnt.style.height = itemWidth + "px";
        elmnt.style.fontSize = itemFontSize + "px";
    }
}

window.addEventListener("resize", size);
size();

// this function is called when any input is checked
function itemChecked(event) {
    if (event.target.checked) {
        checkCount++;
    } else {
        checkCount--;
    }
    
    if (checkCount > 3) {
        checkedArray[checkedArray.length - 1].checkbox.checked = false;
        checkCount--;
    }
    
    checkedArray = [];
    
    for (let i of gridItemArray) {
        if (i.checkbox.checked) {
            checkedArray.push(i);
        }
    }
    
    if (checkCount == 3) {
        let first = [checkedArray[0].x, checkedArray[0].y];
        let second = [checkedArray[1].x, checkedArray[1].y];
        let third = [checkedArray[2].x, checkedArray[2].y];
        let last = getLastPair(first, second);
        
        if (last[0] == third[0] && last[1] == third[1]) {
            for (let i of checkedArray) {
                i.fadeOut();
            }
        }
    }
}

// this function get's the last pair of a set when given the first two
function getLastPair(pair1, pair2) {
  let pair3 = [];

  if (pair1[0] == pair2[0]) {
    pair3.push(pair1[1], pair2[1]);
  } else if (pair1[0] == pair2[1]) {
    pair3.push(pair1[1], pair2[0]);
  } else if (pair1[1] == pair2[0]) {
    pair3.push(pair1[0], pair2[1]);
  } else if (pair1[1] == pair2[1]) {
    pair3.push(pair1[0], pair2[0]);
  } else {
  	return undefined;
  }
  
  if (pair3[0] > pair3[1]) {
  	[pair3[0], pair3[1]] = [pair3[1], pair3[0]];
  }
  
  return pair3;
}
