let streams, channelId;

fetch("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSdSmRrcs_Dem0YjK_9z9iFDAqRiN21kY-e0DBx-Z4l-d3c163HdUok1nHj26qpJjn4_w7eMcd0UQJW/pub?gid=294828327&single=true&output=csv", {"credentials":"omit","headers":{"accept":"*/*","accept-language":"en-US,en;q=0.9","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}).then((csv) => {
  return csv.text()
}).then((res) => {
  streams = csvJSON(res);
  console.log(streams);
  channelId = (parseInt(window.location.hash.slice(1))+1 || parseInt(Math.random()*streams.length));
  channelId -= 1;
  window.location.hash = channelId;
  load(channelId);
  startChat();
});

function load(index) {
  let stream = streams[index];
  console.log(stream);
  document.querySelector("#name").innerHTML = stream["Name of Stream"];
  document.querySelector("#creator").innerHTML = "Created by "+stream["Your Name"];
  document.querySelector("#player").src = stream["Url of Stream"];
  document.querySelector("#player").style.width = stream.width+"px";
  document.querySelector("#player").style.height = stream.height+"px";
  document.querySelector("#player").style.transform = `scale(${
    document.querySelector("#content").offsetWidth/parseInt(stream.width)
  })`;
  document.querySelector("#player_constrainer").style.height = (document.querySelector("#player").getClientRects()[0].height+30)+"px";
}




//var csv is the CSV file with headers
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
let fx;
function startChat() {
  fx = new fox("forrsty", channelId.toString(), (msg, senderId)=>{
    // Handle the msg
    console.log(msg,senderId);
    document.querySelector("#chatBox").innerHTML += `
      <div class="other">
        ${msg}
      </div>
    `;
  }, "https://lake-4fwweg8qitsg.runkit.sh/");
}

function send() {
  fx.msg(document.querySelector("#chatText").innerHTML);
  document.querySelector("#chatBox").innerHTML += `
    <div class="you">
      ${document.querySelector("#chatText").innerHTML}
    </div>
  `;
  document.querySelector("#chatText").innerHTML = "";
}

document.querySelector("#chatText").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    send();
  }
});
