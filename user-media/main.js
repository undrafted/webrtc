'use strict';

const hasUserMedia = () => {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
	 || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

let video = document.querySelector('video');

let constraints = {
	 	video: {
	 		mandatory: {
	 			minWidth: 640,
	 			minHeight: 480
	 		}
	 	},
	 	audio: false
	};

	//very simple still unreliable user agent checker if mobile
	if(/Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		//The user is using a mobile device, lower our minimum resolution
		constraints = {
			video: {
				mandatory: {
					minWidth: 480,
					minHeight: 320,
					maxWidth: 1024,
					maxHeight: 768
				}
			},
			audio: true
		};
	}


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




