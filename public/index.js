///////////////////////////////
/////////////Login/////////////
///////////////////////////////

$(".loginform").on("submit", function(e) {
    e.preventDefault();
    var username = $(".username").val();
    var password = $(".password").val();
    window.alert = function() {};
    $.ajax('/api/auth/login', {
        method: 'POST',
        dataType: 'json',
        async: true,
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        headers: {
            authorization: "Basic",
            "cache-control": "no-cache"
        },
        data: {
            username: username,
            password: password
        },
        success: function() {
            getUserID(username, password);
        },
        error: function() {
            console.log("THERE WAS AN ERROR");
            $(".loginerror").removeClass("hidden");
            return;
        }
    });
    $.get('api/users', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].username == username) {
                $(".greeting").html(`Hi ${data[i].firstName}!`);
            }
        }
    });
})

///////////////////////////
//Obtain User Information//
///////////////////////////

function getUserID(user, password) {
    $.get('api/users', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (user == data[i].username) {
                loadData(data[i]._id);
                showResourceInput(data[i]._id);
            }
        }
    })
}

////////////////
////Register////
////////////////

//////////////////////
//SHOW Register Form//
//////////////////////

$(".registerbutton").on("click", function(e) {
    e.preventDefault();
    $(".register").removeClass("hidden");
    $(".login").addClass("hidden");
})

/////////////////////////////////
////Show Resource Input Form/////
/////////////////////////////////

function showResourceInput(userId) {
    $(".formsection").removeClass("hidden");
    $(".login").addClass("hidden");
    $(".formsection input[type=\"submit\"]").attr("onclick", `submitIt('${userId}')`);
}

///Password formating///

$(".passwordregister").blur(function(){
    console.log($(".passwordregister").val());
    if ($(".passwordregister").val().length < 10) {
        // alert("Password word must be at least 10 characters and include");
        $(".passwarning1").removeClass("hidden");
        $(".passwordregister").css("background-color", "red");
        stop();
    }
    else {
        $(".passwarning1").addClass("hidden");
    }
})

$(".passwordconfirm").blur(function() {
    var regPass = $(".passwordregister").val();
    var conPass = $(".passwordconfirm").val()
    if (regPass != conPass) {
        // alert("your passwords do not match");
        $(".passwarning2").removeClass("hidden");
        $(".passwordregister, .passwordconfirm").css("background-color", "red");
        return
    }
    else if (regPass == conPass && regPass.length >= 10 && conPass.length >= 10) {
        $(".passwordregister, .passwordconfirm").css("background-color", "green");
        $(".passwarning2").addClass("hidden");
    }
})


////////////////////////////////////////////////////////////////////////////////////
//Submit Username, Password, First Name and Last Name to register //////////////////
////////////////////////////////////////////////////////////////////////////////////

$(".registerform").on("submit", function(e) {
    e.preventDefault();
    let user = $(".usernameregister").val();
    let pw = $(".passwordregister").val();
    let firstName = $(".firstname").val();
    let lastName = $(".lastname").val();
    let pass2 = $(".passwordconfirm").val();
    if (pw != pass2) {
        alert("Passwords do not match");
        return;
    }
    else {
        console.log("Passwords Match");
    }
    $.ajax('/api/users/', {
        method: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pw));
        },
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({
            username: user,
            password: pw,
            firstName: firstName,
            lastName: lastName
        }, false),
        success: function() {
            console.log("SUCESS!!");
            alert("You have succesfully Registered a user");
            newUserForm(user);
            $(".register").addClass("hidden");
        },
        error: function() {
            console.log("THERE WAS AN ERROR!");
            alert("Sorry. This Username has already been taken");
        }
    });
})

function newUserForm(user) {
    $.get('api/users', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (user == data[i].username) {
                console.log(data[i]._id);
                showResourceInput(data[i]._id);
                $(".greeting").html(`Hi ${data[i].firstName}!`);
            }
        }
    })
}


////////////////////////////
////Data Rendering//////////
////////////////////////////

