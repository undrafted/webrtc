const hasUserMedia = () => {
     navigator.getUserMedia = navigator.getUserMedia ||
   navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
   navigator.msGetUserMedia;
     return !!navigator.getUserMedia;
   }

const hasRTCPeerConnection = () => {
     window.RTCPeerConnection = window.RTCPeerConnection ||
   window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
     return !!window.RTCPeerConnection;
}


let yourVideo = document.querySelector('#yours');
let theirVideo = document.querySelector('#theirs');
let yourConnection, theirConnection;


const offerSuccess = (offer) => {

	yourConnection.setLocalDescription(offer);
	theirConnection.setRemoteDescription(offer);

	theirConnection.createAnswer((offer) => {

		theirConnection.setLocalDescription(offer);
		yourConnection.setRemoteDescription(offer);
	}, (error) => {
		console.log('Answer error: ', error);
	});
};

const offerError = (error) => {
	console.log('Offer error:', error);
}

const startPeerConnection = (stream) => {

	let configuration = {
		//Uncomment this code to add custom iceServers
		'iceServers' : [{'url' : 'stun:stun.1.google.com:19302'}]
	};

	yourConnection = new webkitRTCPeerConnection(configuration);
	theirConnection = new webkitRTCPeerConnection(configuration);

	//Setup stream listening
	yourConnection.addStream(stream);

	theirConnection.onaddstream = function(event){

		theirVideo.srcObject = event.stream;
	}

	//set up ice handling
	yourConnection.onincecandidate = (event) => {
		if(event.candidate){
			theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
		}
	};

	theirConnection.onincecandidate = (event) => {
		if(event.candidate){
			yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
		}
	};

	//Begin the offer
	yourConnection.createOffer(offerSuccess, offerError);

}

//getUserMedia success
const successCallback = (stream) => {

		yourVideo.srcObject = stream;

		if(hasRTCPeerConnection()){
			startPeerConnection(stream);
		} else {
			alert("Sorry, your browser does not support P2P connection");
		}
	}

//getUserMedia error
const errorCallback = (error) => {
	alert('Sorry, we failed to capture your camera, please try again.');
}

if(hasUserMedia) {
	navigator.getUserMedia({video:true, audio:false}, successCallback, errorCallback);
} else {
	alert('Sorry, your browser does not support WebRTC');
}