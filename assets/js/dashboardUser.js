$(document).ready(function () {
    $("#table_id").DataTable({
        paging: false,
        searching: false,
        // ordering:  false,
        info: false
    })
    $("#table_wiki").DataTable({
        paging: false,
        searching: false,
        // ordering:  false,
        info: false
    })
})

$("#table_id").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editTicket.php?id="+$(this).attr("id")
})

$("#table_wiki").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="../pdf.php?id="+$(this).attr("id")
})