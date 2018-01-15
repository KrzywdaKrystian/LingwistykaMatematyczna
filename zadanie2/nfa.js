

var elementIdName = "stage";
var stage = new createjs.Stage(elementIdName);
var canvas = document.getElementById(elementIdName);
var context = canvas.getContext("2d");
var devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
var currentStateName = 'q0';
var blockExist = 0;
function resizeStage() {
    var w = 1000;
    devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
    canvas.width = w * devicePixelRatio;
    canvas.height = canvas.width;

    context.scale(devicePixelRatio, devicePixelRatio);
    stage.update();
}

resizeStage();
window.addEventListener('resize', resizeStage, false);

var statesContainer = new createjs.Container();
statesContainer.name = 'states';
var linesContainer = new createjs.Container();
linesContainer.name = 'lines';

stage.addChild(linesContainer, statesContainer);
stage.update();

// init states
var stateBound = {
    fontSize: 30 * devicePixelRatio,
    fontLetterSize: 20 * devicePixelRatio,
    borderWidth: 2 * devicePixelRatio,
    stateLineWidth: 2 * devicePixelRatio,
    stateArrowSize: 20 * devicePixelRatio,
    width: 80 * devicePixelRatio,
    height: 80 * devicePixelRatio,
    shiftX: 120 * devicePixelRatio
};

var lc = stage.getChildByName('lines');
var sc = stage.getChildByName('states');

function State(name, acceptable, x, y, transition) {
    this.name = name;
    this.acceptable = acceptable;
    this.x = x;
    this.y = y;
    this.transition = transition;
    this.selected = false;
    this.current = false;
    this.bgColor = "#fff"
}

var rowFirstY = canvas.height * 0.10;
var rowThirdY = canvas.height * 0.30;
var rowFifthY = canvas.height * 0.50;
var rowSeventhY = canvas.height * 0.70;
var rowNinthY = canvas.height * 0.90;

var states = [];


states.push(new State('q0', false, canvas.width/2 - stateBound.width/2, rowFirstY, [
    {
        letter: ['a', 'b'],
        to: 'q1'
    }
]));

states.push(new State('q1', false, canvas.width/2 - stateBound.width/2, rowThirdY, [
    {
        letter: ['a'],
        to: 'q4'
    },
    {
        letter: ['a'],
        to: 'q2',
        break: true
    },
    {
        letter: ['b'],
        to: 'q3',
        break: true
    },
    {
        letter: ['b'],
        to: 'q5'
    }
]));

states.push(new State('q2', true, canvas.width/2 - stateBound.width/2 - stateBound.shiftX * 2, rowThirdY, [
    {
        letter: ['b'],
        to: 'q1',
        break: true
    }
]));

states.push(new State('q3', true, canvas.width/2 - stateBound.width/2 + stateBound.shiftX * 2, rowThirdY, [
    {
        letter: ['a'],
        to: 'q1',
        break: true
    }
]));

states.push(new State('q4', true, canvas.width/2 - stateBound.width/2 - stateBound.shiftX, rowFifthY, [
    {
        letter: ['a'],
        to: 'q6'
    }
]));

states.push(new State('q5', true, canvas.width/2 - stateBound.width/2 + stateBound.shiftX, rowFifthY, [
    {
        letter: ['b'],
        to: 'q7'
    }
]));

states.push(new State('q6', true, canvas.width/2 - stateBound.width/2 - stateBound.shiftX, rowSeventhY, [
    {
        letter: ['a'],
        to: 'q6'
    },
    {
        letter: ['a', 'b'],
        to: 'q8'
    }
]));

states.push(new State('q7', true, canvas.width/2 - stateBound.width/2 + stateBound.shiftX, rowSeventhY, [
    {
        letter: ['b'],
        to: 'q7'
    },
    {
        letter: ['a', 'b'],
        to: 'q8'
    }
]));

states.push(new State('q8', true, canvas.width/2 - stateBound.width/2, rowNinthY, [
    {
        letter: ['b'],
        to: 'q9',
        break: true
    },
    {
        letter: ['a'],
        to: 'q10',
        break: true
    }
]));

states.push(new State('q9', true, canvas.width/2 - stateBound.width/2 - stateBound.shiftX * 2, rowNinthY, [
    {
        letter: ['a'],
        to: 'q8',
        break: true
    }
]));

states.push(new State('q10', true, canvas.width/2 - stateBound.width/2 + stateBound.shiftX * 2, rowNinthY, [
    {
        letter: ['a'],
        to: 'q8',
        break: true
    }
]));

