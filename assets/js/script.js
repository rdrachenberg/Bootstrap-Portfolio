// $(document).ready(function () {

// // animate the Ryan Drachenberg Image ***************************
$(document).ready(function(){
    $("#imgDiv").hover(function(){
        $("#bioPic").stop().animate({ height: "+=25%", width: "+=25%" });
    },
    function(){
        $("#bioPic").stop().animate({ height: "-=25%", width: "-=25%" });
    });
});
// end animation the Ryan Drachenberg Image text***************************
