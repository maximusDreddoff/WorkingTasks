/**
 * Created by MaksimNadolsky on 15-Dec-15.
 */
//объявление глобальных переменных
var tableData = $('table'),
    count = $('.count'),
    totalPrice = $('.totalPrice'),
    convert = $('.convertBtn'),
    newBookBtn = $('#submitBtn'),
    deleteBookBtn = $('#deleteBookBtn'),
    deleteFirstBookBtn = $('#deleteFirstBookBtn'),
    newName = $('#inputName'),
    newAuthor = $('#inputAuthor'),
    newGenre = $('#inputGenre'),
    newPrice = $('#inputPrice'),
    likeBtn = $('#like'),
    totalClicks = $('#totalClicks'),
    bookNames = [],
    bookAuthor = [],
    bookGenre = [],
    bookPrice = [];


function startApp() {
    function getBooksNames() {
        //инструкции цикла for по массиву объектов
        for (var i = 0; i < books.length; i++) {
            bookNames.push(books[i].name);
            bookAuthor.push(books[i].author);
            bookGenre.push(books[i].genre);
            bookPrice.push(books[i].price);
            //применение метода push() массива
        }
        //применение альтернативного цикла
        //for(var b in books) {
        //    bookNames.push(books[b].name)
        //}

        //сериализация массива в строку
        localStorage.setItem("name", JSON.stringify(bookNames));
        localStorage.setItem("author", JSON.stringify(bookAuthor));
        localStorage.setItem("genre", JSON.stringify(bookGenre));
        localStorage.setItem("price", JSON.stringify(bookPrice));
        //localStorage.setItem("clicks", JSON.stringify(clicks));

    }

    getBooksNames();
    addBooksLength();
}


function addBooksLength() {
    //применение метода join() для массива
    count.append([
            '<div>' + 'there are ' + '<span>' + JSON.parse(localStorage['name']).length + '</span>' + ' books in your wishlist' + '</div>'
        ].join('')
    );
}

function totalBookPrice() {
    var arr = JSON.parse(localStorage['price']);
    var newArr = arr.map(Number);

    //применение метода map(), reduce(), join() для массива
    var result = newArr.reduce(function (sum, current) {
        return sum + current;
    }, 0);
    totalPrice.append([
        "<div>" + 'total sum : ' + '<span>' + result + ' $' + '</span>' + "</div>"
    ].join(''));

    convert.on('click', function () {
        var byr = result * 1800;
        $('.byr').append('total sum in BYR: ' + '<span>' + byr + ' p' + '</span>');
    })
}


function createTable() {
    var localNames = JSON.parse(localStorage['name']),
        localAuthor = JSON.parse(localStorage['author']),
        localGenre = JSON.parse(localStorage['genre']),
        localPrice = JSON.parse(localStorage['price']);

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
}


function editLocalStorage() {

    var localNames = JSON.parse(localStorage['name']),
        localAuthor = JSON.parse(localStorage['author']),
        localGenre = JSON.parse(localStorage['genre']),
        localPrice = JSON.parse(localStorage['price']);


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
        likeBtn.on('click', (function() {
            return function() {
                if(localStorage['clicks']) {
                    var clicks =  JSON.parse(localStorage['clicks']);
                    clicks++;
                    totalClicks.text(clicks);
                    localStorage.setItem("clicks", JSON.stringify(clicks));
                }
                else {
                    clicks = 0;
                    clicks++;
                    totalClicks.text(clicks);
                    localStorage.setItem("clicks", JSON.stringify(clicks));
                }
            };
        })())
    }

    addNewBook();
    deleteLastBook();
    deleteFirstBook();
    likedPost();

}


$(document).ready(function () {
    //if (localStorage.length > 0) {
    //    createTable();
    //    editLocalStorage();
    //    addBooksLength();
    //    totalBookPrice();
    //
    //}
    //else {
    //    //startApp();
    //    //createTable();
    //    //location.reload();
    //}

});