/*
states.push(new State('q0', false, stateBound.width / 2 + stateBound.borderWidth, rowFourthY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q1'
    },
    {
        letter: 'b',
        to: 'q8'
    }
]));
states.push(new State('q1', false, stateBound.width / 2 + stateBound.shiftX * 2, rowSecondY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q2'
    },
    {
        letter: 'b',
        to: 'q3',
        break: true
    },
    {
        letter: 'b',
        to: 'q6'
    }
]));
states.push(new State('q2', true, stateBound.width / 2 + stateBound.shiftX * 3, rowFirstY - stateBound.height / 2, [
    {
        letter: 'b',
        to: 'q4'
    }
]));
states.push(new State('q3', true, stateBound.width / 2 + stateBound.borderWidth, rowSecondY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q1',
        break: true
    }
]));
states.push(new State('q4', true, stateBound.width / 2 + stateBound.shiftX * 5, rowFirstY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q5',
        break: true
    }
]));
states.push(new State('q5', true, stateBound.width / 2 + stateBound.shiftX * 7, rowFirstY - stateBound.height / 2, [
    {
        letter: 'b',
        to: 'q4',
        break: true
    }
]));
states.push(new State('q6', true, stateBound.width / 2 + stateBound.shiftX * 4, rowSecondY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q4'
    },
    {
        letter: 'b',
        to: 'q7',
        break: true
    }
]));
states.push(new State('q7', true, stateBound.width / 2 + stateBound.shiftX * 6, rowSecondY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q6',
        break: true
    }
]));
states.push(new State('q8', false, stateBound.width / 2 + stateBound.shiftX * 2, rowSixthY - stateBound.height / 2, [
    {
        letter: 'a',
        to: 'q10',
        break: true
    },
    {
        letter: 'a',
        to: 'q13'
    },
    {
        letter: 'b',
        to: 'q9'
    }
]));
states.push(new State('q9', true, stateBound.width / 2 + stateBound.shiftX * 3, rowSeventhY - stateBound.height / 2,[
    {
        letter: 'a',
        to: 'q11'
    }
]));
states.push(new State('q10', true, stateBound.width / 2 + stateBound.borderWidth, rowSixthY - stateBound.height / 2, [
    {
        letter: 'b',
        to: 'q8',
        break: true
    }
]));*/

function midpoint(x1, y1, x2, y2) {
    var x = x1, y = y1;
    if(x2 > x1) {
        x = (x2 - x1) / 2 + x1;
    }
    else if (x2 < x1) {
        x = (x1 - x2) / 2 + x2;
    }

    if(y2 > y1) {
        y = (y2 - y1) / 2 + y1;
    }
    else if(y2 < y1) {
        y = (y1 - y2) / 2 + y2;
    }

    return [x, y];
}

var arrowSize = 20 * devicePixelRatio;

function createState(state) {
    var q = new createjs.Container();
    q.x = state.x;
    q.y = state.y;
    q.name = state.name;
    q.transition = state.transition;

    var circle = new createjs.Shape();

    var borderColor = "#000";
    var bgColor = "#FFF";
    if(state.selected) {
        borderColor = state.bgColor ? state.bgColor : "#ff7c57";
    }
    if(currentStateName === state.name) {
        bgColor = "#ff7c57";
    }
    else if(state.acceptable) {
        bgColor = "#9BFF9A";
    }

    circle.graphics
        .beginFill(bgColor)
        .setStrokeStyle(state.selected ? 2 * stateBound.borderWidth : stateBound.borderWidth)
        .beginStroke(borderColor)
        .drawCircle(0, 0, stateBound.width / 2);

    var label = new createjs.Text(state.name, (stateBound.fontSize) + "px Arial", "#000000");
    label.textBaseline = "middle";
    label.textAlign = "center";

    if(state.transition && state.transition.length > 0) {
        state.transition.forEach(function (t) {

            var nextState = null;

            states.forEach(function (nt) {
                if(t.to === nt.name) {
                    nextState = nt;
                }
            });
            if(nextState) {

                var containerForLine = new createjs.Container();
                var line = new createjs.Shape();

                line.graphics.setStrokeStyle(stateBound.stateLineWidth);
                line.graphics.beginStroke("#191919");

                var lineY;


                if(nextState.name === state.name) {

                    line.graphics.moveTo(state.x, state.y);
                    line.graphics.lineTo(state.x + stateBound.width, state.y + stateBound.height/2);
                    line.graphics.moveTo(state.x + stateBound.width, state.y + stateBound.height/2);
                    line.graphics.lineTo(state.x + stateBound.width, state.y - stateBound.height/2);
                    line.graphics.moveTo(state.x + stateBound.width, state.y - stateBound.height/2);
                    line.graphics.lineTo(state.x, state.y);

                    line.graphics.endStroke();

                    var letter = new createjs.Text(getLetter(t.letter), (stateBound.fontLetterSize) + "px Arial", "#000000");
                    letter.textBaseline = "middle";
                    letter.textAlign = "center";
                    letter.x = state.x + stateBound.width;
                    letter.y = state.y;

                    var circleLetter = new createjs.Shape();
                    circleLetter.graphics
                        .beginFill("#f2f2f2")
                        .setStrokeStyle(stateBound.borderWidth)
                        .beginStroke("#000")
                        .drawCircle(letter.x, letter.y, 18 * devicePixelRatio);

                    var arrow = new createjs.Shape();
                    arrow.graphics.beginFill("#000000").drawRect(letter.x - arrowSize/2, letter.y - arrowSize, arrowSize, arrowSize);

                    containerForLine.addChild(line, arrow, circleLetter, letter);

                    lc.addChild(containerForLine);
                } else {


                    if(t.break) {
                        line.graphics.moveTo(state.x, state.y);
                        var diff = nextState.x - state.x;
                        line.graphics.moveTo(state.x, state.y);
                        if(nextState.x > state.x) {
                            lineY = nextState.y - stateBound.shiftX/2;
                        }
                        else {
                            lineY = nextState.y + stateBound.shiftX/2;
                        }
                        line.graphics.lineTo(nextState.x - diff/2, lineY);
                        line.graphics.moveTo(nextState.x - diff/2, lineY);
                        line.graphics.lineTo(nextState.x, nextState.y);
                    }
                    else {
                        line.graphics.moveTo(state.x, state.y);
                        line.graphics.lineTo(nextState.x, nextState.y);
                    }
                    line.graphics.endStroke();

                    var letter = new createjs.Text(getLetter(t.letter), (stateBound.fontLetterSize) + "px Arial", "#000000");
                    letter.textBaseline = "middle";
                    letter.textAlign = "center";

                    var mid = midpoint(nextState.x, nextState.y, state.x, state.y);
                    letter.x = mid[0];
                    letter.y = mid[1];

                    if(t.break) {
                        if(nextState.x > state.x) {
                            letter.y = letter.y - stateBound.shiftX/2;
                        }
                        else if(nextState.x < state.x) {
                            letter.y = letter.y + stateBound.shiftX/2;
                        }
                    }

                    var circleLetter = new createjs.Shape();
                    circleLetter.graphics
                        .beginFill("#f2f2f2")
                        .setStrokeStyle(stateBound.borderWidth)
                        .beginStroke("#000")
                        .drawCircle(letter.x, letter.y, 18 * devicePixelRatio);

                    var arrow = new createjs.Shape();
                    var arrowX = letter.x;
                    var arrowY = letter.y;
                    if(nextState.x > state.x) {
                        // w prawo
                    }
                    else if(nextState.x < state.x) {
                        // lewo
                        arrowX = arrowX - arrowSize;
                    }

                    if(nextState.y > state.y) {
                        // w dol


                    }
                    else if (nextState.y < state.y) {
                        arrowY = arrowY - arrowSize;
                    }
                    else {

                        arrowY = arrowY - arrowSize / 2;
                    }

                    arrow.graphics.beginFill("#000000").drawRect(arrowX, arrowY, arrowSize, arrowSize);

                    containerForLine.addChild(line, arrow, circleLetter, letter);

                    lc.addChild(containerForLine);

                }
            }

        })
    }

    q.addChild(circle, label);
    return q;
}

