// $(document).ready(makeCamera); // this allows the webcam to be turned on right away

let webcam;

function makeCamera() {

    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');

    webcamElement.setAttribute("height", 680);
    webcamElement.setAttribute("width", 480);
    canvasElement.classList.add("overlapping");

    const snapSoundElement = document.getElementById('snapSound');
    webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

    webcam.start()
    .then(result =>{
       console.log("webcam started");snapSoundElement
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
