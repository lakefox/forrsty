let streams;

fetch("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSdSmRrcs_Dem0YjK_9z9iFDAqRiN21kY-e0DBx-Z4l-d3c163HdUok1nHj26qpJjn4_w7eMcd0UQJW/pub?gid=294828327&single=true&output=csv", {"credentials":"omit","headers":{"accept":"*/*","accept-language":"en-US,en;q=0.9","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}).then((csv) => {
  return csv.text()
}).then((res) => {
  streams = csvJSON(res);
  console.log(streams);
  let categories = [];
  for (var i = 0; i < streams.length; i++) {
    streams[i].index = i;
    let category = streams[i]["Category"];
    if (categories.indexOf(category) == -1) {
      categories.push(category);
    }
  }
  let html = "";
  for (var i = 0; i < categories.length; i++) {
    html += `<option value="${categories[i]}">${categories[i]}</option>`;
  }
  document.querySelector("#categories").innerHTML = html;
  render(streams);
});

document.querySelector("#categories").addEventListener("change",() => {

});

function render(channels) {
  let html = "";
  for (var i = 0; i < channels.length; i++) {
    let stream = channels[i];
    if (stream["Timestamp"] != "") {
      let url = new URL(stream["Url of Stream"]);
      if (url.search == "") {
        url.search += "?mute=true";
      } else {
        url.search += "&mute=true";
      }
      html += `
      <div class="item">
        <div class="player_constrainer" style="height: ${stream.height*(300/parseInt(stream.width))}px">
          <iframe src="${url.href}" style="width: ${stream.width}px; height: ${stream.height}px; transform: scale(${300/parseInt(stream.width)});" class="preview"></iframe>
        </div>
        <a class="id" target="_blank" href="https://forrsty.com/channel#${stream.index}">
          ${stream["Name of Stream"]} - Created By ${stream["Your Name"]}
        </a>
      </div>`;
    }
  }
  document.querySelector("#content").innerHTML = html;
}

function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(",");
    for(var j=0;j<headers.length;j++){
       obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}