function getLetter(letter) {
    var l = "";

    if(letter instanceof Array) {
        letter.forEach(function (t, k) {
            l += t + (k < letter.length-1 ? "," : "")
        })
    } else {
        l = letter;
    }

    return l;
}

function findStateByName(name) {
    var ret = null;
    states.forEach(function (s, index) {
       if(s.name == name) {
           ret = {
               state: s,
               index: index
           };
       }
    });
    return ret;
}

function drawNFA(string) {

    // clear states
    states.forEach(function (s) {
        s.selected = false;
    });
    blockExist = 0;
    var statesOrderToSelected = [];
    // select states
    if(string && string.length > 0) {
        var stringAsArray = string.split('');

        function selectState(currentState, index, order) {

            for( var i = 0; i < currentState.transition.length; i++) {

                if(currentState.transition[i].letter.indexOf(stringAsArray[index]) > -1) {

                    var tmp = findStateByName(currentState.transition[i].to)['state'];
                    var newOrder = order.slice(); // copy array
                    newOrder.push(currentState.transition[i].to);

                    if(string.length === newOrder.length-1) {
                        statesOrderToSelected.push(newOrder);
                    }

                    selectState(tmp, index + 1, newOrder)
                }

            }
        }

        selectState(states[0], 0, ['q0']);

    }

    var colors = ['#ff7c57', '#6c6dff', '#6aff94', '#ffb71b'];
    if(statesOrderToSelected.length > 0) {
        statesOrderToSelected.forEach(function (arr, key) {
            arr.forEach(function (t) {
                states[findStateByName(t)['index']]['bgColor'] = colors[key];
                states[findStateByName(t)['index']]['selected'] = true;
            })
        })
    }

    // draw states
    lc.removeAllChildren();
    sc.removeAllChildren();
    states.forEach(function (s) {
        sc.addChild(createState(s));
    });

    stage.update();
}

drawNFA("");



$(document).ready(function () {

    $("#nfa-string").on('input',function(e){
        var string = "";
        var val = $(this).val().split('');

        $("#nfa-string").removeClass('alert alert-danger');
        val.forEach(function (char) {
            if(char === 'a' || char === 'b') {
                string += char
            }
            else {
                $("#nfa-string").addClass('alert alert-danger');
                return false;
            }
        });

        if(!$("#nfa-string").hasClass('alert')) {
            drawNFA(string)
        }


    });

});