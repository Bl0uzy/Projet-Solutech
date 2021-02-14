$(document).ready(function () {
    $("#table_id").DataTable({
        paging: false,
        searching: false,
        info:false
    })

    $("#mailsSupport").DataTable({
        paging: false,
        searching: false,
        info:false

    })

    $("#usersDashboard").DataTable({
        paging: false,
        searching: false,
        info:false
    })
})

$("#mailsSupport").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="mailSupport.php?id="+$(this).attr("id")
})

$("#table_id").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editTicket.php?id="+$(this).attr("id")
})

$("#usersDashboard").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="modifUser.php?user="+$(this).attr("id")
})

