
$( document ).ready(function() {
   


  var gifArr = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King", "Hey", "Puppies", "Funny Cats"];

  // displayMovieInfo function re-renders the HTML to display the appropriate content

  function pauseGif(){

    var state = $(this).attr("data-state");
  
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  }



  function displayMovieInfo() {

    var gifID = $(this).attr("data-name");

    var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + gifID + "&api_key=dc6zaTOxFJmzC&limit=10");

    // Creates AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      $("#gifs-view").empty();

      for (var i = 0; i < 10; i++){

        var gifDiv = $("<div class='image'>");

        // Storing the rating data
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var rate = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        gifDiv.append(rate);

        var imgURL = response.data[i].images.original_still.url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
        image.addClass("gif")
        image.attr("data-still", response.data[i].images.original_still.url);
        // Provided the initial button text
        image.attr("data-animate", response.data[i].images.original.url);
        image.attr("data-state","still");

        // Appending the image
        gifDiv.append(image);
        $("#gifs-view").prepend(gifDiv);
      }
    });

  }

  // Function for displaying data
  function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifArr.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      a.addClass("btn btn-primary");
      // Adds a class of movie to our button
      a.addClass("gifs");
      // Added a data-attribute
      a.attr("data-name", gifArr[i]);
      // Provided the initial button text
      a.text(gifArr[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
      
    }
  }

  // This function handles events where the add movie button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();
    if (gif != ""){

     // The gif from the textbox is then added to our array
    gifArr.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    }
    
  });

  // Adding click event listeners to all elements with a class of "gif", "gifs"
  $(document).on("click", ".gifs", displayMovieInfo);
  $(document).on("click", ".gif", pauseGif);

  renderButtons();



  });