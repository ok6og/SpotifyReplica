﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/albums/GetAllAlbums",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "artist.fName", "width": "25%" },
            { "data": "title", "width": "20%" },
            { "data": "releaseDate", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/albums/Upsert/${data}" class='btn btn-success text-white'
                                    style='cursor:pointer;'> Edit </a>
                                    &nbsp;
                                <a onclick=Delete("/albums/Delete/${data}") class='btn btn-danger text-white'
                                    style='cursor:pointer;'> Delete </i></a>
                                <a onclick=Hide("/albums/Hide/${data}") class='btn btn-warning text-white'
                                    style='cursor:pointer;'> Hide </i></a>
                                </div>
                            `;
                }, "width": "30%"
            }
        ]
    });
}

function Delete(url) {
    swal({
        title: "Are you sure you want to Delete?",
        text: "You will not be able to restore the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}