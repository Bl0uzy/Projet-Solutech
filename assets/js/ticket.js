var dataSource;
$(document).ready(function () {
    var dataTable = $("#table_id").DataTable({
        "scrollY": "60vh",
        "scrollCollapse": true,
        "paging": false,
        info: false,
        language: {
            searchPanes: {
                clearMessage: 'Supprimer le filtre',
                viewTotal: false,
                title:'Nombre de filtre séléctionné : %d',
                collapse: 'Filtre',
                countFiltered: ' ({total})'
            }
        },
        buttons: [
            {
                extend: 'searchPanes',
                config: {
                    viewTotal: false,
                    controls: false,
                    viewCount: false,
                    cascadePanes: true,
                }
            }
        ],

        dom: 'Bfrtip',
        columnDefs: [
            {
                "targets": [ 6 ],
                "visible": false
            },
            {
                searchPanes: {
                    show: true,
                },
                targets: [3,6]
            },

            {
                searchPanes: {
                    show: false,
                },
                targets: [0,1,2,4,5]
            }

        ]
    })
    dataTable.buttons().container().appendTo('#table_id_filter',dataTable.table().container())
    dataSource = dataTable.rows().data()
    console.log(dataSource)
})


$("#filtre").click(function (){
    if ($("#contentFiltre").css("display")=="none"){
        $("#contentFiltre").show()
        // console.log($(this).children("img"))
        $(this).children("img").attr("class","img-retournee")
    } else {
        $("#contentFiltre").hide()
        $(this).children("img").attr("class","")
    }
})
$("#addTicket").popover({
    html : true,
    container : 'body',
    sanitize : false
})



$("#table_id").on('click','tbody tr',function () {
    console.log($(this).attr("id"))
    window.location.href="editTicket.php?id="+$(this).attr("id")
})

// $("#addTicket").click(function () {
//     $(this).popover()
// })
