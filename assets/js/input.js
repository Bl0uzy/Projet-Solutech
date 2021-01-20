$(document).ready(function () {
    $('.inputJS').each(function (){
        if ($(this).val()!=""){
            $(this).prev().addClass('inputActive');
        }
    })
})

$('.inputJS').on('focusin', function() {
    $(this).prev().addClass('inputActive');
});

$('.inputJS').on('focusout', function() {
    if (!this.value) {
        $(this).prev().removeClass('inputActive');
    }
});

