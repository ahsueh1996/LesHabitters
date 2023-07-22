$(document).ready(makeCamera);

let webcam;

function makeCamera() {

    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    // snapSoundElement.attr("src", plugin_dir_url(__FILE__) + "snap.wav"); // we can't use plugin_dir_url() here...?
    webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

    webcam.start()
    .then(result =>{
       console.log("webcam started");
    })
    .catch(err => {
        console.log(err);
    });

}

function takePhoto(){
    console.log("takePhoto()");
    var picture = webcam.snap();
    console.log(picture);
}
