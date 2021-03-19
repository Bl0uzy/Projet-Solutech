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

$("#btnValidateUser").click(function () {
    $(this).popover('show')
    $(this).attr("disabled", true);
    var btn = $(this);
    var modif = getUrlParameter("user")
    var nom = $("#name").val();
    var entreprise = $("#entreprise").val();
    var email = $("#mail").val();
    var mdp = $("#passw").val();
    var fun;
    if (modif != undefined){
        fun = "modifUser"
    } else fun = "addUser"

    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&nom='+nom+'&entreprise='+entreprise+'&email='+email+'&mdp='+mdp+'&id='+modif,
        dataType : 'html',
        success : function(code_html, statut){
            // console.log(code_html)
            $(".popover-body").html(code_html)
            setTimeout(function () {
                $(btn).popover('hide')
            }, 2000)
            $(btn).attr("disabled", false);
            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
        },

        error : function(resultat, statut, erreur){

        },

        complete : function(resultat, statut){

        }

    });
})

$("#delUser").click(function () {
    var nom = $("#name").val();
    var id = getUrlParameter("user");
    var fun = "delUser"
    $.confirm({
        title: 'Attention',
        content: 'Vous allez supprimer l\'utilisateur '+nom,
        buttons: {
            Supprimer: {
                text : 'Supprimer',
                btnClass: 'btn-red',
                action:function () {
                    $.ajax({
                        url : 'ajax.php',
                        type : 'GET',
                        data:'fun='+fun+'&id='+id,
                        dataType : 'html',
                        success : function(code_html, statut){
                            if (code_html=="ok"){
                                $.alert("Supprimer")
                                setTimeout(function () {
                                    window.location.href="utilisateur.php"
                                },1700)
                            } else alert(code_html)
                            // $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
                        },

                        error : function(resultat, statut, erreur){

                        },

                        complete : function(resultat, statut){

                        }

                    });
                }
            },
            cancel: function () {
                // $.alert('Annuler');
            },
            // somethingElse: {
            //     text: 'Something else',
            //     btnClass: 'btn-blue',
            //     keys: ['enter', 'shift'],
            //     action: function(){
            //         $.alert('Something else?');
            //     }
            // }
        }
    });
})

$("#table_id").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editTicket.php?id="+$(this).attr("id")
})
$("#table_wiki").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editWiki.php?id="+$(this).attr("id")
})

$("#dateValiditee input[type = 'date']").change(function () {
    var date = $(this).val();
    var id = getUrlParameter("user")
    var fun = "modifDateUser"
    $.ajax({
        url : 'ajax.php',
        type : 'GET',
        data:'fun='+fun+'&date='+date+'&id='+id,
        dataType : 'html',
        success : function(code_html, statut){
            console.log(code_html)
            $("#dateValiditee input[type = 'checkbox']").attr("disabled",false)
            $("#dateValiditee input[type = 'checkbox']").prop("checked", true)
        },
        error : function(resultat, statut, erreur){
        },
        complete : function(resultat, statut){
        }
    });
})

$("#dateValiditee input[type = 'checkbox']").change(function () {
    var checked = $(this).is(":checked")
    if (!checked){
        var date = "";
        var id = getUrlParameter("user")
        var fun = "modifDateUser"
        $.ajax({
            url : 'ajax.php',
            type : 'GET',
            data:'fun='+fun+'&date='+date+'&id='+id,
            dataType : 'html',
            success : function(code_html, statut){
                console.log(code_html)
                $("#dateValiditee input[type = 'checkbox']").attr("disabled",true)
                $("#dateValiditee input[type = 'checkbox']").prop("checked", false)
                $("#dateValiditee input[type = 'date']").val("")
            },
            error : function(resultat, statut, erreur){
            },
            complete : function(resultat, statut){
            }
        });
    }
})