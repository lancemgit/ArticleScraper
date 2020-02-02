$("body").on("click", "#unsave-button", function (event) {
    event.preventDefault();
    console.log($(this).attr("data-id"));
    $.ajax({
        url: "/unsave/" + $(this).attr("data-id"),
        type: "GET"
    }).then(function (response) {
        console.log(response);
        location.reload();
    });

});

$("body").on("click", "#note-button", function (event) {
    event.preventDefault();
    window.location = "/savedarticle/notes/" + $(this).attr("data-id");
});