var request = new XMLHttpRequest()

request.open('GET', 'https://ign-apis.herokuapp.com/videos', true)



var currentIndex = 0;

const infinity = `<img src="resources/icons8-infinity-100.png">`
const infinityRed = `<img src="resources/icons8-infinity-red-100.png">`
const closedCaptions = `<img src="resources/icons8-rectangle-100.png">`
const closedCaptionsRed = `<img src="resources/icons8-rectangle-red-100.png">`
const outerArrows = `<img src="resources/icons8-resize-horizontal-100.png">`
const outerArrowsRed = `<img src="resources/icons8-resize-horizontal-red-100.png">`
const hd = `<img src="resources/icons8-hd-100.png">`
const hdRed = `<img src="resources/icons8-hd-red-100.png">`
const windowScreen = `<img src="resources/icons8-resize-100.png">`
const windowScreenRed = `<img src="resources/icons8-resize-red-100.png">`
var loop = false
var loopCounter = 0
var ccOn = false
var hdOn = false
var displayAllTags = false
var displaySeries = false


request.onload = function() {
    var data = JSON.parse(this.response)

    if(request.status >= 200 && request.status < 400) {
        var e = document.createElement("source");
        e.setAttribute("src", data.data[currentIndex].assets[0].url)
        e.setAttribute("id", "videoSrc")
        e.setAttribute("type", "video/mp4")
        var videos = document.getElementById("videos")
        videos.addEventListener('ended', (x) => {
            x.preventDefault()
            changeToNextVideo(data)
        })
        videos.appendChild(e)


        // infinty loop
        const infinityButton = document.getElementById('infinity-button')
        
        infinityButton.addEventListener('click', function () {
            loopCounter++
            if(loopCounter % 2 == 0) {
                infinityButton.innerHTML = infinity
                loop = !loop
            }
            else {
                infinityButton.innerHTML = infinityRed
                loop = !loop
            }
        })
        
       
        const ccButton = document.getElementById("subtitles-button")
       
        ccButton.addEventListener('click', function() {  
            if(ccOn == false) {
                ccOn = true
                ccButton.innerHTML = closedCaptionsRed
                
                oneTag.innerHTML = data.data[currentIndex].tags[0]
                
            }
            else {
                ccOn = false
                ccButton.innerHTML = closedCaptions
                oneTag.innerHTML = ""
            }

        })

         // outer arrows button - for displaying all tags
        const expandButton = document.getElementById('expand-button')
        var multiTag = document.getElementById("multTags")

        expandButton.addEventListener('click', function () {
            if(displayAllTags == false) {
                expandButton.innerHTML = outerArrowsRed
                displayAllTags = true
                arr = data.data[currentIndex].tags
                for(var i = 0; i < arr.length; i++) {
                    if(i != arr.length - 1) {
                        multiTag.innerHTML += arr[i] + ", "
                    }
                    else {
                        multiTag.innerHTML += arr[i]
                    }
                }
            }
            else {
                expandButton.innerHTML = outerArrows
                displayAllTags = false
                multiTag.innerHTML = ""
            }
        })
        
          // hd button
        const hdButton = document.getElementById('hd-button')
        
        hdButton.addEventListener('click', function () {
            if(hdOn == false) {
                hdButton.innerHTML = hdRed
                hdOn = true
            }
            else {
                hdButton.innerHTML = hd
                hdOn = false
            }
        })
        
           // display series button
           const fsButton = document.getElementById('fullscreen-button')
           var vidSeriesDisplay = document.getElementById('videoSeries')
           fsButton.addEventListener('click', function () {
               if(displaySeries == false) {
                   fsButton.innerHTML = windowScreenRed
                   displaySeries = true
                   vidSeriesDisplay.innerHTML = "Video Series: " + data.data[currentIndex].metadata.videoSeries
                   console.log(data.data[currentIndex].metadata.videoSeries)
                }
               else {
                   fsButton.innerHTML = windowScreen
                   displaySeries = false
                   vidSeriesDisplay.innerHTML = ""
               }
           })


        // video playlist queue
        for(var i = data.startIndex; i < data.count; i++) { 
            var videoElement = document.createElement("div")
            
            videoElement.setAttribute("class", "videoElement")
            var imageLink = document.createElement("a")
            var videoTitle = document.createElement("a")

            videoTitle.innerHTML = data.data[i].metadata.title
            videoTitle.setAttribute("class", "elementTitle")
            videoTitle.setAttribute("href", "#")
            // set i
            videoTitle.setAttribute("data-index-number", i)
            videoTitle.addEventListener('click', (x) => {
                x.preventDefault()
                clickVideoTitle(x, data)
            })

            imageLink.setAttribute("class", "elementLink")
            imageLink.setAttribute("href", "#")
            


            var videoImg = document.createElement("img")
            videoImg.setAttribute("data-index-number", i)
            videoImg.setAttribute("src", data.data[i].thumbnails[0].url)
            videoImg.addEventListener('click', (x) => {
                x.preventDefault()
                clickVideoImage(x, data)

            })
            imageLink.appendChild(videoImg)

            // video duration bubble for images
            var vidDuration = document.createElement("div")
            var totalSeconds = data.data[i].metadata.duration 
           
            if(totalSeconds >= 3600) {
                // calculations taken off of codegrepper.com
                var hrs = Math.floor(totalSeconds / 3600);
                var minutes = Math.floor((totalSeconds - (hrs*3600)) / 60);
                var seconds = totalSeconds - (hrs * 3600) - (minutes * 60);

                var secString = String(seconds).padStart(2, '0')
                var minString = String(minutes).padStart(2, '0')
                var hrsString = String(hrs).padStart(2, '0')
                vidDuration.innerHTML = hrs + ":" + minutes + ":" + seconds
            }
            else {
                var minutes = Math.floor(totalSeconds / 60)
                var remainingSeconds = totalSeconds - minutes * 60
                var remainingSecondsString = String(remainingSeconds).padStart(2, '0')
                vidDuration.innerHTML = minutes + ":" + remainingSecondsString
            }
            
            vidDuration.setAttribute("class", "vidDuration")
            
            var container = document.createElement("div")
            container.setAttribute("position", "relative")
          
            container.appendChild(imageLink)
            container.appendChild(vidDuration)

            


            // add link containing img to videoElement
            videoElement.appendChild(container)
            videoElement.appendChild(videoTitle)
            var scrollableField = document.getElementsByClassName("scrollable-field")[0]
            scrollableField.appendChild(videoElement)
                        
           
        }
        getVideoTitle(data.data, currentIndex)
        getVideoDescription(data.data, currentIndex)
    } else {
        console.log("error")
    }


}

