Dropzone.autoDiscover = false;

$(document).ready(function () {
    id = getUrlParameter("id");

    var dropzone = new Dropzone("#upload-widget",{

        init: function() {
            this.on("error", function (errorMessage) {
                console.log(errorMessage)

                // do whatever you need to do...
            });
            this.on("success", function (file, serverResponse) {
                console.log(serverResponse)
                console.log(this)

                displayFiles()


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


        url:'../uploadTicket.php?id='+id,

        dictDefaultMessage:'Glissez vos fichiers ici pour les envoyer',
        success:function (file,response) {
            console.log(response)
        }
    })
    displayFiles()
    // removeFile()

})

CKEDITOR.disableAutoInline = true;

CKEDITOR.inline('editor1',{
    extraPlugins : 'link,editorplaceholder,autogrow',
    editorplaceholder : 'Taper votre texte ici.',
    autoGrow_maxHeight: 600,
    autoGrow_minHeight: 20,
    autoGrow_bottomSpace:20,
    toolbarGroups : [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ],
    removeButtons : 'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,Language,Flash,HorizontalRule,Smiley,PageBreak,Iframe,Styles,Format,Font,Maximize,ShowBlocks,About'
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
        url : '../ajax.php',
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

var ticket = true;
function displayFiles() {
    var fun = "displayFilesTicketUser"

    $.ajax({
        url : '../ajax.php',
        type : 'GET',
        data:'fun='+fun+'&id='+id+"&ticket="+ticket,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            $("#allFiles").html(code_html)

            copyLink()
            // removeFile()

            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
}



function copyLink() {
    $(".copyLink").popover()
    // navigator.clipboard.writeText("test");

    $(".copyLink").click(function () {

        var path = $(this).prev().attr('href')
        // console.log(path)
        navigator.clipboard.writeText(path);

    })

    $('.copyLink').on('shown.bs.popover', function () {
        setTimeout(() => {
            $(this).popover('hide')
        }, 2000);
    })
}

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