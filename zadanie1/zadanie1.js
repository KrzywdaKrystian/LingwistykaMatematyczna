var readline = require('readline');
var colors = require('colors');

var string = '';
var state = 0;
var stateAccept = [2, 3];
var alphabet = ['a', 'b'];
var states = [
    { // z q0
        a: 1,
        b: 0
    },
    { // z q1
        a: 3,
        b: 2
    },
    { // z q2
        a: 1,
        b: 0
    },
    { // z q3
        a: 3,
        b: 0
    }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    var msg = "\nObecny stan: "+ state;
    console.log(new String(msg).yellow);

    rl.question('Wprowadz a lub b: ', (char) => {
        var index = alphabet.indexOf(char);

        if(index > -1) {
            state = states[state][char];
            console.log('idz do stanu ' + state);
            string = string + '' + char;
            console.log('lancuch ' + string);
            if(stateAccept.indexOf(state) > -1) {
                console.log('Stan ackeptowalny'.green);
            }
        }
        else {
            console.log('znak nienalezy do alfabetu'.red);
        }


    main();
});
}

main();