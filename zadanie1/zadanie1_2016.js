
var readline = require('readline');
var colors = require('colors');

var currentState = 0;
var coins = [1, 2, 5];
var price = 7;

var states = [
    //stan 0
    [1, 2, 5],
    //stan 1
    [2, 3, 6],
    //stan 2
    [3, 4, 7],
    //stan 3
    [4, 5, 8],
    //stan 4
    [5, 6, 8],
    //stan 5
    [6, 7, 8],
    //stan 6
    [7, 8, 8],
    //stan 7
    [1, 2, 5],
    //stan 8
    [1, 2, 5]
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    var msg = "\nObecny stan: "+ currentState;
    console.log(new String(msg).yellow);

    if(currentState > 7){
        console.log("Zwrot pieniedzy".red);
    }

    rl.question('Wprowadz monete: ', (coin) => {
        var index = coins.indexOf(parseInt(coin));

        if(index > -1) {
            currentState = states[currentState][index];
            console.log('idz do stanu ' + currentState);
        }
        else {
            console.log('moneta niedopuszczalna'.red + " (znak nienalezy do alfabetu)");
        }

        if(currentState == 7){
            console.log("Wydano bilet".green);
        }

        main();
    });

}

main();