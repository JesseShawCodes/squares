/*

var MOCK_RESOURCES = {
    "resources": [
        {
            "id": "1111111",
            "name": "CSS MDN",
            "friendId": "aaaaaa",
            "friendName": "Jesse Shaw",
            "Created_date": 1470016976609,
            "link": "",
            "category": "CSS"
        },
        {
            "id": "2222222",
            "name": "Javascript MDN",
            "friendId": "bbbbbbb",
            "author": "Jesse Shaw",
            "Created_date": 1470012976609,
            "link": "",
            "category": "javascript"
        },
        {
            "id": "333333",
            "name": "jQuery API",
            "friendId": "cccc",
            "friendName": "Jesse Shaw",
            "Created_date": 1470011976609,
            "link": "",
            "category": "jquery"
        },
        {
            "id": "4444444",
            "name": "HTML MDN",
            "friendId": "ddddd",
            "friendName": "Jesse Shaw",
            "Created_date": 1470009976609,
            "link": "",
            "category": "html"
        }
    ]
};

function getResources(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RESOURCES)}, 3000);
}

// this function stays the same when we connect
// to real API later
function displayReferences(data) {
    for (index in data.resources) {
       $('body').append(
        '<p>' + data.resources[index].name + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayReferences() {
    getResources(displayReferences);
}

$(function() {
    getAndDisplayReferences();
})

*/

$("form").on("submit", function(e) {
    e.preventDefault();
    console.log("Test");
    var title = $(".title").val();
    var description = $(".description").val();
    var link = $(".link").val();
    var data = [title, description, link];
    $.post('api', {
        title: title,
        description: description,
        link: link
    });
    console.log(data);
    $("#grid").append(`
    <section class="resource">
        <span><h1>${title}</h1></span> 
        <span>${description}</span>  
        <span>${link}</span>
    </section>
    `);
})