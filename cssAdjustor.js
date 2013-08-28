/**
 * Created with JetBrains PhpStorm.
 * User: geoff
 * Date: 6/6/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function(){
    adjustCSS();
    $(window).resize(function(){
        adjustCSS();
    });
    setInterval(function(){
        $("h1").animate({"color": "red"}, 2000);
           $("#main").animate({"background-color":"yellow"}, 2000);
           $("h1").animate({"color": "green"}, 2000);
           $("#main").animate({"background-color":"purple"}, 2000);
           $("h1").animate({"color": "orange"}, 2000);
           $("#main").animate({"background-color":"red"}, 2000);
           $("h1").animate({"color": "blue"}, 2000);
           $("#main").animate({"background-color":"blue"}, 2000);
           $("h1").animate({"color": "purple"}, 1000);
           $("#main").animate({"background-color":"orange"}, 2000);
           $("h1").animate({"color": "yellow"}, 2000);

})
});

function adjustCSS(){

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var padding = (windowHeight / 10);
    var fontSize = windowHeight / 5;
    //console.log("width: " + windowWidth + "\nHeight: " + windowHeight + "\nPadding: " + padding + "\n");
    //$("#main").css("padding", ((windowHeight / 3) - 100) + "px");
    $("h1").css("font-size", windowHeight / 5 + "px");


}

