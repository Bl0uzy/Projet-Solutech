var textarea = $( '#editor1' ).ckeditor();

$(document).ready(function () {
    textarea.config.height="1000px"
})

$("#textPopup").click(function () {
    // textarea.config.width = "200px"

    // textarea.setReadOnly(true)
    if ($(".formReponse").attr('hidden') =="hidden"){
        $(".formReponse").removeAttr('hidden')
        $("#contentMess").attr('id','contentMessLess')
    } else {
        $(".formReponse").attr('hidden',"")
        $("#contentMessLess").attr('id','contentMess')
    }
    console.log($(".formReponse").attr('hidden'))

})


