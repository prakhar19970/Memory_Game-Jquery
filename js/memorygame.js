let objectArray = [];
let numbers = [];

const img = ["http://img5.uploadhouse.com/fileuploads/17699/176992640c06707c66a5c0b08a2549c69745dc2c.png", 
    "http://img6.uploadhouse.com/fileuploads/17699/17699263b01721074bf094aa3bc695aa19c8d573.png",
    "http://img6.uploadhouse.com/fileuploads/17699/17699262833250fa3063b708c41042005fda437d.png",
    "http://img9.uploadhouse.com/fileuploads/17699/176992615db99bb0fd652a2e6041388b2839a634.png",
    "http://img4.uploadhouse.com/fileuploads/17699/176992601ca0f28ba4a8f7b41f99ee026d7aaed8.png",
    "http://img3.uploadhouse.com/fileuploads/17699/17699259cb2d70c6882adc285ab8d519658b5dd7.png",
    "http://img2.uploadhouse.com/fileuploads/17699/1769925824ea93cbb77ba9e95c1a4cec7f89b80c.png",
    "http://img7.uploadhouse.com/fileuploads/17699/1769925708af4fb3c954b1d856da1f4d4dcd548a.png"];

function initializeStructure(structureSize,gameMode,screenSize){
// console.log('working',structureSize);
    if(screenSize > 600){
        $('#background-carousel-landscape').empty();
        // $('#background-carousel-landscape').style('background-image','')
        generateStructure('#background-carousel-landscape',gameMode,structureSize)
    }
    else{
        $('#background-carousel-portrait').empty();
        generateStructure('#background-carousel-portrait',gameMode,structureSize)
    }
    
}

function generateStructure(currentDivId,gameMode,size){
    initiator(size);
    // console.log($(`${currentDivId}`));
    let structureDiv=$('<div class="game-structure-wrapper wid-variable"></div>')
    let cardOuter='<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front front-card"><img src="../assets/images/question-mark-icon-wallpaper-png-favpng-XP5SaTVjJcKwnc6nfkB0tCBT0.jpg"  class="img-adjust"></div><div class="flip-card-back"><img class="item-pic img-adjust"></div></div></div></div>'
    let structureRow='<div class="structureRow d-flex"></div>'

    $(`${currentDivId}`).append(structureDiv);
     for (let i = 0; i < size; i++) {
             structureDiv.append(structureRow);
    }
    appendCards(cardOuter,size)
    initializeCards(size)  
    cardOpen(gameMode) 
}

function appendCards(card,size){
    let counter=0;
    while(size > 0)
    {
        console.log(size);
        $('.structureRow').append(card);
        size--;
        counter++;
    }
}

function initializeCards(size)
{
    $('.item-pic').each((i,elem)=>{
    // console.log(i,elem);
    elem.setAttribute('src',objectArray[i].url)
    elem.setAttribute('status', objectArray[i].status)
    elem.id = objectArray[i].id;
    // elem.parentElement.id=`img${elem.id}`;
    })
    
}

function initiator(size) {
    while (numbers.length < size*size) {
        const number = Math.floor(Math.random() * 8);
        // console.log("array length", numbers.length, "generated number", number);
        const check = numbers.filter(item => (item === number) ? true : false);
        // console.log("check",check)
        if (check.length < 2) {
            numbers.push(number);
            // console.log('added');
            objectArray.push({
                id: number + 1,
                url: img[number],
                status: false,
            })
        }
    }
}

function cardOpen(gameMode){
    if(gameMode ==='hard'){
        $('.modal').fadeIn();
        $('.modal-title').append('Hi! You have chosen Hard Mode')
        $('#modal_cont').append(`<p>For every wrong move, -2.5 points will be deducted from the score. For correct match 2 points</p>
        <button type="button" class="mx-auto btn btn-dark btn-lg" id="start_game">Start Game</button>`);     
    }
    else{
        $('.modal').fadeIn();
        $('.modal-title').append('Hi! You have chosen Normal Mode')
        $('#modal_cont').append(`<p>For every wrong move, -1 points will be deducted from the score. For correct match 2 points</p><button type="button" class="mx-auto  btn btn-dark btn-lg" id="start_game">Start Game</button>`);     
    }
    $('#start_game').click(()=>{
        $('.modal').fadeOut();
        $('.modal-title').empty();
        $('#modal_cont').empty();
        $('.flip-card-front').css('pointer-events','none');
        $('.flip-card-back').css('pointer-events','none');
        $('.flip-card-front').addClass('card-flip');
        $('.flip-card-back').addClass('rev-card-flip');

        setTimeout(()=>{
            $('.flip-card-front').removeClass('card-flip');
            $('.flip-card-back').removeClass('rev-card-flip');
            $('.flip-card-back').css('pointer-events','auto');
            
        $('.flip-card-front').css('pointer-events','auto');
        },2000)
     })  
    let count = 0;
    let cardId=[];
    let score = 0;
    
    $('body').on('click','.flip-card-front',(elem)=>{
    console.log(count);
    let cardbackId=elem.currentTarget.nextElementSibling.firstChild.id
    cardId.push(cardbackId);
    // $('#myAudio').attr('autoplay','true');
    count += 1;
    if (count == 2) {
        $('.flip-card-front').css('pointer-events','none');
        console.log(cardId[0],cardId[1]);
        if(cardId[0] !== cardId[1])
        {
            if(gameMode !='hard'){
                score=score-1;
            }
            else
            {
                score=score-2.5;
            }
           
           setTimeout(()=>{ 
            $(`#${cardId[0]},#${cardId[1]}`).removeClass('button-shake')
               $('.flip-card-back').removeClass('rev-card-flip')
               $('.flip-card-front').removeClass('card-flip')
               $('.flip-card-front').css('pointer-events','auto')
              },2000);      
        }
        else{
            score=score+2;
            $(`[id=${cardbackId}]`).parent().removeClass('flip-card-back');
            $(`[id=${cardbackId}]`).parent().css('pointer-events','none');
            $(`[id=${cardbackId}]`).parent().prev().fadeOut();
            $(`[id=${cardbackId}]`).parent().prev().removeClass('front-card');
            $('.flip-card-front').css('pointer-events','auto');
        }
        count=0;
        cardId=[];
    }
    elem.currentTarget.classList.add('card-flip');
    elem.currentTarget.nextElementSibling.classList.add('rev-card-flip');  
    console.log("score",score);
    // console.log($('.card-flip').length)
    if(!$('.front-card').length)
    {
        $('.modal').fadeIn();
        $('.modal-title').append('Your Score');
            if(score<5){
            $('#modal_cont').append(`<p>${score}</p><p>"Never Lose Hope Always Keep Trying"</p><p class="text-right">---Developed By---<br>Prakhar Shukla</p>`);
            }
            else{
            $('#modal_cont').append(`<p>${score}</p><p>"Hatsoff what a game!!!"</p><p class="text-right">---Developed By---<br>Prakhar Shukla</p>`);
                        }
            setTimeout(()=>{
                location.href="/templates/index.html"
            },3000)
    }
    })
    
}

// cardOpen()
export {initializeStructure,};


