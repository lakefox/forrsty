// Sample URL

// /ipod/?id=483718232&seed=vintage vaporwave vhs boy girl&to=263478169#0

let gifQue = [];
let questions = [];

setTimeout(() => {
  window.location.reload();
},parseInt(to || "3600000"));

window.location.hash = parseInt(window.location.hash.slice(1)) || 0
loadTriva();
loadGiphy(seed,parseInt(window.location.hash.slice(1)));

if (typeof mute != "undefined") {
    document.querySelector("#soundcloud").src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${id}&color=%23c1c5cb&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
}

function loadGiphy(search,offset) {
  let key = "RyxTulioP0ouW0EBJzZYz4QgDWMaK1JR";
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${encodeURIComponent(search)}&limit=25&offset=${offset}&rating=R&lang=en`).then((res) => {
    return res.json();
  }).then((data) => {
    gifQue = gifQue.concat(data.data);
    if (document.querySelector("#gif").src == "") {
      next();
      let current = parseInt(window.location.hash.slice(1));
      window.location.hash = current - 1;
    }
  });
}

setInterval(() => {
  next();
},180000);

function next() {
  document.querySelector("#gif").src = gifQue[0].embed_url;
  gifQue.shift();
  let current = parseInt(window.location.hash.slice(1));
  window.location.hash = current + 1;

  if (gifQue.lenght < 10) {
    loadGiphy(seed,current);
    window.location.hash = current + 25;
    loadTriva();
  }
}

setInterval(() => {
  document.querySelector(`#a${cI}`).classList.add("correct");
  setTimeout(() => {
    document.querySelector(`#a${cI}`).classList.remove("correct");
    setTimeout(nextQuestion,500);
  },20000);
},60000);

let cI = 0;
function nextQuestion() {
  document.querySelector("#question").innerHTML = questions[0].question;
  questions[0].incorrect_answers.push(questions[0].correct_answer);
  let as = shuffle(questions[0].incorrect_answers);
  cI = as.indexOf(questions[0].correct_answer)+1;
  document.querySelector("#a1").innerHTML = "A. "+as[0];
  document.querySelector("#a2").innerHTML = "B. "+as[1];
  document.querySelector("#a3").innerHTML = "C. "+as[2];
  document.querySelector("#a4").innerHTML = "D. "+as[3];
  questions.shift();
}

function loadTriva() {
  fetch(`https://opentdb.com/api.php?amount=25&type=multiple`).then((res) => {
    return res.json();
  }).then((data) => {
    questions = questions.concat(data.results);
    nextQuestion();
  });
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
