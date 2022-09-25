
const textarea = document.querySelector ('#text');
let voiceList = document.querySelector ('#voz');
let speechBtn = document.querySelector ('.submit');

let synth = speechSynthesis; //Api
let isSpeaking = true;

//Despliegue de opciones por defecto de voces
function voiceSpeech() {
    for (let voice of synth.getVoices()){
        let option = document.createElement('option');
        option.text = voice.name;
        voiceList.add(option);
        console.log(option);
    }
}

//Uso de la API y cambio de voces dentro de la aplicación
synth.addEventListener('voiceschanged', voiceSpeech);

//Traspasar texto a audio
function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()){
        if(voice.name == voiceList.value){
            utternance.voice = voice
        }
    }

    speechSynthesis.speak(utternance);
}


speechBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(textarea.value !== '') {
            textToSpeech(textarea.value)
        }
        if(textarea.value.length > 80) {
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerHTML = 'Detener conversión'
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerHTML = 'Continuar conversión'
            }
            setInterval(() => {
                if(!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerHTML = 'Convertir'
                }
            })
        } else {
            speechBtn.innerHTML = 'Convertir'
        }
})

