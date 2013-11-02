/**
 * Created with JetBrains PhpStorm.
 * User: geoff
 * Date: 6/6/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */

var main = {};

$(document).ready(function () {
    adjustCSS();

    $.post("service.php", {"action": "getStatus"},
        function (data) {
            updateDisplay(data);

        }, "json");

    $("#showMap").click(function () {
        showTheMap();
    });

    $(window).resize(function () {
        adjustCSS();
    });

});


function showTheMap() {
    var map;

    function initialize() {
        $.post("service.php", {"action": "getStatus"},
            function (data) {
                console.log("Data is: \n". data);
                //Create the map
                var latlng = new google.maps.LatLng(data.latitude, data.longitude);
                var mapOpts = {
                    zoom: 18,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("map_canvas"), mapOpts);
                //Add the marker with an information window
                var info_window = new google.maps.InfoWindow({content:''});
                var opts = {
                    map:map,
                    position:latlng
                }
                var marker = new google.maps.Marker(opts);
                var info = "<p>" + data.comment + "<br>" + "Here since: " + data.created + "</p>";
                if (data.image != null){
                    info += '<img src="' + data.image + '" width=' + (main.windowWidth / 4) + '>';
                }
                info_window.content = info;
                info_window.open(map,marker);

            }, "json");


    }

    initialize();
    $("#main").hide();
    $("#map_canvas").show();
}
function updateDisplay(data) {
        console.log(data);
    if ((data.status == 1) || (data.status == 2)) {
        $("#main").css("background-color", "green");
        $("h1").text("Yes");
        $("h2.index").text("Where?");
    }

    if (data.status == 0) {
        $("h1").text("No");
        $("#main").css("background-color", "red");
    }

    //$("h1").text(data);

}


function adjustCSS() {

    var windowWidth = $(window).width();
    main.windowWidth = windowWidth;
    var windowHeight = $(window).height();
    var windowAverage = (windowHeight + windowWidth) / 2;
    var padding = (windowHeight / 10);

    //console.log("width: " + windowWidth + "\nHeight: " + windowHeight + "\nPadding: " + padding + "\n");
    //$("#main").css("padding", ((windowHeight / 3) - 100) + "px");
    $("h1").css("font-size", windowAverage / 5 + "px");
    $("h2.main").css("font-size", windowAverage / 10 + "px");


}

