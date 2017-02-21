'use strict';

const hasUserMedia = () => {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
	 || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

let video = document.querySelector('video'),
		canvas = document.querySelector('canvas'),
		streaming = false;


let constraints = {
    video: true,
    audio: false
  };

 const successCallback = (stream) => {
 	video.srcObject = stream;
 	streaming = true;
 }

//getUserMedia error
const errorCallback = (error) => {
	console.log('navigator.getUserMedia error: ', error);
}

if(hasUserMedia()) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
	 || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia(constraints, successCallback, errorCallback);

	document.querySelector('#capture').addEventListener('click', function(event) {
		if(streaming) {
			canvas.width = video.clientWidth;
			canvas.height = video.clientHeight;
			let context = canvas.getContext('2d');
			context.drawImage(video, 0, 0);
		}

	});

} else {
	alert('Sorry, not supported');
}

let filters = ['', 'grayscale', 'sepia', 'invert'],
	currentFilter = 0;

document.querySelector('video').addEventListener('click', function(event){
	if(streaming){
		canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);
    	
    	currentFilter++;
    	if(currentFilter > filters.length - 1) currentFilter = 0;
    	canvas.className = filters[currentFilter];
	}

});



