
let boxs = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],   // corrected this pattern from [1,2,7] to [1,4,7]
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turno = true;
    enableboxs();
    msgcontainer.classList.add("hide");
};

boxs.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turno) {
            box.innerText = "O";
            turno = false;
        } else {
            box.innerText = "X";
            turno = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const disableboxs = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};

const enableboxs = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showwin = (winner) => {
    msg.innerText = `Congrats, ${winner} wins!`;
    msgcontainer.classList.remove("hide");
    disableboxs();
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxs[pattern[0]].innerText;
        let pos2 = boxs[pattern[1]].innerText;
        let pos3 = boxs[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner:", pos1);
                showwin(pos1);
            }
        }
    }
};

newgame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);  // fixed the incorrect reference `resetgame.addEventListener` (was trying to call a function instead of referencing the element)
