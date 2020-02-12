let xhttp = new XMLHttpRequest();
const targetElm = document.getElementById('sunmedia');
    
function createVideoElement(src, resolve, reject) {
    xhttp.onreadystatechange = onReadyStateChange(reject);
    xhttp.open("GET", src, true);
    xhttp.responseType = 'blob';

    xhttp.onload = function(evt){
        let blob = new Blob([evt.target.response], {type: "video/mp4"});
        let videoUrl = URL.createObjectURL(blob);
        let video = document.createElement('video');
        video.src = videoUrl;
        resolve(video);
    }
    
    xhttp.send();
}

let onReadyStateChange = function (reject) {
    return function () {
        if (this.readyState === 4 && this.status !== 200) {
            reject(this.status);
        }
    }
};

/**
 *
 * @param {string} src The video media file url
 * @return {HTMLVideoElement}
 */
let promiseVideoLoad = new Promise((resolve, reject) => {
    createVideoElement('https://vod.addevweb.com/sunmedia/demos/v/normal.mp4', resolve, reject);
});

promiseVideoLoad
    .then(saveVideo)
    .catch(errorVideo);

function saveVideo(videoElm) {
    onInsertVideoWhenTargetIsVisible(targetElm, videoElm);
}

function errorVideo(response) {
    console.log("Video couldn't load. Response: "+response);
}

/**
 * @param {HTMLDivElement} targetElm
 * @param {HTMLVideoElement} videoElm
 */
function onInsertVideoWhenTargetIsVisible(targetElm, videoElm) {
    const intersectionObserver = new IntersectionObserver((entries) => {
        let [entry] = entries;
        if (entry.isIntersecting && !videoElm.playing) {
            insertVideo(targetElm, videoElm);
        }
        else{
            errorInsertVideo();
        }
    });
    intersectionObserver.observe(targetElm);
}

function insertVideo(targetElm, videoElm) {
    targetElm.appendChild(videoElm);
    var promiseVideoPlay = videoElm.play();
    if (promiseVideoPlay !== undefined) {
        promiseVideoPlay.then(resolve => {
            console.log("User interacted before playing video.");
        }).catch(error => {
            console.log("User didn't interact with the video, autoplaying without sound.");
            videoElm.muted = true;
            videoElm.play();
        });
    }
    videoElm.onended = function(){
        targetElm.removeChild(videoElm);
    }
}

function errorInsertVideo() {
    console.log("Video isn't in viewport or is already playing.");
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});