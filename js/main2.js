/**
 * Created by MaksimNadolsky on 24-Dec-15.
 */
$(document).ready(function () {

    window.WishList = {


        getBooksName: function () {
            for (var k = 0; k < dataSet.length; k++) {
                dataSet[k].push("<button class='btn btn-warning edit'>Edit</button> <button class='btn btn-danger delete'>Delete</button>");
            }

            window.localStorage['dataSet'] == undefined ? localStorage.setItem('dataSet', JSON.stringify(dataSet)) : console.log('not empty');

            try {
                dataSet = JSON.parse(localStorage.getItem('dataSet')) || [];
            } catch (err) {
                dataSet = [];
            }

        },


        createTable: function () {
            var totalClicks = $('#totalClicks');

            $('#example').dataTable({
                "data": [],
                "columns": [{
                    "title": "Name"
                }, {
                    "title": "Author"
                }, {
                    "title": "Genre"
                }, {
                    "title": "Price"
                }, {
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

            var myTable = $('#example').DataTable();
            for (var i = 0; i < dataSet.length; i++) {
                myTable.row.add(dataSet[i]).draw();
            }
            localStorage['clicks'] ? totalClicks.text(JSON.parse(localStorage['clicks'])) : totalClicks.text(0);
        },


        editLocalStorage: function () {
            var self = this,
                likeBtn = $('#like'),
                totalClicks = $('#totalClicks'),
                newName = $('#inputName'),
                newAuthor = $('#inputAuthor'),
                newGenre = $('#inputGenre'),
                newPrice = $('#inputPrice'),
                newBookBtn = $('#submitBtn'),
                deleteBookBtn = $('#deleteBookBtn'),
                deleteFirstBookBtn = $('#deleteFirstBookBtn');


            function addNewBook() {
                var myTable = $('#example').DataTable();

                newBookBtn.on('click', function () {
                    if (newName.val().length >= 3 && newAuthor.val().length >= 3 && newGenre.val().length >= 3 && newPrice.val()) {
                        var data = [
                            $('#inputName').val(),
                            $('#inputAuthor').val(),
                            $('#inputGenre').val(),
                            $('#inputPrice').val(),
                            "<button class='btn btn-warning edit'>Edit</button> <button class='btn btn-danger delete'>Delete</button> "
                        ];
                        myTable.row.add(data).draw();
                        dataSet.push(data);
                        localStorage.setItem('dataSet', JSON.stringify(dataSet));
                    } else {

                        alert('error')

                    }
                    location.reload()

                });

            }

            function deleteBook() {
                var myTable = $('#example').DataTable();

                $(document).on('click', '.delete', function () {

                    var row = $(this).closest('tr');
                    myTable.row(row).remove().draw();

                    var name = $(row).find('td:first').text();

                    for (var i = 0; i < dataSet.length; i++) {
                        if (dataSet[i][0] == name) {
                            break;
                        }
                    }

                    dataSet.splice(i, 1);

                    localStorage.setItem('dataSet', JSON.stringify(dataSet));
                    location.reload()
                });
            }


            //    //применение замыкания
            function likedPost() {
                likeBtn.on('click', (function () {
                    var clicks;
                    localStorage['clicks'] ? clicks = JSON.parse(localStorage['clicks']) : clicks = 0;
                    return function () {
                        if (localStorage['clicks']) {
                            clicks++;
                            totalClicks.text(clicks);
                            localStorage.setItem("clicks", JSON.stringify(clicks));
                        }
                        else {
                            clicks++;
                            totalClicks.text(clicks);
                            localStorage.setItem("clicks", JSON.stringify(clicks));
                        }
                    };
                })())
            }


            function editBook() {

                var dialogWindow = $("#dialog"),
                    nameDialog = $("#nameDialog"),
                    authorDialog = $("#authorDialog"),
                    genreDialog = $("#genreDialog"),
                    priceDialog = $("#priceDialog"),
                    saveBtn = $(".saveBtn");

                dialogWindow.dialog({
                    autoOpen: false,
                    width: 'auto'
                });

                $(document).on('click', '.edit', function () {
                    var row = $(this).closest('tr');

                    var name = $(row).find('td:first').text();

                    for (var i = 0; i < dataSet.length; i++) {
                        if (dataSet[i][0] == name) {
                            break;
                        }
                    }


                    dialogWindow.dialog("open");
                    $("#dialog tr").css('color','black');

                    nameDialog.val($(row).find('td:first').html());
                    authorDialog.val($(row).find('td').eq(1).html());
                    genreDialog.val($(row).find('td').eq(2).html());
                    priceDialog.val($(row).find('td').eq(3).html());

                    saveBtn.click(function () {
                        if (nameDialog.val().length >= 3 && authorDialog.val().length >= 3 && genreDialog.val().length >= 3 && priceDialog.val()) {
                            $(row).find('td:first').html(nameDialog.val());
                            $(row).find('td').eq(1).html(authorDialog.val());
                            $(row).find('td').eq(2).html(genreDialog.val());
                            $(row).find('td').eq(3).html(priceDialog.val());
                            dialogWindow.dialog("close");

                            dataSet[i].splice(0,1,nameDialog.val());
                            dataSet[i].splice(1,1,authorDialog.val());
                            dataSet[i].splice(2,1,genreDialog.val());
                            dataSet[i].splice(3,1,priceDialog.val());

                            localStorage.setItem('dataSet', JSON.stringify(dataSet));
                            location.reload()
                        }
                        else {
                            $("#dialog tr").css('color','red');
                        }

                    });
                })

            }

            editBook();
            addNewBook();
            likedPost();
            deleteBook();
        },

        totalBookPrice: function () {
            var books = JSON.parse(localStorage['dataSet']),
                sum = 0,
                totalPrice = $('.total span');
            for (var i = 0; i < books.length; i++) {
                sum += +books[i][3];
            }

            totalPrice.append([
                sum + ' $'
            ].join(''));
        }


    };

    window.WishList.getBooksName();
    window.WishList.createTable();
    window.WishList.editLocalStorage();
    window.WishList.totalBookPrice();

}(jQuery));

