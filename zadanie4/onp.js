$(document).ready(function () {

    var $query = $('#onp-query');
    var $btn = $('#onp-count');
    var $table = $('#onp-table');

    function count(arr) {

        function printStack(stack) {
            var ret = '';

            stack.forEach(function (t) {
                ret += t + ' ';
            });

            return ret;
        }

        var tr = "";
        var stack = [];

        $table.find('tbody').html('');

        arr.forEach(function (input) {

            if(!isNaN(input)) {
                stack.push(input);
            }
            else {
                var tmp1, tmp2;
                switch (input) {
                    case '+':
                        tmp1 = stack.pop();
                        tmp2 = stack.pop();
                        stack.push(parseFloat(tmp2) + parseFloat(tmp1));
                        break;
                    case '-':
                        tmp1 = stack.pop();
                        tmp2 = stack.pop();
                        stack.push(parseFloat(tmp2) - parseFloat(tmp1));
                        break;
                        break;
                    case '*':
                        tmp1 = stack.pop();
                        tmp2 = stack.pop();
                        stack.push(parseFloat(tmp2) * parseFloat(tmp1));
                        break;
                    case '/':
                        tmp1 = stack.pop();
                        tmp2 = stack.pop();
                        stack.push(parseFloat(tmp2) / parseFloat(tmp1));
                        break;
                    case '^':
                        tmp1 = stack.pop();
                        tmp2 = stack.pop();
                        stack.push(Math.pow(parseFloat(tmp2), parseFloat(tmp1)));
                        break;
                }
            }
            tr += '<tr><td>' + input + '</td><td>' + printStack(stack) + '</td><td></td></tr>';

        });

        tr += '<tr><td></td><td></td><td>' + stack[0] + '</td></tr>';
        $table.append(tr);
        return stack[0];
    }

    $btn.click(function () {
        var split = $query.val().split(' ');
        count(split);
    });


    // for test
    // console.log(count([2, 5, '*', 1, '+', 2, '/']));
    // console.log(count([7, 3, '+', 5, 2, '-', '2', '^', '*']));

});


