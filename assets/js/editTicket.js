
// var editTicket = $( '#editor1' ).ckeditor({
//     inline:true,
//     extraPlugins : 'autogrow',
//     autoGrow_maxHeight: 600,
//     autoGrow_minHeight: 50,
//     removePlugins: 'elementspath',
//     autoGrow_bottomSpace:'20',
//     resize_enabled:false
// });

CKEDITOR.disableAutoInline = true;

// CKEDITOR.inline('editor1')
// CKEDITOR.on('instanceReady', function(evt) {
//     var editor = evt.editor;
//     console.log('The editor named ' + editor.name + ' is now ready');
//     editor.on('focus', function(e) {
//         console.log('The editor named ' + e.editor.name + ' is now focused');
//     });
//     editor.on('blur', function(e) {
//         console.log('The editor named ' + e.editor.name + ' is not focused');
//     });
// });
CKEDITOR.inline('editor1',{
    extraPlugins : 'editorplaceholder,autogrow,link',
    editorplaceholder : 'Taper votre texte ici.',
    autoGrow_maxHeight: 600,
    autoGrow_minHeight: 20,
    autoGrow_bottomSpace:20,
})

$(document).ready(function () {
    // CKEDITOR.config.readOnly = true;

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