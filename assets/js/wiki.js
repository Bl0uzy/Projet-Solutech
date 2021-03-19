$(document).ready(function () {
    displayFolders()
})
$('#popover').popover({
    trigger: 'focus',
    html:true,
    sanitize:false
})
 tippy('#newWiki',{
     theme: 'light-border',
     placement: 'right',
     content:"<div><h6>Créer un wiki</h6></div>" +
         "<form action='editWiki.php' method='get'>\n" +
         "    <input style='margin: 0' type='text' name='titre' placeholder='Titre'>\n" +
         "    <button type='submit' class='btn'>Valider</button>\n" +
         "</form>",
     allowHTML:true,
     trigger: 'click mouseenter',
     interactive:true,

 })


$(document).ready(function () {
    $("#dataTable").DataTable({
        "paging": false,
        info: false,

    })
})

$("#dataTable").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editWiki.php?id="+$(this).attr("id")
})

$("#btnNewFolder").click(function () {
    var nomDossier = $(this).prev().val()
    console.log(nomDossier)
    var fun  = "newFolder"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&nom='+nomDossier,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            displayFolders()
            // $("#listFolder").html(code_html)
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });

})

function displayFolders() {
    var fun  = "displayFolder"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun,
        dataType : 'html',
        success : function(code_html, statut){
            // console.log(code_html)
            $("#allFolders").html("<option value='0'>-- Choisis un dossier --</option>"+code_html)
            choiceFolder()
        },
        error : function(resultat, statut, erreur){
        },
        complete : function(resultat, statut){
        }
    });
}

function choiceFolder() {
    $("#allFolders").change(function () {
        var idFolder = $(this).val()
        var titre = $("#allFolders [value='"+idFolder+"']").text()
        if (idFolder != '0'){
            displayWiki()
            displayUsers()
            $("#folderName").html("<h5>"+titre+"<img title='Supprimer le dossier' id='removeFolder' src='assets/img/icons/rubbish.svg'></h5>")
            removeFolder()
        } else {
            $("#listWiki").html("")
            $("#listUsers").html("")
            $("#folderName").html("")
        }


    })
}

function removeFolder() {
    $("#removeFolder").click(function () {
        var idFolder = $("#allFolders").val()
        var fun  = "removeFolder"
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+"&idFolder="+idFolder,
            dataType : 'html',
            success : function(code_html, statut){
                // console.log(code_html)
                $("#listWiki").html(code_html)
                displayFolders()
                $("#listWiki").html("")
                $("#listUsers").html("")
                $("#folderName").html("")


            },
            error : function(resultat, statut, erreur){
            },
            complete : function(resultat, statut){
            }
        });
    })
}

function displayWiki() {
    var idFolder = $("#allFolders").val()
    var fun  = "displayWikiToFolder"

    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+"&idFolder="+idFolder,
        dataType : 'html',
        success : function(code_html, statut){
            // console.log(code_html)
            $("#listWiki").html(code_html)
            addWikiToFolder()
            removeWikiFromFolder()
        },
        error : function(resultat, statut, erreur){
        },
        complete : function(resultat, statut){
        }
    });
}

function addWikiToFolder() {
    $("#selectAllWiki").change(function () {
        var idWiki = $(this).val()
        var idFolder = $("#allFolders").val()
        var fun  = "addWikiToFolder"
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+"&idWiki="+idWiki+"&idFolder="+idFolder,
            dataType : 'html',
            success : function(code_html, statut){
                // $("#selectAllWiki option[value="+idWiki+"]").remove()
                console.log(code_html)
                displayWiki()
                // $("#listWiki").html(code_html)
            },
            error : function(resultat, statut, erreur){
            },
            complete : function(resultat, statut){
            }
        });
    })
}

function removeWikiFromFolder() {
    $(".rmvWikiFromFolder").click(function () {
        var idWiki = $(this).prev().attr('id')
        var idFolder = $("#allFolders").val()
        var fun  = "removeWikiFromFolder"
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+"&idWiki="+idWiki+"&idFolder="+idFolder,
            dataType : 'html',
            success : function(code_html, statut){
                displayWiki()
                console.log(code_html)
                // $("#listWiki").html(code_html)
            },
            error : function(resultat, statut, erreur){
            },
            complete : function(resultat, statut){
            }
        });
    })
}

function displayUsers() {
    var idFolder = $("#allFolders").val()
    var fun  = "displayUserToFolder"

    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+"&idFolder="+idFolder,
        dataType : 'html',
        success : function(code_html, statut){
            // console.log(code_html)
            $("#listUsers").html(code_html)
            addUserToFolder()
            removeUserFromFolder()
            // addWikiToFolder()
            // removeWikiFromFolder()
        },
        error : function(resultat, statut, erreur){
        },
        complete : function(resultat, statut){
        }
    });
}

function addUserToFolder() {
    $("#selectAllUser").change(function () {
        var idUser = $(this).val()
        var idFolder = $("#allFolders").val()
        var fun  = "addUserToFolder"
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+"&idUser="+idUser+"&idFolder="+idFolder,
            dataType : 'html',
            success : function(code_html, statut){
                console.log(code_html)
                displayUsers()
            },
            error : function(resultat, statut, erreur){
            },
            complete : function(resultat, statut){
            }
        });
    })
}

function removeUserFromFolder() {
    $(".rmvUserFromFolder").click(function () {
        var idLink = $(this).prev().attr('id')
        var fun  = "removeUserFromFolder"
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+"&idLink="+idLink,
            dataType : 'html',
            success : function(code_html, statut){
                displayUsers()
                console.log(code_html)
                // $("#listWiki").html(code_html)
            },
            error : function(resultat, statut, erreur){
            },
            complete : function(resultat, statut){
            }
        });
    })
}