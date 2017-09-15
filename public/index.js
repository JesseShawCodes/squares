var MOCK_RESOURCES = {
    "resources": [
        {
            "id": "1111111",
            "text": "CSS MDN",
            "friendId": "aaaaaa",
            "friendName": "Jesse Shaw",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "text": "Javascript MDN",
            "friendId": "bbbbbbb",
            "author": "Jesse Shaw",
            "publishedAt": 1470012976609
        },
        {
            "id": "333333",
            "text": "jQuery API",
            "friendId": "cccc",
            "friendName": "Jesse Shaw",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "text": "HTML MDN",
            "friendId": "ddddd",
            "friendName": "Jesse Shaw",
            "publishedAt": 1470009976609
        }
    ]
};

function getRecentStatusUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RESOURCES)}, 300);
}

// this function stays the same when we connect
// to real API later
function displayReferences(data) {
    for (index in data.resources) {
       $('body').append(
        '<p>' + data.resources[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
    getRecentStatusUpdates(displayReferences);
}

$(function() {
    getAndDisplayStatusUpdates();
})

$("body").css("background-color", "pink");