// create array with set buttons
var topics = ["dog", "cat", "bird", "hamster", "rabbit"];
// click function for submit button
$("#submit").on("click", function() {
  event.preventDefault();
  // variable with user input 
  var newAnimal = $("#addAnimal").val().trim();
  // pushes user input to array
  topics.push(newAnimal);
  buttons();
});
// function to add button for user input
function buttons(){
  $("#topics").empty();
    for (var i = 0; i < topics.length; i++) {
    var buttons = $('<button>').text(topics[i]).attr("data-animal",topics[i]).attr("class","animal-button");
    buttons.appendTo(`#topics`);
  }
};
buttons();
// click function for animal buttons
$(document).on("click", ".animal-button",function() {
  // stores data-animal property of button clicked
  var animal = $(this).attr("data-animal");
  // queryURL with animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=T5vrR1h7Ll5pbTjbe94swRmMTgoYWZjQ&limit=10";
    // AJAX request with queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      // store request data in var
      var results = response.data;
      // for loop for each response to display on page
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        // set attribute of gif to fixed height/still image/animated gif
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.attr("class", "gif");
        // appends rating and img to div 
        animalDiv.append(p);
        animalDiv.append(animalImage);
        // Prependng the div to the HTML
        $("#gifs").prepend(animalDiv);
        // click function to animate gifs
        $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
          // state is still by default
          if (state === "still") {
          // if gif is clicked state is changed to animated
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-animate");
          } 
          // else, gif remains still
          else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-still");
          }
          });
      };
    });
});