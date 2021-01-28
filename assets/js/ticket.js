$("#filtre").click(function (){
    if ($("#contentFiltre").css("display")=="none"){
        $("#contentFiltre").show()
        // console.log($(this).children("img"))
        $(this).children("img").attr("class","img-retournee")
    } else {
        $("#contentFiltre").hide()
        $(this).children("img").attr("class","")
    }
})
$("#addTicket").popover({
    html : true,
    container : 'body',
    sanitize : false
})

$(document).ready(function () {
    $("#table_id").DataTable()
})

$("#table_id").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editTicket.php?id="+$(this).attr("id")
})

// $("#addTicket").click(function () {
//     $(this).popover()
// })
