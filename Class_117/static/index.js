//Create date variable
var date = new Date()
var displayDate = "Date : " + date.toLocaleDateString()

//Load HTML DOM
$(document).ready(function () {
    $("#display_date").html(displayDate)
})
//Define variable to store predicted emotion
var predictedEmotion

//HTML-->JavaScript--->Flask
//Flask--->JavaScript--->HTML

//jQuery selector and click action

$(function () {
    $("#predict_button").click(function () {
        //AJAX call
        var input_data = {
            "text": $("#text").val()
        }
        $.ajax({
            url: "/predict-emotion",
            type: "POST",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                //                 Result Received From Flask ----->JavaScript
                predictedEmotion = result.data.predictedEmotion
                emojiURL = result.data.emotionURL
                // Display Result Using JavaScript----->HTML
                $("#prediction").html(predictedEmotion)
                $("#prediction").css("display", "block")
                $("#emo_img_url").attr("src", emojiURL)
                $("#emo_img_url").css("display", "block")
            },
            //Error function
            error: function (result) {
                alert(result.responseJSON.message)
            }

        });
    });
})