request.send()




function getVideoTitle(arr, index) {
    var title = document.getElementById("videoTitle")
    title.innerHTML = arr[index].metadata.title;
}

function getVideoDescription(arr, index) {
    var desc = document.getElementById("videoDescription")
        
    desc.innerHTML = arr[index].metadata.description;
}

function resetControls() {
    const hdButton = document.getElementById('hd-button')
    const expandButton = document.getElementById('expand-button')
    var multiTag = document.getElementById("multTags")
    var fsButton = document.getElementById("fullscreen-button")
    var ccButton = document.getElementById("subtitles-button")
    var vidSeriesDisplay = document.getElementById('videoSeries')

    expandButton.innerHTML = outerArrows
    multiTag.innerHTML = ""
    displayAllTags = false

    ccButton.innerHTML = closedCaptions
    ccOn = false
    oneTag.innerHTML = ""

    hdButton.innerHTML = hd
    hdOn = false

    fsButton.innerHTML = windowScreen
    displaySeries = false
    vidSeriesDisplay.innerHTML = ""
}


function clickVideoTitle(e, data) {
   var playButton = document.getElementById("play-button")
   playButton.innerHTML = pause

   var videoNumber = e.target.getAttribute('data-index-number')
   var videoSrc = document.getElementById("videoSrc")

   currentIndex = videoNumber
   videoSrc.setAttribute("src", data.data[videoNumber].assets[0].url)
   var vid = document.getElementById("videos")
   vid.load()
   vid.play()

   getVideoTitle(data.data, currentIndex)
   getVideoDescription(data.data, currentIndex)

   resetControls()

}

function clickVideoImage(e, data) {
    var videoNumber = e.target.getAttribute('data-index-number')
    var videoSrc = document.getElementById("videoSrc")
   
    
    currentIndex = videoNumber
    videoSrc.setAttribute("src", data.data[videoNumber].assets[0].url)
    var vid = document.getElementById("videos")
    vid.load()
    vid.play()

    var playButton = document.getElementById("play-button")
    playButton.innerHTML = pause
   
    getVideoTitle(data.data, currentIndex)
    getVideoDescription(data.data, currentIndex)

    resetControls()
}

function changeToNextVideo(data) {
    var videoSrc = document.getElementById("videoSrc")
    // if loop is on from clicking infinity button, reset this video and play
    if(loop) {
        var video = document.getElementById("videos")
        video.pause();
        video.currentTime = 0;
        video.play();
    }
    else {
        if(currentIndex == 9) {
            currentIndex = 0
        }
        else {
            currentIndex++
        }
        videoSrc.setAttribute("src", data.data[currentIndex].assets[0].url)
        var vid = document.getElementById("videos")
        vid.load()
        vid.play()
    
        getVideoTitle(data.data, currentIndex)
        getVideoDescription(data.data, currentIndex)

        resetControls()
    }
    
}