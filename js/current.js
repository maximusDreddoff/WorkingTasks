/**
 * Created by MaksimNadolsky on 23-Dec-15.
 */


(function ($) {
    window.WishList = {
        bookTable: [],
        bookTableName: [],
        bookTableAuthor: [],
        bookTableGenre: [],
        bookTablePrice: [],


        getBooksNames: function () {
            //применение альтернативного цикла
            for (var b in books) {
                this.bookTable.push(books[b])
            }

            //сериализация массива в строку
            localStorage.setItem("table", JSON.stringify(this.bookTable));
        },


        alertNewBook: function (name, author, genre, price) {
            alert("you have created new book, with name: " + name + "; author: " + author + "; genre: " + genre + "; price: " + price)
        },


        alertLastDeletedBook: function (name, author, genre, price) {
            alert("you have just removed last book, with name: " + name + "; author: " + author + "; genre: " + genre + "; price: " + price)
        },


        alertedFirstDeletedBook: function (name, author, genre, price) {
            alert("you have just removed first book, with name: " + name + "; author: " + author + "; genre: " + genre + "; price: " + price)
        },


        addBooksLength: function () {
            var count = $('.BookLength');
            //применение метода join() для массива
            count.append([
                    '<div>' + 'you have ' + '<span>' + JSON.parse(localStorage['table']).length + '</span>' + ' books' + '</div>'
                ].join('')
            );
        },


        createTable: function () {
            var books = JSON.parse(localStorage['table']),
                totalClicks = $('#totalClicks'),
                tableData = $('.wishlist-table tbody');

            for (var i = 0; i < books.length; i++) {
                this.bookTableName.push(books[i].name);
                this.bookTableAuthor.push(books[i].author);
                this.bookTableGenre.push(books[i].genre);
                this.bookTablePrice.push(books[i].price);
                tableData.append(["<tr>",
                    "<td>" + i + "</td>",
                    "<td>" + books[i].name + "</td>",
                    "<td>" + books[i].author + "</td>",
                    "<td>" + books[i].genre + "</td>",
                    "<td>" + books[i].price + " $" + "</td>",
                    "</tr>"].join('')
                );
            }

            localStorage['clicks'] ? totalClicks.text(JSON.parse(localStorage['clicks'])) : totalClicks.text(0);
        },


        totalBookPrice: function () {
            var arr = this.bookTablePrice,
                newArr = arr.map(Number),
                totalPrice = $('.total span'),
                convert = $('.convertBtn'),
                byrId = $('#byr span');


            ////применение метода map(), reduce(), join() для массива
            var result = newArr.reduce(function (sum, current) {
                return sum + current;
            }, 0);
            totalPrice.append([
                result + ' $'
            ].join(''));

            convert.on('click', function () {
                var byr = result * 1800;
                $('#byr').css('display', 'block');
                byrId.text(byr + " p.");
            })
        },


        editLocalStorage: function () {
            var bookTables = JSON.parse(localStorage['table']),
                self = this,
                likeBtn = $('#like'),
                totalClicks = $('#totalClicks'),
                newName = $('#inputName'),
                newAuthor = $('#inputAuthor'),
                newGenre = $('#inputGenre'),
                newPrice = $('#inputPrice'),
                newBookBtn = $('#submitBtn'),
                deleteBookBtn = $('#deleteBookBtn'),
                deleteFirstBookBtn = $('#deleteFirstBookBtn');


            function setLocalStorage() {
                localStorage.setItem("table", JSON.stringify(bookTables));
            }


            function addNewBook() {
                var newBook = {};
                newBookBtn.on('click', function () {
                    //использование оператора && (логического И )
                    if (newName.val().length >= 3 && newAuthor.val().length >=3 && newGenre.val().length >= 3 && newPrice.val()) {
                        newBook.name = newName.val();
                        newBook.author = newAuthor.val();
                        newBook.genre = newGenre.val();
                        newBook.price = newPrice.val();
                        bookTables.push(newBook);

                        //применение метода call() для косвенного вызова функции
                        WishList.alertNewBook.call(WishList, newName.val(), newAuthor.val(), newGenre.val(), newPrice.val());
                        setLocalStorage();

                        location.reload()
                    }
                    else {
                        alert('error! Please enter valid information!')
                    }
                });

            }

            function deleteLastBook() {
                deleteBookBtn.on('click', function () {
                    var lastBookName = self.bookTableName[self.bookTableName.length - 1];
                    var lastBookAuthor = self.bookTableAuthor[self.bookTableAuthor.length - 1];
                    var lastBookGenre = self.bookTableGenre[self.bookTableGenre.length - 1];
                    var lastBookPrice = self.bookTablePrice[self.bookTablePrice.length - 1];

                    WishList.alertLastDeletedBook.apply(WishList, [lastBookName, lastBookAuthor, lastBookGenre, lastBookPrice]);
                    bookTables.pop();

                    setLocalStorage();
                    location.reload();
                });
            }

            function deleteFirstBook() {
                deleteFirstBookBtn.on('click', function () {
                    ////применение метода shift() массива
                    var firstName = self.bookTableName[0],
                        firstAuthor = self.bookTableAuthor[0],
                        firstGenre = self.bookTableGenre[0],
                        firstPrice = self.bookTablePrice[0];

                    ////применение метода bind() для обертки функции с последующим вызовом. Привязывем функцию к объекту
                    var alert = WishList.alertedFirstDeletedBook.bind(WishList);
                    alert(firstName, firstAuthor, firstGenre, firstPrice);

                    bookTables.shift();

                    setLocalStorage();
                    location.reload();
                })
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

            deleteLastBook();
            deleteFirstBook();
            addNewBook();
            likedPost();
        },


        init: function () {
            this.createTable();
            this.addBooksLength();
        },


        emptyLocalStorage: function () {
            this.getBooksNames();
            this.init();
            location.reload()
        },


        filledLocalStorage: function () {
            this.init();
            this.editLocalStorage();
            this.totalBookPrice();
        }

    };

    localStorage.length > 0 ? window.WishList.filledLocalStorage() : window.WishList.emptyLocalStorage();
    $('#users-table').DataTable();

}(jQuery));