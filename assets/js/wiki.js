$('#popover').popover({
    trigger: 'focus',
    html:true,
    sanitize:false
})
 tippy('#newWiki',{
     theme: 'light-border',
     placement: 'right',
     content:"<form action='editWiki.php' method='get'>\n" +
         "                        <input type='text' name='titre' placeholder='Titre'>\n" +
         "                        <button type='submit' class='btn'>Valider</button>\n" +
         "                    </form>",
     allowHTML:true,
     trigger: 'click mouseenter',
     interactive:true,

 })
$(document).ready(function () {
    $("#dataTable").DataTable()
})
$("#dataTable").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editWiki.php?id="+$(this).attr("id")
})