//This function is used to demo the project
$(".loginform").on("submit", function(e) {
    e.preventDefault();
    var username = $(".username").val();
    var pw = $(".password").val();
    if (username == "demo" && pw == "p@$$word") {
        console.log("You have entered the correct information");
    };
});

//Submit a post to the server

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
    </section>
    `);
    console.log(dataInput.name);
    $.post('api', {
        title: $(".title").val(),
        content: $(".description").val(),
        url: $(".link").val(),
    })
});
