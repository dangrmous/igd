/**
 * Created with JetBrains PhpStorm.
 * User: geoffreyunger
 * Date: 6/29/13
 * Time: 5:11 PM
 */

var igd = {};

$(document).ready(function () {


    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    function successHandler(location) {
        igd.currentLatitude = location.coords.latitude;
        igd.currentLongitude = location.coords.longitude;
        igd.status = "success";
    }

    function errorHandler(location) {
        alert("Unable to get current location!");
        igd.status = "fail";
    }


    $.post('service.php', {"action": "getFBAppID"}, function (data) {
        igd.FBappID = data.FBAppID;
    }, "json");

    $("#postToFacebook").click(function () {

        FB.init({
            appId: igd.FBappID,
            channelUrl: '//localhost.com/igd/channel.html'
        });

        FB.login(function () {
            //Handle the response
        }, {scope: 'publish_actions'});

    });
})

$('#submitButton').click(function(){
    var formData = new FormData(document.forms.namedItem("inputForm"));
    formData.append("action", "updateStatus");
    formData.append("latitude", igd.currentLatitude);
    formData.append("longitude", igd.currentLongitude);
    response = $.ajax({
        url: 'service.php',  //Server script to process data
        type: 'POST',
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false,
        success: successFunction() //NOT the same as completing the request/response dialog
    }).done(function(){ //Do something after the response comes back
            completedFunction(response.responseText)
        });
});

function successFunction(){
    //Some code could go here which would execute right after
    //the post is sent
};

function completedFunction(serverResponse){ //Called after request and response from server


};

updateFacebookStatus($("commentBox").val);

function updateFacebookStatus(messageContents) {

    if ($("input#postToFacebook:checked").val()) {
        var body = 'http://isgeoffdrinking.com was just updated! \n\n \"' + messageContents + '\"';
        FB.api('/me/feed', 'post', { message: body }, function (response) {
            if (!response || response.error) {
                console.log('Error occured');
                igd.status = "fail";
            } else {
                console.log('Post ID: ' + response.id);

            }
        });
    }

}

function displayStatusMessage(status) {
    if (status == 'success') {
        $("#resultMsg").css("color", "green");
        $("#resultMsg").css("display", "none");
        $("#resultMsg").text(data.message);
        $("#resultMsg").fadeIn(500);
        $("#resultMsg").fadeOut(2000);
    }

    else if (status == 'fail') {
        $("#resultMsg").css("color", "red");
        $("#resultMsg").css("display", "none");
        $("#resultMsg").text(data.message);
        $("#resultMsg").fadeIn(500);
        $("#resultMsg").fadeOut(2000);

    }
}

