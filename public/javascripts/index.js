$( document ).ready(function() {


  function processImage(callback) {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = "e9ddc5969a2c474ca5fbc36e32a9a3a5";

    // NOTE: You must use the same region in your REST call as you used to
    // obtain your subscription keys. For example, if you obtained your
    // subscription keys from westus, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the westcentralus region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    var uriBase =
        "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        callback(null, data);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
        callback(errorString, null);
    });
  };

  wrapperClean = function(){
    $("#wrapper, #wrapper-error").hide();
    $("#wrapper").removeClass("columns");
    $(".loading").show();
    $("#response_age, #response_sexe, .error-container").html();
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $(".btn-detect").on("click", function(event){
    event.preventDefault();

    wrapperClean();

    processImage(function(err, data){
      console.log(err, data);
      if(data && data[0] && data[0].faceAttributes){
        var faceAttributes = data[0].faceAttributes;

        if(faceAttributes.age) $("#response_age").html(faceAttributes.age);
        if(faceAttributes.gender && faceAttributes.gender == 'female'){
          $("#response_sexe").html("Femme");
        }else if(faceAttributes.gender){
          $("#response_sexe").html("Homme");
        }

        $(".loading").hide();
        $("#wrapper").addClass("columns");
        $("#wrapper").show();
      }else {
        console.log("========= ", err);
        $(".loading").hide();
        $("#wrapper-error").show();
        if(err) $(".error-container").html(err);
      }



    });
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
