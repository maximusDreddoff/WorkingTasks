/**
 * Created by MaksimNadolsky on 05-Jan-16.
 */
$(document).ready(function() {

    var dataSet = [
        [ "Javascript", "David Flanagan", "learning", "100"],
        [ "PHP", "Luke Welling", "learning", "120"],
        [ "Learning JavaScript Design Patterns", "Addy Osmani", "learning", "400"],
        [ "Understanding ECMAScript 6", "Nicholas C. Zakas", "learning", "204"],
        [ "Programming JavaScript Applications", "Eric Elliot", "learning", "214"],
        [ "The C Programming Language", "Brian W. Kernighan", "learning", "514"],
        [ "Programming Pearls", "Jon L. Bentley", "learning", "114"],
        [ "Java Concurrency in Practice", "Brian Goetz", "learning", "321"],
        [ "Harry Potter", "J. K. Rowling", "adventure", "134"]
    ];
    for (var k = 0; k < dataSet.length; k++) {
        dataSet[k].push("<button class='btn btn-danger delete'>Delete</button>")
    }

    if(window.localStorage['dataSet'] == undefined ) {
        localStorage.setItem('dataSet', JSON.stringify(dataSet));
    }

    try{
        dataSet = JSON.parse(localStorage.getItem('dataSet')) || [];
    } catch (err) {
        dataSet = [];
    }

    $('#example').dataTable( {
        "data": [],
        "columns": [{
            "title": "name"
        }, {
            "title": "author"
        }, {
            "title": "genre"
        }, {
            "title": "price"
        },{
            "title": "Action"
        }],
        "bStateSave": true,
        "stateSave": true,
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": true,
        "bInfo": true,
        "bAutoWidth": false
    });
    var oTable = $('#example').DataTable();
    for (var i = 0; i < dataSet.length; i++) {
        oTable.row.add(dataSet[i]).draw();
    }


//
    $('#submitBtn').on('click', function () {
        if ($('#inputName').val() == '' || $('#inputAuthor').val() == '' || $("#inputGenre").val() == '' || $("#inputPrice").val() == '' ) {
            alert('error')

        } else {

            var data = [
                $('#inputName').val(),
                $('#inputAuthor').val(),
                $('#inputGenre').val(),
                $('#inputPrice').val(),
                "<button class='btn btn-danger delete'>Delete</button>"
            ];
            oTable.row.add(data).draw();
            dataSet.push(data);
            localStorage.setItem('dataSet', JSON.stringify(dataSet));
        }});


    $(document).on('click', '.delete', function() {
        var row = $(this).closest('tr');
        oTable.row(row).remove().draw();
        var name = $(row).find('td:first').text();
        for (var i = 0; i < dataSet.length; i++) {
            if (dataSet[i][0] == name) {
                break;
            }
        }
        dataSet.splice(i, 1);
        localStorage.setItem('dataSet', JSON.stringify(dataSet));
    });

}(jQuery));
