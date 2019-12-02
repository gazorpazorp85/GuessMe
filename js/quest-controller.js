'use strict';

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start h2').html(' ');
    $('.game-start').hide();
    $('.normal').hide();
    $('.reverse').attr("src","img/layout/2.jpg");
    $('.box').toggleClass('box gameon');
    renderQuest();
}

function renderQuest() {
    $('.quest').show();
    $('.title').html(gCurrQuest.txt);
}

function onUserResponse(res) {

    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            rightGuess();
            $('.quest').hide();
            $('#restart').show();
            // TODO: improve UX
        } else {
            wrongGuess();
            $('.quest').hide();
            $('.new-quest').show('slow');
        }
    } else {
        setLastRes(res)
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var newGuessTxt = $('#newGuess').val();
    var newQuestTxt = $('#newQuest').val();
    addGuess(newQuestTxt, newGuessTxt);
    saveToStorage('questTree', gQuestsTree);
    onRestartGame();
}

function rightGuess() {
    $("#victoryModal").modal('show');
    $('.title').html('VICTORY');
    $('.reverse').attr("src","img/layout/3resized.jpg");
    $('.reverse').css('align-self','center');
}

function wrongGuess() {
    $('.reverse').attr("src","img/layout/4resized.jpg");
    $('body').css('background-image', 'url("./img/layout/red-background.jpg');
    $("#loseModal").modal('show');
    $('.title').html('MAKE ME WISER!');
    $('.title').css('background-color', 'darkred');
    $('.reverse').css('align-self','center');
    $('.main').css('justify-content', 'normal');
    
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    $('.title').html('Guess Who?');
    $('.gameon').toggleClass('gameon box');
    $('.normal').show();
    $('.reverse').css('align-self','flex-start');
    $('.reverse').attr("src","img/layout/1_reversed.png");
    $('#restart').hide();
    $('body').css('background-image', 'url("./img/layout/background.jpg');
    $('.title').css('background-color', 'rgba(11, 180, 180, 0.747)');
    setLastRes(null);
    resetQuest();
}