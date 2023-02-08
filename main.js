function setup() {
  canvas = createCanvas(300, 300);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded(){
  console.log('MobileNet foi carregado')
}

function draw() {
  image(video,0,0,300,300);
  classifier.classify(video, gotResult);
}

var resultadoAnterior = '';

function gotResult(error, results){
  if (error){
    console.log(error);
  } else{
    if((results[0].confidence >0.5) && (resultadoAnterior != results[0].label)){
      console.log(results);
      resultadoAnterior = results[0].label;
      var synth = window.speechSynthesis;
      speakData = 'o objeto detectado e - ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
      synth.speak(utterThis);

      document.getElementById("resultObjectName").innerHTML = results[0].label;
      document.getElementById("resultObjectAcuracy").innerHTML = results[0].confidence.toFixed(2);
    }
  }
}

