var gQuestsTree = loadFromStorage('questTree', []);;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;


function createQuestsTree() {

    if (gQuestsTree.length === 0) {

        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');

        gCurrQuest = gQuestsTree;

        gPrevQuest = null;
    } else {
        gCurrQuest = gQuestsTree;
    }
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}
function setLastRes(res) {
    gLastRes = res;
}

function addGuess(newQuestTxt, newGuessTxt) {
    gPrevQuest[gLastRes] = createQuest(newQuestTxt);
    gPrevQuest[gLastRes].yes = createQuest(newGuessTxt);
    gPrevQuest[gLastRes].no = createQuest(gCurrQuest.txt);
}

function resetQuest() {
    gCurrQuest = gQuestsTree;
}