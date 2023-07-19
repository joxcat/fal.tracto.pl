var oldIndex = -1;
var data = "data/spe.json";
var storage = window.localStorage;
document.addEventListener('DOMContentLoaded', function () {
    var front = document.querySelector('div.front');
    var back = document.querySelector('div.back');
    if (storage.getItem("data")) {
        data = storage.getItem("data");
        if (data === "data/insignes.json") {
            document.getElementById("headerb").innerHTML = "(Ins)";
        }
    }
    sendAjaxRequest("GET", data, "", function (res) {
        var i = Math.floor(Math.random() * res.length);
        oldIndex = i;
        var el = res[i];
        if (el.front === "Article 0") {
            back.classList.toggle("em115", true);
        }
        else {
            back.classList.toggle("em115", false);
        }
        front.innerHTML = el.front;
        back.innerHTML = el.back;
    });
    // Events listeners
    $('.action-button .im.im-sync').on('click', onShuffle);
    $('.card').on('click', onFlip);
    $("#headerb").on("click", function (ev) {
        ev.preventDefault();
        if (ev.target.innerHTML === "(Spé)") {
            ev.target.innerHTML = "(Ins)";
            data = "data/insignes.json";
        }
        else {
            ev.target.innerHTML = "(Spé)";
            data = "data/spe.json";
        }
        storage.setItem("data", data);
        onShuffle(null);
    });
});
function onFlip(ev) {
    ev.preventDefault();
    var card = document.querySelector('.card');
    if (card.classList.contains('active')) {
        card.classList.toggle('active', false);
    }
    else {
        card.classList.toggle('active', true);
    }
}
function onShuffle(ev) {
    var card = document.querySelector('.card');
    var front = document.querySelector('div.front');
    var back = document.querySelector('div.back');
    if (ev !== null) {
        var shuffle_1 = document.getElementById(ev.target.id);
        shuffle_1.classList.toggle('active', true);
        setTimeout(function () {
            shuffle_1.classList.toggle('active', false);
        }, 250);
    }
    if (card.classList.contains('active')) {
        card.classList.toggle('active', false);
    }
    setTimeout(function () {
        sendAjaxRequest("GET", data, "", function (res) {
            var i = -1;
            do {
                i = Math.floor(Math.random() * res.length);
            } while (i === oldIndex);
            oldIndex = i;
            var el = res[i];
            if (el.front === "Article 0") {
                back.classList.toggle("em115", true);
            }
            else {
                back.classList.toggle("em115", false);
            }
            front.innerHTML = el.front;
            back.innerHTML = el.back;
        });
    }, 250);
}
function sendAjaxRequest(type, url, params, callback) {
    var request = $.ajax({
        type: type,
        url: url,
        data: params,
        contentType: 'json'
    });
    request.done(function (res) {
        callback(res);
    });
    request.fail(function (jqXHR, textStatus) {
        console.error(jqXHR);
        callback({ err: true, message: "Request failed: " + textStatus });
    });
}
