//Login//

$(".loginform").on("submit", function(e) {
    e.preventDefault();
    var username = $(".username").val();
    var password = $(".password").val();
    console.log(`Username: ${username}. Password: ${password}`);
    //Login at api/auth/login
})

//Register//

$(".registerbutton").on("click", function(e) {
    e.preventDefault();
    console.log("Register Button was clicked");
    $(".register").removeClass("hidden");
    $(".login").addClass("hidden");
})

$(".registerform").on("submit", function(e) {
    e.preventDefault();
    let user = $(".usernameregister").val();
    let pw = $(".passwordregister").val();
    let firstName = $(".firstname").val();
    let lastName = $(".lastname").val();
    console.log(`${user}, ${pw}, ${firstName}, ${lastName}`);
    $.post('api/users', {
        username: $(".usernameregister").val(),
        password: $(".passwordregister").val(),
        firstName: $(".firstname").val(),
        lastName: $(".lastname").val()
    });
    console.log("New User has been registered POST REQUEST");
})

var id = [];

//This function is used to demo the project. Users can submit a demo login
$(".loginform").on("submit", function(e) {
    e.preventDefault();
    $("#grid").html('');
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
        // console.log(data.posts[0].id);
        for (var i = 0; i < data.posts.length; i++) {
            $("#grid").append(`
            <section class="resource" id="${data.posts[i].id}">
                <span><h1>${data.posts[i].title}</h1></span> 
                <span>${data.posts[i].content}</span>  
                <span><a href='${data.posts[i].url}' target="_blank">Click Here</a></span>
                <section class="delete-request" onclick="deleteResource();"><button>Delete</button></section>
            </section>
            `);
            id[i] = `${data.posts[i].id}`;
            // console.log(id[i]);
        };
    });
}

function deleteResource() {
    console.log(id);
    $.ajax({
        url: 'api/' + id[0],
        type: 'DELETE',
        success: loadData()
    })
    $(".resource").click(function(e) {
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
        <span><a href='${link}' target="_blank">Click Here</a></span>
        <section class="delete-request" onclick="deleteResource();"><button>Delete</button></section>
    </section>
    `);
    $.post('api', {
        title: $(".title").val(),
        content: $(".description").val(),
        url: $(".link").val()
    })
});
