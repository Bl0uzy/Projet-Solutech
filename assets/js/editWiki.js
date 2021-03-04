Dropzone.autoDiscover = false;
id = getUrlParameter("id")
var dropzone = new Dropzone("#upload-widget",{
    init: function() {
        this.on("error", function (errorMessage) {
            console.log(errorMessage)

            // do whatever you need to do...
        });
        this.on("success", function (file, serverResponse) {
            console.log(serverResponse)
            console.log(this)
            console.log("test = "+'upload.php?id='+id)


            // do whatever you need to do...
            if (serverResponse == 1){
                return file.previewElement.classList.add("dz-success");

            } else {
                return file.previewElement.classList.add("dz-error");

            }
        });
    },
    createImageThumbnails:false,
    autoProcessQueue:true,
    url:'upload.php?id='+id,

    dictDefaultMessage:'Glisser vos fichier ici pour les envoyer',
    success:function (file,response) {
        console.log(response)
    }
})


var editTicket = $( '#editor1' ).ckeditor({
    height: '65vh',
    resize_enabled:false

});

$("#saveChanges").click(function () {
    var text = CKEDITOR.instances.editor1.getData()
    var fun  = "updateTextWiki"
    $.ajax({
        url : 'ajax.php',
        type : 'POST',
        data:'fun='+fun+'&content='+text+"&id="+id,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            // document.location.reload();
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
})

$("#delWiki").click(function () {
    var fun  = "delWiki"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&id='+id,
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

function getUrlParameter(sParam) {
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



