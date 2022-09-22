let textbox = document.querySelector("#textbox"); //id of textarea
let lang = document.querySelector("#lang");

lang.addEventListener('change', (e) => {
    //The lang property of the SpeechRecognition interface returns and sets the language of the current SpeechRecognition. 
    //If not specified, this defaults to the HTML lang attribute value, or the user agent's language setting if that isn't set either.
    recognition.lang = e.target.value;;
});
//setting the recognition interface to SpeechRecognition (regardless of the browser)
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// make sure that the speech recognition API is supported by your browser.
if ('SpeechRecognition' in window) {
    console.log("speech recognition API supported");
} else {
    console.log("speech recognition API not supported");
}


//The speech recognition interface lives on the browser’s window object as SpeechRecognition in Firefox 
//and as webkitSpeechRecognition in Chrome.
//create a new speech recognition object.
//This recognition object has many properties, methods and event handlers.
let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;

let start = document.querySelector("#start-btn");
start.addEventListener("click", () => {
    //The start() method of the Web Speech API starts the speech recognition service listening to incoming audio 
    //with intent to recognize grammars associated with the current SpeechRecognition.
    recognition.start();
});

//when the recognition will start then the innerHTML is changed to listning
recognition.addEventListener("audiostart", (e) => {
    start.innerText = "Listening...";
});

//The result event of the Web Speech API is fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app
//The transcript read-only property of the SpeechRecognitionResult interface returns a string containing the transcript of the recognized word(s).

//For continuous recognition, leading or trailing whitespace will be included where necessary so that concatenation of consecutive SpeechRecognitionResults produces a proper transcript of the session.
recognition.addEventListener("result", (e) => {
    let text = "";
    let i = 0;
    while (i < e.results.length) {
        text += (e.results[i][0].transcript);
        i++;
    }
    textbox.innerText = text;
});


//The audioend event of the Web Speech API is fired when the user agent has finished capturing audio for speech recognition.
recognition.addEventListener("audioend", (e) => {
    start.innerText = "Start";
});