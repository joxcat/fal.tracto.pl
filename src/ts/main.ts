let oldIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  let front = document.querySelector('div.front');
  let back = document.querySelector('div.back');

  sendAjaxRequest("GET", "data/questions.json", "", (res) => {
    let i = Math.floor(Math.random() * res.length);
    oldIndex = i;
    let el = res[i];
    front.innerHTML = el.front;
    back.innerHTML = el.back;
  });

  // Events listeners
  $('.header .im.im-sync').on('click', onShuffle);
  $('.action-button .im.im-sync').on('click', onShuffle);
  $('.card').on('click', onFlip);
});

function onFlip(_ev: Event) {
  _ev.preventDefault();
  let card: Element = document.querySelector('.card');
  if (card.classList.contains('active')) {
    card.classList.toggle('active', false);
  } else {
    card.classList.toggle('active', true);
  }
}

function onShuffle(_ev: Event) {
  let card: Element = document.querySelector('.card');
  let front: Element = document.querySelector('div.front');
  let back: Element = document.querySelector('div.back');

  if (_ev !== null) {
    let shuffle: Element = document.getElementById((<HTMLInputElement>_ev.target).id);
    shuffle.classList.toggle('active', true);
    setTimeout(()=>{
      shuffle.classList.toggle('active', false);
    }, 750);
  }

  if (card.classList.contains('active')) {
    card.classList.toggle('active', false);
  }
  setTimeout(()=>{
    sendAjaxRequest("GET", "data/questions.json", "", (res) => {
      let i = -1;
      do {
        i = Math.floor(Math.random() * res.length);
      } while (i === oldIndex);
      oldIndex = i;
      let el = res[i];
      front.innerHTML = el.front;
      back.innerHTML = el.back;
    });
  }, 750);
}

function sendAjaxRequest(_type: string, _url: string, _params: string, _callback: Function) {
  var request = $.ajax({
    type: _type,
    url: _url,
    data: _params,
    contentType: 'json'
  });
  request.done(function(res) {
    _callback(res);
  });
  request.fail(function(jqXHR, textStatus) {
    console.error(jqXHR);
    _callback({ err: true, message: "Request failed: " + textStatus });
  });

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}