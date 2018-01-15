$(document).ready(function () {

    var index = 0;
    var turing = [];
    var isFinish = false;

    var currentState = 0;
    var interval = null;

    var $turingQuery = $('#turing-query');
    var $turingCount = $('#turing-count');
    var $turingBody = $('#turing-body');
    var $table = $('#turing-table tr');
    var $head = $('#head');
    var $turingStart = $('#turing-start');
    var $turingStep = $('#turing-step');
    var $turingFast = $('#turing-fast');
    var $turingReset = $('#turing-reset');
    var $currentState = $('#current-state');

    var start = function () {

        $('.table-row').removeClass('table-danger')
            .removeClass('table-success');

        index = 0;
        turing = [];
        isFinish = false;
        currentState = 0;
        interval = null;

        // create array of chars from input string
        turing = $turingQuery.val().split('');

        // set tape
        setTape();

        // set head
        setHead();
    };

    var setHead = function () {
        var widtOneCell = ($turingBody.outerWidth() / turing.length) / $turingBody.outerWidth() * 100;
        $head.css({
            'left': (index / (turing.length) * 100 + widtOneCell / 2) + '%'
        });
    };

    var setTape = function () {
        $table.html('');
        $turingBody.removeClass('hide');


        // fill table
        turing.forEach(function (char) {
            $table.append('<td>' + char + '</td>')
        });
    };

    var error = function () {
        $('.table-row').addClass('table-danger');
        isFinish = true;
    };

    var move = function () {

        if(isFinish) {
            if(currentState === 6) {
                $('.table-row').addClass('table-success');
            }
            else {
                error();
            }
            clearInterval(interval);
            return;
        }

        // var state = states[currentState];
        var char = turing[index];

        switch (currentState) {

            // state q0
            case 0:
                if (char === '0' ||
                    char === '1' ||
                    char === '#') {
                    currentState = 1;
                    index++;
                }
                else if (char === 'E') {
                    currentState = 0;
                    index++;
                }
                else {
                    error();
                }
                break;

            // state q1
            case 1:
                if (char === '0' ||
                    char === '1' ||
                    char === '#') {
                    currentState = 1;
                    index++;
                }
                else if (char === 'E') {
                    currentState = 2;
                    index--;
                }
                else {
                    error();
                }
                break;

            // state q2
            case 2:
                if (char === '0') {
                    currentState = 2;
                    turing[index] = '1';
                    index--;
                }
                else if (char === '1') {
                    currentState = 3;
                    turing[index] = '0';
                    index--;
                }
                else if (char === '#') {
                    currentState = 5;
                    index++;
                }
                else if (char === 'E')  {
                    error();
                }
                else {
                    error();
                }
                break;

            // state q3
            case 3:
                if (char === '0' ||
                    char === '1') {
                    currentState = 3;
                    index--;
                }
                else if (char === '#') {
                    currentState = 4;
                    index--;
                }
                else if (char === 'E') {
                    error();
                }
                else {
                    error();
                }
                break;

            // state q4
            case 4:
                if (char === '0' ||
                    char === 'E') {
                    currentState = 1;
                    turing[index] = '1';
                    index++;
                }
                else if (char === '1') {
                    currentState = 4;
                    turing[index] = '0';
                    index--;
                }
                else if (char === '#') {
                    error();
                }
                else {
                    error();
                }
                break;

            // state q5
            case 5:
                if (char === '0') {
                    currentState = 5;
                    turing[index] = '0';
                    index++;
                }
                else if (char === '1') {
                    currentState = 5;
                    turing[index] = '0';
                    index++;
                }
                else if (char === '#') {
                    error();
                }
                else if (char === 'E') {
                    currentState = 6;
                    isFinish = true;
                    $currentState.html('q' + currentState);
                }
                else {
                    error();
                }
                break;

            // state q6
            case 6:
                isFinish = true;
                break;
        }

        $currentState.html('q' + currentState);
        setTape();
        setHead();

    };

    $turingCount.click(function () {
        start();
    });

    $turingReset.click(function () {
        if(interval !== null) {
            clearInterval(interval);
        }
        start();
    });

    $turingStep.click(function () {
        move();

    });

    $turingStart.click(function () {
        interval = setInterval(function () {
            if(isFinish) {
                clearInterval(this);
            }
            move();
        }, 1000);

    });

    $turingFast.click(function () {
        interval = setInterval(function () {
            if(isFinish) {
                clearInterval(this);
            }
            move();
        }, 100);

    });

});