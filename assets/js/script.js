// Create Base Array
var animals = [
	"birds", "fish", "tiger", "lion", "cat", "dog", "wolf", "pug", "shaq"
];

// AJAX Variables
	var APIKey = "dc6zaTOxFJmzC";
	var animalSelected = "";

// Generate Buttons From Array
function renderGifs() {
	$('.buttons').empty();
	for (var i = 0; i < animals.length; i++) {
		var a = $("<button>");
		a.addClass("animals");
		a.attr("value", animals[i]);
		a.html(animals[i]);
		$('.buttons').append(a);
	};
};

renderGifs();
assignGifs();

// Add Functionality to Push to Array
$("#add-gif").click(function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
  var newGif = $("#gif-input").val().trim().toLowerCase();
  animals.push(newGif);

  $('#gif-input').val("");
  renderGifs();
  assignGifs();
});

// Bind Display AJAX to button clicks
function assignGifs () {
	$('.animals').click(function(){
		animalSelected = $(this).attr("value");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalSelected + "&api_key=" + APIKey;
		console.log(animalSelected);

// Display AJAX Info From Giphy
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			$('.giphy').empty();
			for (var i=0; i < 10; i++) {
				var gifDiv = $("<div>");
				gifDiv.addClass("gif-div");
				var ratingP = $("<p>").text("Rating: " + response.data[i].rating);
				var imageGif = $("<img>");
				imageGif.attr("data-animate", response.data[i].images.downsized.url);
				imageGif.attr("data-still", response.data[i].images.downsized_still.url);
				imageGif.attr("gif-state", "animate");
				imageGif.attr("src", response.data[i].images.downsized.url)
				imageGif.addClass("gif");
				gifDiv.append(ratingP);
				gifDiv.append(imageGif);
				$('.giphy').append(gifDiv);
			};
			// Add Functionality to Play/Pause Giphys
			$(".gif").on("click", function() {
				var state = $(this).attr("gif-state");
				if (state === "animate") {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("gif-state", "still");
				} else {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("gif-state", "animate");
				}
			});
		});
	});
}