function loadData(userId) {
    $.get( `api/users/${userId}/links`, function( data ) {
        $("#grid").removeClass("hidden");
        for (var i = 0; i < data.length; i++) {
            let string = data[i].content
            let abrContent = string.substring(0, 140);
            if (string.length < 140) {
                abrContent = string;
            }
            else {
                abrContent = string.substring(0, 140);
            }
            $("#grid").append(`
            <section class="resource" id="${data[i]._id}">
                <span><h1>${data[i].title}</h1></span> 
                <span>${abrContent}...</span>
                <section class="clickableitems">
                <span class="link"><button onclick="readMore('${data[i]._id}')">Click Here To Read More</button></span>
                <span class="link"><a href='${data[i].link}' target="_blank"><button>Visit Resource</button></a></span>
                <section class="delete-request" onclick="deleteResource('${data[i]._id}', '${data[i].author}');"><button>Delete</button></section>
                <section class="edit-request" onclick="editResource('${data[i]._id}', '${data[i].author}');"><button>Edit</button></section>
                </section class="clickableitems
            </section>
            `);
        };
    });
}

function readMore(userId) {
    console.log(`Read More for ${userId}`);
    $(".readmore").removeClass("hidden");
    $.get('api/links', function(data) {
        for (var i = 0; i < data.posts.length; i++) {
            if (userId == data.posts[i].id) {
                $(".title").text(data.posts[i].title);
                $(".description-readmore").text(data.posts[i].content);
                $(".link-readmore").text(data.posts[i].link);
                $(".link-readmore").attr('href', `${data.posts[i].link}`);
            }
        }
    });
}

function closeReadMore() {
    $(".readmore").addClass("hidden");
}

function clearForm() {
    $('.resoure-submit').find("input[type=text], textarea").val("");
    $(".title, .description, .link").val('');
}

//////////////////////////////
////

/////////////////////////////
////Delete Resource//////////
/////////////////////////////

function deleteResource(id, author) {
    console.log(`Delete resource ${id}`);
    if (confirm('This action will permanently delete this item from your resource list. If you are certain you\'d like to continue, press OK')) {
        $("#grid").empty();
        $.ajax({
            url: `api/${id}`,
            type: 'DELETE',
        });
        loadData(author);
    }
    else {
        return
    }
}

/////////////////////////////
////Edit Resource///////////
/////////////////////////////

function editResource(resourceId, userId) {
    $(".editform").removeClass("hidden");
    $(".formsection").slideUp();
    $.get(`/api/links`, function(data) {
        for (var i = 0; i < data.posts.length; i++) {
            if (data.posts[i].id == resourceId) {
                $(".edit-title").attr("value", `${data.posts[i].title}`);
                $(".edit-description").html(`${data.posts[i].content}`);
                $(".edit-link").attr("value", `${data.posts[i].link}`);
                let id = data.posts[i].id;
                $(".editform").submit(function(e){
                    e.preventDefault();
                    let title = $(".edit-title").val();
                    let content = $(".edit-description").val();
                    let url = $(".edit-link").val();
                    let idPlaceholder = id;
                    let userIdPlaceholder = userId;
                    editIt(idPlaceholder, title, content, url, userIdPlaceholder);
                })
            }
        };
    });
};

function editIt(resourceId, title, content, url, userId) {
    $.ajax({
        url: `api/${resourceId}`,
        method: 'PUT',
        data: {
                id: resourceId,
                title: title,
                content: content,
                link: url
            },
        success: function() {
            closeEdit();
            $("#grid").empty();
            loadData(userId);
        }
    })
    $(".formsection").slideDown();
};


///Close Edit Form////

function closeEdit() {
    $(".editform").addClass("hidden");
    $(".formsection").slideDown();
}

/////////////////////////////
////Submit Resource//////////
/////////////////////////////

$(".title").blur(function() {
    title = $(this).val();
    console.log(title);
    if (title == "") {
        alert("Don't Forget a title");
    }
})


function submitIt(userId) {
    $('.resoure-submit').submit(function (e) {
        var title = $(".title").val();
        if (title == null || title == "") {
            alert("Please Input a Title");
        }
        e.preventDefault();
        $("#grid").empty();
        var description = $(".description").val();
        var link = $(".link").val();
        var category = $(".category").val();
        if (link.startsWith("http://") || link.startsWith("https://")) {
            console.log("Success!");
        }
        else if (link == null || link == "") {
            console.log("There is no link");
        }
        else {
            console.log("Need to add http");
            link = "http://" + link;
        }
        console.log(link);
        $.post(`api/users/${userId}`, {
            title: $(".title").val(),
            content: $(".description").val(),
            link: link
        });
        // clearForm();
        loadData(userId);
        clearForm();
    });
}


