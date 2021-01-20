$("#filtre").click(function (){
    if ($("#contentFiltre").css("display")=="none"){
        $("#contentFiltre").show()
        console.log($(this).children("img"))
        $(this).children("img").attr("class","img-retournee")
    } else {
        $("#contentFiltre").hide()
        $(this).children("img").attr("class","")
    }
})