const play = `<img src="resources/icons8-play-100.png">`;
const pause = `<img src="resources/icons8-pause-100.png">`;
const sound = `<img src="resources/icons8-sound-100.png">`;
const mute = `<img src="resources/icons8-mute-100.png">`;




const playButton = document.getElementById('play-button');
const video = document.getElementById('videos');
const timeline = document.querySelector('.timeline');
const soundButton = document.querySelector('.sound-button');
const fullscreenButton = document.querySelector('.fullscreen-button');
const videoContainer = document.querySelector('.player');
const volumeBar = document.querySelector('.volumeBar');
const timePara = document.querySelector('#time');




video.onloadedmetadata = function() {
    var currTimeSeconds = Math.floor(video.currentTime);
    var maxDuration = Math.ceil(this.duration);
    timePara.innerHTML = convertTotalSecondsToTimeString(currTimeSeconds) + " / " + convertTotalSecondsToTimeString(maxDuration);
}


playButton.addEventListener('click', function () {
    if (video.paused) {
      video.play();
      videoContainer.classList.add('playing');
      playButton.innerHTML = pause;
    } else {
      video.pause();
      videoContainer.classList.remove('playing');
      playButton.innerHTML = play;
    }
  });

 

  soundButton.addEventListener('click', function () {
    video.muted = !video.muted;
    soundButton.innerHTML = video.muted ? mute : sound;
  });

  video.ontimeupdate = function () {
    const percentagePosition = (100*video.currentTime) / video.duration;
    timeline.style.backgroundSize = `${percentagePosition}% 100%`;
    timeline.value = percentagePosition;

    
    // update current time
    var currTimeSeconds = Math.floor(video.currentTime);
    var maxDuration = Math.ceil(video.duration);
    
    timePara.innerHTML = convertTotalSecondsToTimeString(currTimeSeconds) + " / " + convertTotalSecondsToTimeString(maxDuration);
   
  }

  function convertTotalSecondsToTimeString(numSeconds) {
      if(numSeconds >= 3600) {
        // calculations taken off of codegrepper.com
        var hrs = Math.floor(numSeconds / 3600);
        var minutes = Math.floor((numSeconds - (hrs*3600)) / 60);
        var seconds = numSeconds- (hrs * 3600) - (minutes * 60);

        var secString = String(seconds).padStart(2, '0')
        var minString = String(minutes).padStart(2, '0')
        var hrsString = String(hrs).padStart(2, '0')
        return hrs + ":" + minutes + ":" + seconds;
    }
    else {
        var minutes = Math.floor(numSeconds / 60)
        var remainingSeconds = numSeconds - minutes * 60
        var remainingSecondsString = String(remainingSeconds).padStart(2, '0')
        return minutes + ":" + remainingSecondsString;
    }
  }

  timeline.addEventListener('change', function () {
    const time = (timeline.value * video.duration) / 100;
    video.currentTime = time;
  });

  volumeBar.addEventListener('change', function() {
      video.volume = this.value / 100;
  })