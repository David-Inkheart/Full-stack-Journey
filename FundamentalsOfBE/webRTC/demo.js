// This demo was done in the browser console
// to run it, copy and paste the code into the console
// and press enter after each statement to get a matching response

// IN CONSOLE A
// create a local connection
const lc = new RTCPeerConnection(); // response - undefined
// create a data channel
const dc = lc.createDataChannel("channel"); // response - undefined
// set up event handlers
dc.onmessage = e => console.log("Just got a message: ", e.data); // response - "e => console.log("Just got a message: ", e.data)"
dc.onopen = e => console.log("Connection opened!"); //response - "e => console.log("Connection opened!")"
lc.onicecandidate = e => console.log("New Ice Candidate! reprinting SDP", JSON.stringify(lc.localDescription));
// response - "e => console.log("New Ice Candidate! reprinting SDP", JSON.stringify(lc.localDescription))"

// create an offer
lc.createOffer().then(o => lc.setLocalDescription(o)).then(a => console.log("Offer set successfully!"));
// response - Promise {<pending>}[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: undefined
// response 2 - Offer set successfully!
// response 3 - New Ice Candidate! reprinting SDP {"---------------------------SDP to be transmitted---------------------------"}


// IN CONSOLE B
// transmit the SDP from console A to console B manually
const offer = {"---------------------------SDP to be transmitted---------------------------"}; // response - undefined
// create a remote connection
const rc = new RTCPeerConnection(); // response - undefined

// set up event handlers
rc.onicecandidate = e => console.log("New Ice Candidate! reprinting SDP", JSON.stringify(rc.localDescription));
// response - e => console.log("New Ice Candidate! reprinting SDP", JSON.stringify(rc.localDescription))
rc.ondatachannel = e => {
    // listen for existing data channel from remote peer (console A)
    rc.dc = e.channel;
    rc.dc.onmessage = e => console.log("New message from client! ", e.data);
    rc.dc.onopen = e => console.log("Connection Opened!!");
}
// response - "e => { rc.dc = e.channel; rc.dc.onmessage = e => console.log("New message from client! ", e.data); rc.dc.onopen = e => console.log("Connection Opened!!");}"
rc.setRemoteDescription(offer).then(a => console.log("Offer set!"));
// response 1 - Promise {<pending>}[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: undefined
// response 2 -  Offer set!
rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a => console.log("Answer created!"));
// respone 1 - Promise {<pending>}
// response 2 - Answer created!
// response 3 - New Ice Candidate! reprinting SDP {"---------------------------Answer SDP to be transmitted---------------------------"}


// IN CONSOLE A
// transmit the Answer SDP from console B to console A manually
const answer = { "---------------------------Answer SDP to be transmitted---------------------------"}; // response - undefined
lc.setRemoteDescription(answer);
// response 1 - Promise {<pending>}
// response 2 -  Connection opened!

// IN CONSOLE B 
// response appears same as in console A - Connection opened!

// IN CONSOLE A
dc.send("Hey peer B, how're you doing?") // response - undefined

// IN CONSOLE B
// response - New message from client!  Hey peer B, how're you doing?
rc.dc.send("I'm just peachy, what about you?"); // response - undefined

// IN CONSOLE A
// response - Just got a message!  I'm just peachy, what about you?

// extra
// Media Stream API
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_API
// https:/www.html5rocks.com/en/tutorials/webrtc/basics/
// Use getUserMedia() to access the camera and/or microphone
// RTCPConnection.addStream() to send the stream to the remote peer