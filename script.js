let cells_data = [[], [], [], [], [], [], [], []];
let current_turn = 0;
let current_turn_opponent = 1;

const initialize = () => {
  const main_div = document.getElementById("main");
  main_div.innerHTML = "";
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      main_div.innerHTML += `<div id="cell-${i}${j}" class="cell" style="left:${
        i * 12.5
      }vmin; top:${j * 12.5}vmin;" onclick="stoneClicked(${i}, ${j})"></div>`;
      cells_data[i][j] = null;
    }
  }
  console.log(cells_data);
  setStone(4, 3, 0);
  setStone(3, 4, 0);
  setStone(3, 3, 1);
  setStone(4, 4, 1);
};

const stoneClicked = (x, y) => {
  console.log(x, y);
  let search_result = {};
  let current_location = null;
  let ifStoneChange = false;
  let changeList = [];
  let tempList = [];
  let returned_value = [];

  console.log(`${x}, ${y}, ${current_location}, ${current_turn}`);
  console.log(cells_data[x][y]);

  returned_value = search(x, y, 1, 0, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, -1, 0, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, 0, -1, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, 0, 1, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, 1, 1, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, 1, -1, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, -1, 1, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  returned_value = search(x, y, -1, -1, changeList, ifStoneChange);
  changeList = returned_value[0];
  ifStoneChange = returned_value[1];
  console.log(changeList);

  if (ifStoneChange) {
    console.log(changeList);
    console.log(typeof changeList[0]);
    setStone(x, y, current_turn);
    for (let i = 0; i < changeList.length; i++) {
      setStone(changeList[i][0], changeList[i][1], current_turn);
    }

    if (current_turn == 0) {
      current_turn = 1;
      current_turn_opponent = 0;
      turnDisplay("白");
    } else {
      current_turn = 0;
      current_turn_opponent = 1;
      turnDisplay("黒");
    }
    console.log("turn end");
  }
};

const setStone = (x, y, user) => {
  console.log(`setStone function: ${x}, ${y}, ${user}`);
  cells_data[x][y] = user;
  if (user == 0) {
    document.getElementById(`cell-${x}${y}`).innerHTML =
      '<span class="stone" style="background-color:#000000;"></span>';
  } else {
    document.getElementById(`cell-${x}${y}`).innerHTML =
      '<span class="stone" style="background-color:#FFFFFF;"></span>';
  }
};

const search = (initx, inity, xdir, ydir, changeList, ifStoneChange) => {
  console.log("search_cicle", xdir, ydir);
  //xy: 0, -1, 1
  let tempList = [];
  let opponentExistence = 0;
  current_location = 0;
  how_moved = 0;
  tempList.push(`${initx + how_moved * xdir}${inity + how_moved * xdir}`);
  if (
    initx + xdir >= 0 &&
    initx + xdir <= 7 &&
    inity + ydir >= 0 &&
    inity + ydir <= 7
  ) {
    if (cells_data[initx + xdir][inity + ydir] != current_turn_opponent) {
      console.log("search function is finished before the loop");
      return [changeList, ifStoneChange];
    }
  }
  while (true) {
    console.log("search function is continued");
    how_moved += 1;
    if (
      initx + how_moved * xdir < 0 ||
      initx + how_moved * xdir > 7 ||
      inity + how_moved * ydir < 0 ||
      inity + how_moved * ydir > 7
    ) {
      console.log(
        "the search function is finished because of reaching the edge"
      );
      break;
    }
    if (
      cells_data[initx + how_moved * xdir][inity + how_moved * ydir] ==
        current_turn &&
      opponentExistence == 1
    ) {
      //search_result[`x${xdir}y${ydir}`] = [how_moved]
      ifStoneChange = true;
      console.log("templist", tempList);
      let onlyThisTimeArray = changeList.concat(tempList);
      changeList = onlyThisTimeArray;
      console.log("the search function is finished by true end");
      break;
    }
    if (
      cells_data[initx + how_moved * xdir][inity + how_moved * ydir] !=
      current_turn_opponent
    ) {
      opponentExistence = opponentExistence * 0;
      console.log(opponentExistence);
      console.log(
        "the search function is finished because of opponentExistence"
      );
      break;
    } else {
      opponentExistence = 1;
    }
    console.log(
      "initx, inity, how_moved, xdir, ydir, searchingXCoordinate, searchingYCoordinate"
    );
    console.log(
      initx,
      " ",
      inity,
      " ",
      how_moved,
      " ",
      xdir,
      " ",
      ydir,
      " ",
      initx + how_moved * xdir,
      " ",
      inity + how_moved * ydir
    );
    tempList.push(`${initx + how_moved * xdir}${inity + how_moved * ydir}`);
    console.log(tempList);
  }
  return [changeList, ifStoneChange];
};

function turnDisplay(user) {
  let target = document.getElementById("currentTurnText");
  let parentOfTarget = document.getElementById("currentTurn");
  target.innerHTML = `${user}のターン`;
  parentOfTarget.style.display = "block";
  setTimeout(() => {
    parentOfTarget.style.display = "none";
  }, 1000);
}

addEventListener("DOMContentLoaded", initialize);
