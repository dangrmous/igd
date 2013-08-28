/**
 * Created with JetBrains PhpStorm.
 * User: geoffreyunger
 * Date: 6/29/13
 * Time: 5:11 PM
 */

$(document).ready(function () {







    $("#inputForm").submit(function () {
        return false;
    });


    $("#postToFacebook").click(function () {
        FB.init({
                appId: 'FACEBOOK APP ID',
                channelUrl: '//localhost.com/igd/channel.html'
            });

            FB.login(function(){
                //Handle the response
            }, {scope:'publish_actions'});

    });

    $("#submitButton").click(function () {
        //console.log("#submitButton clicked\n");
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
        function successHandler(location) {
            action = "updateStatus";
            currentLatitude = location.coords.latitude;
            currentLongitude = location.coords.longitude;
            status = $("input[name='drinkingRadio']:checked").val();
            comment = $("#commentBox").val();
            password = $("#password").val();
            postData = {"action": action, "password": password, "status": status, "comment": comment, "latitude": currentLatitude, "longitude": currentLongitude};

            $.post("service.php", postData, function (data) {
                if (data.status == 'success') {
                    $("#resultMsg").css("color", "green");
                    $("#resultMsg").css("display", "none");
                    $("#resultMsg").text(data.message);
                    $("#resultMsg").fadeIn(500);
                    $("#resultMsg").fadeOut(2000);
                }

                else if (data.status == 'fail') {
                    $("#resultMsg").css("color", "red");
                    $("#resultMsg").css("display", "none");
                    $("#resultMsg").text(data.message);
                    $("#resultMsg").fadeIn(500);
                    $("#resultMsg").fadeOut(2000);

                }
            }, "json");

            updateFacebookStatus(comment);

        };


        function errorHandler(error) {
            alert('Attempt to get location failed: ' + error.message);
        };

        function updateFacebookStatus(messageContents){

        if($("input#postToFacebook:checked").val())
        {
            var body = 'http://isgeoffdrinking.com was just updated! \n\n \"' + messageContents + '\"';
            FB.api('/me/feed', 'post', { message: body }, function(response) {
              if (!response || response.error) {
                console.log('Error occured');
              } else {
                console.log('Post ID: ' + response.id);
              }
            });
        }
        };

    });
});