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
  var newGif = $("#gif-input").val().trim();
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
				gifDiv.addClass("giphys");
				var ratingP = $("<p>").text("Rating: " + response.data[i].rating);
				var imageGif = $("<img>");
				imageGif.attr("src", response.data[i].images.downsized.url);
				gifDiv.append(ratingP);
				gifDiv.append(imageGif);
				$('.giphy').append(gifDiv);
			};
		});
	});
}

// Add Functionality to Play/Pause Giphys