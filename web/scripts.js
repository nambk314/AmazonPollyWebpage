var API_ENDPOINT = "https://zn6klkoqjb.execute-api.us-east-1.amazonaws.com/dev"

//Welcome Mess PostID: 295a896e-a77a-40e0-bd74-ae654b7c3bb7
var postId = "New Post";

//Create Dictionary for getting the ID:
var dict = new Object();
dict['welcomeMessage'] = "295a896e-a77a-40e0-bd74-ae654b7c3bb7";


var callback = function(response) {
    postId = response;
    document.getElementById("postIDreturned").textContent=response;
    
}

document.getElementById("addButton").onclick = function(){

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
	      success: function (response) {
					document.getElementById("postIDreturned").textContent=response;
                    
                    console.log("Id post 1 is: " + postId);
	      },
	      error: function () {
	          alert("error");
	      },
	  });
}
// Function to show the play message.
document.getElementById("showPlayer").onclick = function(){

	postId = document.getElementById("postIDreturned").textContent;


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
//Function to show the play message that match the text in the button
document.getElementById("welcomeMessage").onclick = function(){
    
    var key = document.getElementById("welcomeMessage").textContent;
	postId = dict.welcomeMessage;


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
