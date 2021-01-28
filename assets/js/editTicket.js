var editTicket = $( '#editor1' ).ckeditor();

$(document).ready(function () {
    editTicket.config.height="1000px"
})

$("#textPopup").click(function () {
    // editTicket.config.width = "200px"

    // editTicket.setReadOnly(true)
    if ($(".formReponse").attr('hidden') =="hidden"){
        $(".formReponse").removeAttr('hidden')
        $("#contentMess").attr('id','contentMessLess')
    } else {
        $(".formReponse").attr('hidden',"")
        $("#contentMessLess").attr('id','contentMess')
    }
    console.log($(".formReponse").attr('hidden'))

})

$("#selectStatut").change(function (){
    statut = this.value
    fun = "updateStatut"
    id = getUrlParameter("id")
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&statut='+statut+"&id="+id,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            document.location.reload();
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
})


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};