$('#popover').popover({
    trigger: 'focus',
    html:true,
    sanitize:false
})
 tippy('#newWiki',{
     theme: 'light-border',
     placement: 'right',
     content:"<div><h6>Créer un wiki</h6></div>" +
         "<form action='editWiki.php' method='get'>\n" +
         "    <input style='margin: 0' type='text' name='titre' placeholder='Titre'>\n" +
         "    <button type='submit' class='btn'>Valider</button>\n" +
         "</form>",
     allowHTML:true,
     trigger: 'click mouseenter',
     interactive:true,

 })
$(document).ready(function () {
    $("#dataTable").DataTable({
        "paging": false,
        info: false,

    })
})
$("#dataTable").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editWiki.php?id="+$(this).attr("id")
})