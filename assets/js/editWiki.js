Dropzone.autoDiscover = false;
id = getUrlParameter("id")

$(document).ready(function () {
    displayAllUsers()
    displayFiles()
    copyLink()
})

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
    url:'upload.php?id='+id,

    dictDefaultMessage:'Glissez vos fichiers ici pour les envoyer',
    success:function (file,response) {
        console.log(response)
    }
})



var editTicket = $( '#editor1' ).ckeditor({
    // extraPlugins : 'justify',
    removePlugins :'autogrow',
    height: '60vh',
    resize_enabled:false,
    toolbarGroups : [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        '/',
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ],
    removeButtons : 'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Flash,Smiley,SpecialChar,Iframe,Find,CopyFormatting,RemoveFormat,About,Maximize,ShowBlocks,PasteText,PasteFromWord,Format,Styles,Font'
});




var isLaunched;
function checkLastSave() {
    isLaunched = true;
    console.log(Date.now() - lastInput)
    if (Date.now() - lastInput <= 1000){
        setTimeout(checkLastSave,1000)
    } else {
        saveWiki();
        isLaunched = false;
    }
}

var lastInput;
CKEDITOR.instances.editor1.on('change',function (evt) {
    lastInput = Date.now();
    if (!isLaunched){
        checkLastSave();
    }
})

$("#saveChanges").click(function () {
    saveWiki()
})

$("#imgPdf").click(function () {
    $(".content").html('<form hidden name="pdf" method="post" action="pdf.php"><textarea name="test">'+CKEDITOR.instances.editor1.getData()+'</textarea><input name="titre" value="'+$("#titre").attr('value')+'"></form>')
    document.forms['pdf'].submit();
})

function saveWiki() {
    var text = CKEDITOR.instances.editor1.getData()
    console.log(text)
    var fun  = "updateTextWiki"
    $.ajax({
        url : 'ajax.php',
        type : 'POST',
        data:'fun='+fun+'&content='+escape(text)+"&id="+id,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            $("#saveChanges").addClass("saveOk")
            setTimeout(function () {
                $("#saveChanges").removeClass("saveOk")
            },2000)
            // console.log(code_html)
            // document.location.reload();
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){
            $("#saveChanges").addClass("saveFail")
            setTimeout(function () {
                $("#saveChanges").removeClass("saveFail")
            },2000)
        },

        complete : function(resultat, statut){

        }

    });
}

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

$("#allUsers").change(function () {
    var userID = $(this).val()
    var fun = "ajoutUserToWiki"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&id='+id+'&userID='+userID,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            displayAllUsers()
            $("#allUsers option[value="+userID+"]").remove()
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
})

function displayFiles() {
    var fun = "displayFiles"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&id='+id,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            $("#allFiles").html(code_html)

            copyLink()
            removeFile()

            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
}

function removeFile() {
    $(".delFile").click(function () {
        var fun = 'delFile'
        var path = $(this).prev().prev().attr('href')
        var newPath = "."+path.substring(path.indexOf("/piecesJointes"))


        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+'&id='+id+'&path='+newPath,
            dataType : 'html',
            success : function(code_html, statut){
                // console.log(code_html)
                displayFiles()
                // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
            },

            error : function(resultat, statut, erreur){

            },

            complete : function(resultat, statut){

            }

        });
    })
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




function displayAllUsers() {
    var fun = "displayUsers"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&id='+id,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            $("#utilisateursAjoutes").html(code_html)
            $(".user span").click(function () {
                console.log($(this).parent().attr('id'))
                var userID = $(this).parent().attr('id')
                delUserAccessToWiki(userID)
            })
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
}

function delUserAccessToWiki(userID) {
    var fun = "delUserAccessToWiki"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&id='+id+"&userID="+userID,
        dataType : 'html',
        success : function(code_html, statut){
            displayAllUsers()
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
}

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
