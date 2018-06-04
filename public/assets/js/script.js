$(document).ready(function () {
    // // animate the Ryan Drachenberg Image ***************************
    $("#imgDiv").hover(function(){
        $("#bioPic").stop().animate({ height: "68%", width: "68%" });
    },
    function(){
        $("#bioPic").stop().animate({ height: "133.25px", width: "200px" });
    });
    // end animation the Ryan Drachenberg Image text***************************

    $(".submit").click(function () {
        window.location.replace = "../../index.html";
    });
});
// end document.ready function***********************************************************************************


