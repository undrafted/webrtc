'use strict';

const hasUserMedia = () => {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
	 || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

let video = document.querySelector('video');
let audioSource = null;
let videoSource = null;

//callback function for success in navigator.mediaDevices.enumerateDevices()
let gotDevices = (sources) => {

	for(let source of sources){

		if(source.kind === 'audioinput'){
			console.log('Microphone found:', source.label, source.deviceId);
			audioSource = source.deviceId;

		} else if(source.kind === 'videoinput'){
			console.log('Camera found:', source.label, source.deviceId);
			videoSource = source.deviceId;

		} else {
			console.log('Other source found:' , source);
		}
	}
}

//show all the media devices available for the user
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch((error) => { console.log(error);});

//specifying constraints for the UserMedia
let constraints = {
	 	video: {
	 		mandatory: {
	 			minWidth: 640,
	 			minHeight: 480
	 		},
	 		optional: [{sourceId: videoSource}]
	 	},
	 	audio: {
	 		optional: [{sourceId: audioSource}]
	 	}
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


//getUserMedia success
const successCallback = (stream) => {
		video.srcObject = stream;
	}

//getUserMedia error
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




