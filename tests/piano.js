let piano = Synth.createInstrument('piano');

let notes = "ABCDEFG".split("");
let notesWeights = makeWeights(notes.length);
let octaves = "12345".split("");
let octavesWeights = makeWeights(octaves.length);

function conductor(length) {
  let seeds = [parseInt(Math.random()*notes.length),parseInt(Math.random()*octaves.length)]
  let song = [[notes[seeds[0]],octaves[seeds[1]]]];
  for (var i = 0; i < length; i++) {
    let lr = parseInt(Math.random()*2);
    if (lr == 0) {
      // Left -
      let shiftNote = notesWeights[parseInt(Math.random()*notesWeights.length)]-1;
      let shiftOctave = octavesWeights[parseInt(Math.random()*octavesWeights.length)]-1;
      seeds[0] = (seeds[0]-shiftNote);
      seeds[1] = (seeds[1]-shiftOctave);
      song.push([notes.slice(seeds[0]).shift(),octaves.slice(seeds[1]).shift()]);
    } else {
      // Right +
      let shiftNote = notesWeights[parseInt(Math.random()*notesWeights.length)]-1;
      let shiftOctave = octavesWeights[parseInt(Math.random()*octavesWeights.length)]-1;
      seeds[0] = (seeds[0]+shiftNote)%notes.length;
      seeds[1] = (seeds[1]+shiftOctave)%octaves.length;
      song.push([notes.slice(seeds[0]).shift(),octaves.slice(seeds[1]).shift()]);

    }
  }
  return song;
}

function playSong(length) {
  let sounds = conductor(length);
  let index = 0;
  window.musicBox = setInterval(() => {
    piano.play(sounds[index][0],sounds[index][1],2);
    index++;
    if (index >= length) {
      clearInterval(window.musicBox);
    }
  },800);
}








// Tooling #####################################################################
function makeWeights(length) {
  length += 1;
  let weights = [];
  let lCopy = length;
  for (var a = 0; a < length; a++) {
    for (var b = 0; b < a; b++) {
      weights.push(lCopy-a)
    }
  }
  return shuffle(weights);
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

function negArray(arr) {
  return Proxy.create({
    set: function (proxy, index, value) {
        index = parseInt(index);
        return index < 0 ? (arr[arr.length + index] = value) : (arr[index] = value);
    },
    get: function (proxy, index) {
        index = parseInt(index);
        return index < 0 ? arr[arr.length + index] : arr[index];
    }
  });
}
