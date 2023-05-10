// Create the YouTube player
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'SfSRvJAepao',
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      disablekb: 1,
      enablejsapi: 1,
      iv_load_policy: 3,
      modestbranding: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.BUFFERING) {
    socket.emit('videoTime', player.getCurrentTime());
  }
}

// Socket.IO connection
const socket = io()

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('videoTime', (time) => {
  player.seekTo(time);
});

//-------------------------------------------------------------------------------
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var btnToggle = document.getElementById('btnToggle');
var colorPicker = document.getElementById('colorPicker');
var penSize = document.getElementById('penSize');
var penSizeDisplay = document.getElementById('penSizeDisplay');
var clearCanvas = document.getElementById('clearCanvas');

// Make the canvas the same size as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var drawing = false;
var drawMode = false;

ctx.strokeStyle = colorPicker.value; // Set the initial stroke color to match the input

btnToggle.onclick = function() {
    drawMode = !drawMode;
    if (drawMode) {
        canvas.style.zIndex = 500
        btnToggle.textContent = 'Switch to Interacting';
    } else {
        canvas.style.zIndex = 0;
        btnToggle.textContent = 'Switch to Drawing';
    }
};

colorPicker.onchange = function() {
    ctx.strokeStyle = this.value;
};

penSize.onchange = function() {
    ctx.lineWidth = this.value;
    penSizeDisplay.textContent = this.value;
};

clearCanvas.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

canvas.onmousedown = function(e) {
    if(!drawMode) return;

    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

canvas.onmouseup = function() {
    if(!drawMode) return;

    drawing = false;
};

canvas.onmousemove = function(e) {
    if(!drawMode || !drawing) return;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
};

// // Whenever the user seeks to a different time in the video
// player.addEventListener('seeked', () => {
// const currentTime = player.getCurrentTime();
// console.log(`Video time changed: ${currentTime}`); // Add this line
// socket.emit('videoTime', currentTime);
// });
