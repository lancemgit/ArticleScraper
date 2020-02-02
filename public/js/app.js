$("#scrape-button").on("click", function (event) {
  event.preventDefault();
  $.ajax({
    url: "/scrape",
    type: "GET"

  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < response.length; i++) {
      var title = response[i].articleTitle;
      var desc = response[i].articleDescription;
      var img = response[i].articleImg;
      var id = response[i].articleId;
      var link = response[i].articleLink;

      $("#articles").append("<div class='card'>" +
        "<img src=" + img + " alt='" + title + "' width=100%>" +
        "<div class='card-body'>" +
        "<p class='card-text'>" +
        "<a href=" + link + ">Title: " + title + "</a>" +
        "<hr>" + desc +
        "</p>" +
        "<button id='save-button' type='button' class='btn btn-warning mx-sm-3 mb-2' data-id=" + id + ">Save Article</button>" +
        "</div>" +
        "</div>");
    }
  });
});

$("body").on("click", "#save-button", function (event) {
  event.preventDefault();
  console.log($(this).attr("data-id"));
  $.ajax({
    url: "/save/" + $(this).attr("data-id"),
    type: "GET"

  }).then(function (response) {
    console.log(response);
  });

});