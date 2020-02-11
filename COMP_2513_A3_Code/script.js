$(document).ready(function() {
	$("#movie").change(function(){
		getMovieData();
	});
});

/* getMovieData() finds selected movie, plays spinning gif, and 
 * retrieves Json data from a remote URL.
 * If Json object is successfully found, it is then parsed through
 * parseJsonResponse and the data is sent back to the HTML file.
 * If Json object is not successfully found, an error alert is sent.
 */
function getMovieData() {

	$("#movieData").html("");

	var selectedMovie = $("#movie").find(":selected").text();
	var selectedMovieId = $("#movie").find(":selected").val();

	if (selectedMovieId != "") {
		$("#gif").toggle();

		var movieUrl = "https://ghibliapi.herokuapp.com/films/" + selectedMovieId;

		$.ajax({
			type: "GET",
			url: movieUrl,
			dataType: "json",
			success: function(json){
				var movieString = parseJsonResponse(json);
				$("#gif").toggle();
				$("#movieData").html(movieString);
			},
			error: function() {
				alert("Error: Issue occurred while processing data.");
			}
		})
	}
}


/* parseJsonResonse() takes in a Json object and then parses it
 * for the desired items below. These items are then put into a
 * string and then returned.
 */
function parseJsonResponse(json) {
	
	var title = json.title;
	var description = json.description;
	var director = json.director;
	var producer = json.producer;
	var release_date = json.release_date;
	var rt_score = json.rt_score;

	var movieString = "<h2>" + title + "</h2>";
	movieString += "<ul>";
	movieString += "<li><b>Description: </b>" + description + "</li>";
	movieString += "<li><b>Director: </b>" + director + "</li>";
	movieString += "<li><b>Producer: </b>" + producer + "</li>";
	movieString += "<li><b>Year: </b>" + release_date + "</li>";
	movieString += "<li><b>Score: </b>" + rt_score + "%</li>";
	movieString += "</ul>";
	return movieString;

}