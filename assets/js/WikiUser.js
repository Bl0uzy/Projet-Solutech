$(document).ready(function () {
    $("#dataTable").DataTable({
        "paging": false,
        info: false,
        language: {
            search: "Recherche :",
            emptyTable:" "
        }
    })
})
$("#dataTable").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="../pdf.php?id="+$(this).attr("id")
})