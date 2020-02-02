$(document).ready(function () {
    $.ajax({
        url: "/getnotes/" + $("#submit-button").attr("data-id"),
        type: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response[0].comment.length; i++) {
            $("#notes-place").append("<p>" + response[0].comment[i].body + "</p><hr>");
        }
    })
});

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var comment = { body: $("#textarea-note").val().trim() };

    $.ajax({
        url: "/note/" + $(this).attr("data-id"),
        type: "POST",
        data: comment
    }).then(function (response) {
        console.log(response);
        location.reload();
    });
});

