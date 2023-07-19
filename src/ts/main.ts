let oldIndex = -1;
let data = "data/spe.json";
let storage = window.localStorage;

document.addEventListener('DOMContentLoaded', () => {
  let front = document.querySelector('div.front');
  let back = document.querySelector('div.back');

  if (storage.getItem("data")) {
    data = storage.getItem("data");
    if (data === "data/insignes.json") {
        document.getElementById("headerb").innerHTML = "(Ins)";
    }
  }

  sendAjaxRequest("GET", data, "", (res) => {
    let i = Math.floor(Math.random() * res.length);
    oldIndex = i;
    let el = res[i];

    if (el.front === "Article 0") {
      back.classList.toggle("em115", true);
    } else {
      back.classList.toggle("em115", false);
    }

    front.innerHTML = el.front;
    back.innerHTML = el.back;
  });

  // Events listeners
  $('.action-button .im.im-sync').on('click', onShuffle);
  $('.card').on('click', onFlip);
  $("#headerb").on("click", (ev) => {
    ev.preventDefault();
    if (ev.target.innerHTML === "(Spé)") {
      ev.target.innerHTML = "(Ins)";
      data = "data/insignes.json";
    } else {
      ev.target.innerHTML = "(Spé)";
      data = "data/spe.json";
    }
    storage.setItem("data", data);
    onShuffle(null);
  });
});

function onFlip(ev: Event) {
  ev.preventDefault();
  let card: Element = document.querySelector('.card');
  if (card.classList.contains('active')) {
    card.classList.toggle('active', false);
  } else {
    card.classList.toggle('active', true);
  }
}

function onShuffle(ev: Event) {
  let card: Element = document.querySelector('.card');
  let front: Element = document.querySelector('div.front');
  let back: Element = document.querySelector('div.back');

  if (ev !== null) {
    let shuffle: Element = document.getElementById((<HTMLInputElement>ev.target).id);
    shuffle.classList.toggle('active', true);
    setTimeout(()=>{
      shuffle.classList.toggle('active', false);
    }, 250);
  }

  if (card.classList.contains('active')) {
    card.classList.toggle('active', false);
  }
  setTimeout(()=>{
    sendAjaxRequest("GET", data, "", (res) => {
      let i = -1;
      do {
        i = Math.floor(Math.random() * res.length);
      } while (i === oldIndex);
      oldIndex = i;
      let el = res[i];

      if (el.front === "Article 0") {
        back.classList.toggle("em115", true);
      } else {
        back.classList.toggle("em115", false);
      }

      front.innerHTML = el.front;
      back.innerHTML = el.back;
    });
  }, 250);
}

function sendAjaxRequest(type: string, url: string, params: string, callback: Function) {
  let request = $.ajax({
    type: type,
    url: url,
    data: params,
    contentType: 'json'
  });
  request.done(function(res) {
    callback(res);
  });
  request.fail(function(jqXHR, textStatus) {
    console.error(jqXHR);
    callback({ err: true, message: "Request failed: " + textStatus });
  });

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}