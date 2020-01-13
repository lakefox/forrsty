// Sample URL

// /ipod/?id=483718232&seed=vintage vaporwave vhs boy girl#0

let gifQue = [];

window.location.hash = parseInt(window.location.hash.slice(1)) || 0
loadGiphy(seed,parseInt(window.location.hash.slice(1)));

document.querySelector("#soundcloud").src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${id}&color=%23c1c5cb&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

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
  }
}
