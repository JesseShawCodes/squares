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