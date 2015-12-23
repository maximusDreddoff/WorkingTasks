/**
 * Created by MaksimNadolsky on 18-Dec-15.
 */

(function ($) {
    var TEST = window;
    TEST.WishList = {
        bookNames: [],
        bookAuthor: [],
        bookGenre: [],
        bookPrice: [],


        getBooksNames: function () {
            //инструкции цикла for по массиву объектов
            for (var i = 0; i < books.length; i++) {
                this.bookNames.push(books[i].name);
                this.bookAuthor.push(books[i].author);
                this.bookGenre.push(books[i].genre);
                this.bookPrice.push(books[i].price);
                //применение метода push() массива
            }
            //применение альтернативного цикла
            //for(var b in books) {
            //    bookNames.push(books[b].name)
            //}

            //сериализация массива в строку
            localStorage.setItem("name", JSON.stringify(this.bookNames));
            localStorage.setItem("author", JSON.stringify(this.bookAuthor));
            localStorage.setItem("genre", JSON.stringify(this.bookGenre));
            localStorage.setItem("price", JSON.stringify(this.bookPrice));
            //localStorage.setItem("clicks", JSON.stringify(clicks));

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
            var count = $('.count');

            //применение метода join() для массива
            count.append([
                    '<div>' + 'there are ' + '<span>' + JSON.parse(localStorage['name']).length + '</span>' + ' books in your wishlist' + '</div>'
                ].join('')
            );
        },


        createTable: function () {
            var localNames = JSON.parse(localStorage['name']),
                localAuthor = JSON.parse(localStorage['author']),
                localGenre = JSON.parse(localStorage['genre']),
                localPrice = JSON.parse(localStorage['price']),
                totalClicks = $('#totalClicks'),
                tableData = $('table');


            //инструкции цикла for по массиву
            for (var k = 0; k < localNames.length; k++) {
                //применение метода join() для массива
                tableData.append(["<tr>",
                    "<td>" + k + "</td>",
                    "<td>" + localNames[k] + "</td>",
                    "<td>" + localAuthor[k] + "</td>",
                    "<td>" + localGenre[k] + "</td>",
                    "<td>" + localPrice[k] + " $" + "</td>",
                    "</tr>"].join('')
                );
            }
            //применение тернарного операторa
            localStorage['clicks'] ? totalClicks.text(JSON.parse(localStorage['clicks'])) : totalClicks.text(0);
        },


        totalBookPrice: function () {
            var arr = JSON.parse(localStorage['price']);
            var newArr = arr.map(Number);
            var totalPrice = $('.totalPrice');
            var convert = $('.convertBtn');
            var byrId = $('#byr span');


            //применение метода map(), reduce(), join() для массива
            var result = newArr.reduce(function (sum, current) {
                return sum + current;
            }, 0);
            totalPrice.append([
                "<div>" + 'total sum : ' + '<span>' + result + ' $' + '</span>' + "</div>"
            ].join(''));

            convert.on('click', function () {
                var byr = result * 1800;
                $('#byr').css('display', 'block');
                byrId.text(byr + " p.");
            })
        },

        editLocalStorage: function () {
            var localNames = JSON.parse(localStorage['name']),
                localAuthor = JSON.parse(localStorage['author']),
                localGenre = JSON.parse(localStorage['genre']),
                localPrice = JSON.parse(localStorage['price']),
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
                localStorage.setItem("name", JSON.stringify(localNames));
                localStorage.setItem("author", JSON.stringify(localAuthor));
                localStorage.setItem("genre", JSON.stringify(localGenre));
                localStorage.setItem("price", JSON.stringify(localPrice));
            }


            function addNewBook() {
                newBookBtn.on('click', function () {
                    //использование оператора && (логического И )
                    if (newName.val() != 0 && newAuthor.val() && newGenre.val() && newPrice.val()) {
                        localNames.push(newName.val());
                        localAuthor.push(newAuthor.val());
                        localGenre.push(newGenre.val());
                        localPrice.push(newPrice.val());
                        //применение метода push() массива

                        //применение метода call() для косвенного вызова функции
                        WishList.alertNewBook.call(WishList, newName.val(), newAuthor.val(), newGenre.val(), newPrice.val());
                        location.reload()
                    }
                    else {
                        alert('error! Please fill all the fields')
                    }
                    setLocalStorage();
                });

            }

            function deleteLastBook() {
                deleteBookBtn.on('click', function () {
                    //применение метода pop() массива
                    var lastName = localNames[localNames.length - 1],
                        lastAuthor = localAuthor[localAuthor.length - 1],
                        lastGenre = localGenre[localGenre.length - 1],
                        lastPrice = localPrice[localPrice.length - 1];

                    //применение метода apply() для косвенного вызова функции

                    WishList.alertLastDeletedBook.apply(WishList, [lastName, lastAuthor, lastGenre, lastPrice]);
                    localNames.pop();
                    localAuthor.pop();
                    localGenre.pop();
                    localPrice.pop();

                    setLocalStorage();
                    location.reload()
                })
            }

            function deleteFirstBook() {
                deleteFirstBookBtn.on('click', function () {
                    //применение метода shift() массива
                    var firstName = localNames[0],
                        firstAuthor = localAuthor[0],
                        firstGenre = localGenre[0],
                        firstPrice = localPrice[0];

                    //применение метода bind() для обертки функции с последующим вызовом. Привязывем функцию к объекту
                    var alert = WishList.alertedFirstDeletedBook.bind(WishList);
                    alert(firstName, firstAuthor, firstGenre, firstPrice);


                    localNames.shift();
                    localAuthor.shift();
                    localGenre.shift();
                    localPrice.shift();
                    setLocalStorage();
                    location.reload()
                })
            }

            //применение замыкания
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

            addNewBook.call(TEST.WishList);
            deleteLastBook.apply(TEST.WishList);
            deleteFirstBook.call(TEST.WishList);
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
        },


        carouselFunctions: function () {
            var carousel = $('.carousel'),
                stopBtn = $('#btnStopCatousel'),
                playBtn = $('#btnPlayCatousel');

            function playStopCarousel () {
                stopBtn.on('click', function () {
                    carousel.carousel('pause')
                });
                playBtn.on('click', function () {
                    carousel.carousel('cycle')
                });
            }


            function setCarouselInterval () {
                carousel.carousel({
                    interval: 1000 / 2
                });
            }
            setCarouselInterval();
            playStopCarousel();
        }


    };

    localStorage.length > 0 ? TEST.WishList.filledLocalStorage() : TEST.WishList.emptyLocalStorage();
    TEST.WishList.carouselFunctions();


}(jQuery));