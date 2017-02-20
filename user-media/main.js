'use strict';

const hasUserMedia = () => {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
	 || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

let video = document.querySelector('video');

let constraints = {
	 	video: true,
	 	audio: true
	};

const successCallback = (stream) => {
	
	if(window.URL) {
		video.src = window.URL.createObjectURL(stream);
	} else {
		video.src = stream;
	}
}

const errorCallback = (error) => {
	console.log('navigator.getUserMedia error: ', error);
}


if(hasUserMedia()) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
	 || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	 navigator.getUserMedia(constraints, successCallback , errorCallback);

} else {
	alert('Sorry, your browser does not support getUserMedia');
}




