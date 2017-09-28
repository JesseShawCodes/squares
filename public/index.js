//This function is used to demo the project. Users can submit a demo login
$(".loginform").on("submit", function(e) {
    e.preventDefault();
    var username = $(".username").val();
    var pw = $(".password").val();
    if (username === "demo" && pw === "p@$$word") {
        $(".formsection").removeClass("hidden");
        $(".login").addClass("hidden");
        loadData();
    } else {
        $(".loginerror").removeClass("hidden");
    }
});



//Submit a post to the server

function loadData() {
    $.get( 'api', function( data ) {
        $("#grid").removeClass("hidden");
        $( "#grid" ).html("<h1>Testing</h1>");
        for (var i = 0; i < data.posts.length; i++) {
            $("#grid").append(`
            <section class="resource">
                <span><h1>${data.posts[i].title}</h1></span> 
                <span>${data.posts[i].content}</span>  
                <span><a href='${data.posts[i].url}' target="_blank">Click Here</a></span>
                <span><button class="delete-request">Delete</button></span>
            </section>
            `);
        };
    });
    $("button").on("click", function(e) {
        e.preventDefault();
        console.log("Deleting...");
    })
}

$(".resoure-submit").on("submit", function(e) {
    e.preventDefault();
    var title = $(".title").val();
    var description = $(".description").val();
    var link = $(".link").val();
    var category = $(".category").val();
    var dataInput = {
        name: title,
        description: description,
        link: link,
        category: category
    };
    $("#grid").append(`
    <section class="resource">
        <span><h1>${title}</h1></span> 
        <span>${description}</span>  
        <span>${link}</span>
        <span><button class="delete-request">Delete</button></span>
    </section>
    `);
    $.post('api', {
        title: $(".title").val(),
        content: $(".description").val(),
        url: $(".link").val(),
    })
});
