var gameblock = document.getElementById('main');
gameblock.className = "gameblock"
// var itemBlock = document.getElementById('block-items');

let counter = 0;
let clickCount = 0, click1 = 0, click2 = 0;
let checkArray = [];
let stepCount = 0;
let numbers = [];
let objectArray = [];
const img = ["http://img5.uploadhouse.com/fileuploads/17699/176992640c06707c66a5c0b08a2549c69745dc2c.png", 
    "http://img6.uploadhouse.com/fileuploads/17699/17699263b01721074bf094aa3bc695aa19c8d573.png",
    "http://img6.uploadhouse.com/fileuploads/17699/17699262833250fa3063b708c41042005fda437d.png",
    "http://img9.uploadhouse.com/fileuploads/17699/176992615db99bb0fd652a2e6041388b2839a634.png",
    "http://img4.uploadhouse.com/fileuploads/17699/176992601ca0f28ba4a8f7b41f99ee026d7aaed8.png",
    "http://img3.uploadhouse.com/fileuploads/17699/17699259cb2d70c6882adc285ab8d519658b5dd7.png",
    "http://img2.uploadhouse.com/fileuploads/17699/1769925824ea93cbb77ba9e95c1a4cec7f89b80c.png",
    "http://img7.uploadhouse.com/fileuploads/17699/1769925708af4fb3c954b1d856da1f4d4dcd548a.png"];


function initiator() {
    while (numbers.length < 16) {
        const number = Math.floor(Math.random() * 8);
        // console.log("array length", numbers.length, "generated number", number);
        const check = numbers.filter(item => (item === number) ? true : false);
        // console.log(check)
        if (check.length < 2) {
            numbers.push(number);
            console.log('added');
            objectArray.push({
                id: number + 1,
                url: img[number],
                status: false,
            })
        }
    }
}

function updateDom() {
    structure();
}

function structure() {
    $("#main").empty();
    counter = 0
    var gamediv = document.createElement('div');
    gamediv.className = "blockarea"

    for (let i = 0; i < 4; i++) {
        var gamedivlines = document.createElement('div');
        gamedivlines.className = "gamedivlines"
        for (let j = 0; j < 4; j++) {
            var itemdiv = document.createElement('div');
            itemdiv.className = "item-area"
            // console.log(objectArray[counter].id);

            itemdiv.setAttribute('url', objectArray[counter].url)
            itemdiv.setAttribute('status', objectArray[counter].status)
            itemdiv.id = objectArray[counter].id;
            if (objectArray[counter].status === false) {
                itemdiv.addEventListener('click', changeStatus)
            }
            else {
                console.log(checkArray[0]);
                console.log(checkArray[1]);
                //console.log(objectArray[checkArray[0]])
                //console.log(objectArray[checkArray[1]])

                for (x in objectArray) {
                    //console.log(`url(${objectArray[x].url})`)
                    if (objectArray[x].status === true) {
                        $(`#${objectArray[x].id}`).css({ 'pointer-events': 'none', 'background-image': `url(${objectArray[x].url})`, 'display': 'fixed' });
                    }

                }

            }
            gamedivlines.appendChild(itemdiv);
            counter++;
        }
        gamediv.appendChild(gamedivlines);
    }
    console.log(objectArray)
    gameblock.appendChild(gamediv)
    var btnarea = document.createElement('div');
    btnarea.className = "button-area"
    var btn2 = document.createElement('button');
    btn2.id = "btn2"
    btn2.appendChild(document.createTextNode('RESET'));
    btn2.onclick = function () {
        reset();
        //  console.log('hello')
    };
    btnarea.appendChild(btn2);
    gameblock.appendChild(btnarea);
}

function changeStatus(obj) {
    if (clickCount < 2) {
        console.log(Number(obj.target.id))
        checkArray.push(Number(obj.target.id))
        $(this).css({
            "background-image": "url(" + $(this).attr('url') + ")",
            "backgroundRepeat": "no-repeat",
            "backgroundColor": 'none',
        });
        clickCount++;
        stepCount = stepCount + clickCount;
    }
    else {
        if (checkArray[0] === checkArray[1]) {
            for (x in objectArray) {
                console.log(objectArray[x].id)
                if (objectArray[x].id === checkArray[0]) {
                    console.log(true);
                    //     console.log(objectArray[x].id);
                    //         console.log(checkArray[0]);
                    objectArray[x].status = true;
                }
                score();
            }
        }

    }

}

function reset() {
    counter = 0;
    clickCount = 0;
    click1 = 0;
    click2 = 0;
    checkArray = [];
    stepCount = 0;
    numbers = [];
    objectArray = [];
    // $("#main").empty();
    initiator();
    structure();
}
function score() {
    console.log(stepCount);
    clickCount = 0;
    click1 = 0;
    click2 = 0;
    updateDom();
}
$(function () {
    $("#btn1").click(function () {
        initiator();
        structure();
        $("#btn1").hide();

    });
})
