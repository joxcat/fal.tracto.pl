var oldIndex = -1;
document.addEventListener('DOMContentLoaded', function () {
    var front = document.querySelector('div.front');
    var back = document.querySelector('div.back');
    sendAjaxRequest("GET", "data/questions.json", "", function (res) {
        var i = Math.floor(Math.random() * res.length);
        oldIndex = i;
        var el = res[i];
        front.innerHTML = el.front;
        back.innerHTML = el.back;
    });
    // Events listeners
    $('.header .im.im-sync').on('click', onShuffle);
    $('.action-button .im.im-sync').on('click', onShuffle);
    $('.card').on('click', onFlip);
});
function onFlip(_ev) {
    _ev.preventDefault();
    var card = document.querySelector('.card');
    if (card.classList.contains('active')) {
        card.classList.toggle('active', false);
    }
    else {
        card.classList.toggle('active', true);
    }
}
function onShuffle(_ev) {
    var card = document.querySelector('.card');
    var front = document.querySelector('div.front');
    var back = document.querySelector('div.back');
    if (_ev !== null) {
        var shuffle_1 = document.getElementById(_ev.target.id);
        shuffle_1.classList.toggle('active', true);
        setTimeout(function () {
            shuffle_1.classList.toggle('active', false);
        }, 750);
    }
    if (card.classList.contains('active')) {
        card.classList.toggle('active', false);
    }
    setTimeout(function () {
        sendAjaxRequest("GET", "data/questions.json", "", function (res) {
            var i = -1;
            do {
                i = Math.floor(Math.random() * res.length);
            } while (i === oldIndex);
            oldIndex = i;
            var el = res[i];
            front.innerHTML = el.front;
            back.innerHTML = el.back;
        });
    }, 750);
}
function sendAjaxRequest(_type, _url, _params, _callback) {
    var request = $.ajax({
        type: _type,
        url: _url,
        data: _params,
        contentType: 'json'
    });
    request.done(function (res) {
        _callback(res);
    });
    request.fail(function (jqXHR, textStatus) {
        console.error(jqXHR);
        _callback({ err: true, message: "Request failed: " + textStatus });
    });
}
