$(document).ready(makeCamera);

let webcam;

function makeCamera() {

    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

    webcam.start()
    .then(result =>{
       console.log("webcam started");
    })
    .catch(err => {
        console.log(err);
        console.warn("Did you use https:// protocol?");
    });

}

function takePhoto(){
    console.log("takePhoto()");
    var picture = webcam.snap();
    console.log(picture);
}
