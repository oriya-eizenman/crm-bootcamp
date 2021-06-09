// var testfunction = function() {

//     var selector = document.querySelector('body');
//     selector.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);

// }

$(function () {
    $("#button").click(function () {
        $("#button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function () {
            $("#button").removeClass("onclic");
            $("#button").addClass("validate", 450, callback);
        }, 2250);
    }
    function callback() {
        setTimeout(function () {
            $("#button").removeClass("validate");
        }, 1250);
    }
});