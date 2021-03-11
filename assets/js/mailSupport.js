var editTicket = $( '#editor1' ).ckeditor({
    height:"calc(100vh - 400px)"
});

$(document).ready(function () {
    editTicket.editor.config.removePlugins = 'resize';
})

$("#MSallUsers").change(function () {
    var id = $(this).val()
    var fun = "getTickets"
    $("#MSnewTicket").attr("hidden","")

    if (id != 0){
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+"&id="+id,
            dataType : 'html',
            success : function(code_html, statut){
                $("#MSallTicket").html("<option value='0'>- Ticket -</option>")
                $("#MSallTicket").append(code_html)
                $("#MSallTicket").append("<option value=\"new\">- Nouveau ticket -</option>")
                $("#MSallTicket").removeAttr("hidden")
                newTicket()

                // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
            },

            error : function(resultat, statut, erreur){

            },

            complete : function(resultat, statut){

            }

        });
    } else {
        $("#MSallTicket").attr("hidden","")
    }
})

function newTicket(){
    $("#MSallTicket").change(function () {
        if ($(this).val()=="new"){
            $("#MSnewTicket").removeAttr("hidden")
        } else {
            $("#MSnewTicket").attr("hidden","")
        }
    })
}

$("#dellMail").click(function () {
    var mailId = getUrlParameter('id');
    console.log(mailId)
    $.confirm({
        title: 'Confirmation',
        content:'Vous allez effacer ce mail sans l\'avoir ajouter a un ticket',
        buttons: {
            Confirmer: function () {
                console.log(mailId)

                var fun  = 'delMail'
                $.ajax({
                    url : 'ajax.php',
                    type : 'GET',
                    data:'fun='+fun+"&mailId="+mailId,
                    dataType : 'html',
                    success : function(code_html, statut){
                        console.log(code_html)
                        location.href = "dashboard.php"
                        // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
                    },

                    error : function(resultat, statut, erreur){
                    },

                    complete : function(resultat, statut){

                    }

                });
            },
            Annuler : function () {

            }
        }
    })
})

$("#validateMail").click(function () {
    $(".wrong").removeClass("wrong")
    var text = CKEDITOR.instances['editor1'].getData()
    var ticket = $('#MSallTicket option:selected').text()
    var ticketId = $('#MSallTicket').val()
    var userId = $("#MSallUsers").val()
    var champOk = false;
    var needCreationTicket = false;
    if (userId != 0){
        if (ticketId == "new"){
            if ($('#MSnewTicket').val()==""){
                $("#MSnewTicket").addClass("wrong")

            } else {
                champOk =true
                needCreationTicket = true
            }

        } else if (ticketId != 0){
            champOk = true

        } else {
            $("#MSallTicket").addClass("wrong")
        }
    } else {
        $("#MSallUsers").addClass("wrong")
    }
    console.log("champOk : "+champOk)
    console.log("needCreationTicket : "+needCreationTicket)

    if (champOk){
        $.confirm({
            columnClass: 'col-md-4 col-md-offset-4',
            title: "Confirmation",
            content: "Le message suivant sera ajouté au ticket \""+ticket+"\" : <br><div style='background-color:#f4f3ef;border-radius: 8px ; padding: 5px '>"+text+"</div>",
            buttons: {
                Confirmer: function () {
                    if (needCreationTicket){
                        ticketId = createTicket($('#MSnewTicket').val(),userId)
                    }
                    moveMail(getUrlParameter('id'),text,ticketId,userId)

                },
                Annuler: function () {

                }
            }
        })
    }

})


function moveMail(mailId,mailContent,ticketId,userId) {
    var fun = 'moveMail';
    $.ajax({
        url : 'ajax.php',
        type : 'POST',
        data:'fun='+fun+"&mailId="+mailId+"&mailContent="+encodeURIComponent(mailContent)+"&ticketId="+ticketId+"&userId="+userId,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            location.href = "editTicket.php?id="+ticketId
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){
        },

        complete : function(resultat, statut){

        }

    });
}

function createTicket(sujet, client) {
    var id;
    var fun = 'createTicket';
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        async: false,
        data:'fun='+fun+"&sujet="+sujet+"&client="+client,
        dataType : 'html',
        success : function(code_html, statut){

            id = code_html;
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){
        },

        complete : function(resultat, statut){

        }

    });
    console.log(id)
    return id
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