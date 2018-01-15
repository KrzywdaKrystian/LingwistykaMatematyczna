$(document).ready(function () {

    var grammar = [];
    var index = -1;

    $grammarQuery = $('#grammar-query');
    $grammarCheck = $('#grammar-check');

    $grammarCheck.click(function () {

        grammar = $grammarQuery.val().split('');

        if(is_S_valid()) {
            console.log('isValid');
            $grammarQuery.removeClass('is-invalid').addClass('is-valid');
        }
        else {
            console.log('is not valid');
            $grammarQuery.removeClass('is-valid').addClass('is-invalid');
        }

    });
    
    function is_S_valid() {
        index = -1;
        return is_W_valid() &&
            check_t(';') &&
            is_Z_valid() &&
            index === grammar.length - 1;
    }

    function is_Z_valid() {
        var tmp = index;

        if(is_W_valid()) {
            return check_t(';') &&
                is_Z_valid();
        }
        else {
            index = tmp;
            return true;
        }
    }

    function is_W_valid() {
        return is_P_valid() &&
            is_Wp_valid();
    }

    function is_Wp_valid() {
        var tmp = index;

        if(is_O_valid()) {
            return is_W_valid();
        }
        else {
            index = tmp;
            return true;
        }
    }

    function is_P_valid() {
        var tmp = index;

        if(is_R_valid()) {
            return true;
        }
        else {
            index = tmp;
            return check_t("(") &&
                is_W_valid() &&
                check_t(")");
        }
    }

    function is_R_valid() {
        return is_L_valid() &&
            is_Rp_valid();
    }

    function is_Rp_valid() {
        var tmp = index;

        if(check_t(".")) {
            return is_L_valid();
        }
        else {
            index = tmp;
            return true;
        }
    }

    function is_L_valid() {
        return is_C_valid() &&
            is_Lp_valid();
    }

    function is_Lp_valid() {
        var tmp = index;

        if(is_L_valid()) {
            return true;
        }
        else {
            index = tmp;
            return true;
        }
    }

    function check_t(char) {
        index++;
        return index < grammar.length &&
            grammar[index] === char;
    }

    function is_C_valid() {
        index++;
        return index < grammar.length &&
            "0123456789".indexOf(grammar[index]) != -1;
    }

    function is_O_valid() {
        index++;
        return index < grammar.length &&
            "+-*/^".indexOf(grammar[index]) != -1;
    }
    
});