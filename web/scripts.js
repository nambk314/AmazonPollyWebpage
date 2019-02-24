var API_ENDPOINT = "https://zn6klkoqjb.execute-api.us-east-1.amazonaws.com/dev"

var postId = "New Post";

var callback = function(response) {
    postId = response;
    document.getElementById("postIDreturned").textContent=response;
    
}

document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val()
	};
    //var postId ="";
	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
          async: false,
	      success: function (response) {
					document.getElementById("postIDreturned").textContent=response;
                    postId = document.getElementById("postIDreturned").textContent;
                    console.log("Id post 1 is: " + postId);
	      },
	      error: function () {
	          alert("error");
	      },
	  });
    
//    $.ajax({
//	      url: API_ENDPOINT,
//	      type: 'POST',
//	      data:  JSON.stringify(inputData)  ,
//	      contentType: 'application/json; charset=utf-8',
//	      success: callback,
//	      error: function () {
//	          alert("error");
//	      },
//	  });
   
    //Show the post in the list
    //postId = $('#postIDreturned').val();
    console.log("Id post is: " + postId);

	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
    
}


document.getElementById("searchButton").onclick = function(){

	var postId = $('#postId').val();


	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
