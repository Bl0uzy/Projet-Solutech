$(document).ready(function () {
    $("#table_id").DataTable({
        paging: false,
        searching: false,
        ordering:  false
    })
})

$("#table_id").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editTicket.php?id="+$(this).attr("id")
})