$(".btnUtilisateur").click(function () {
    var id=$(this).attr("id");
    console.log(id)
    window.location.href="modifUser.php?user="+id;
})