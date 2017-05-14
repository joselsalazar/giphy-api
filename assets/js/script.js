// Create Base Array
var animals = [
	"birds", "fish", "tiger", "lion", "cat", "dog", "wolf", "pug"
];

// Generate Buttons From Array

for (var i = 0; i < animals.length; i++) {
	var a = $("<button>");
	a.addClass("animals");
	a.attr("value", animals[i]);
	a.html(animals[i]);
	$('.buttons').append(a);
};

// Pull AJAX Info From Giphy
	var APIKey = "dc6zaTOxFJmzC";
	var animalSelected = "";

// Bind Display AJAX to button clicks
	$('.animals').click(function(){
		animalSelected = $(this).attr("value");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalSelected + "&api_key=" + APIKey;
		console.log(animalSelected);

// Display AJAX Info From Giphy
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$('.giphy').empty();
			for (var i=0; i < 10; i++) {
				$('.giphy').append("<img src=" + response.data[i].images.downsized.url + ">");
			};
		});
	});

// Add Functionality to Play/Pause Giphys

// Add Functionality to Push to Array