/**
 * Created with JetBrains PhpStorm.
 * User: geoffreyunger
 * Date: 6/29/13
 * Time: 5:11 PM
 */

$(document).ready(function () {

    var igd = {};
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

$(':button').click(function(){
    var formData = new FormData($('form')[0]);
    $.ajax({
        url: 'service.php',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        //beforeSend: beforeSendHandler,
        //success: completeHandler,
        //error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });
});

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}

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

