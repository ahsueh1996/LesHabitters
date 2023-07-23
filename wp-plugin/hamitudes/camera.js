// $(document).ready(makeCamera); // this allows the webcam to be turned on right away

let webcam;

function makeCamera() {

    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');

    webcamElement.setAttribute("height", 1080);
    // webcamElement.setAttribute("width", 480);
    canvasElement.classList.add("overlapping");

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
    document.getElementById("4a").style.display = "none";
    document.getElementById("4a1").style.display = "none";
    document.getElementById("4b").style.display = "block";
    document.getElementById("4b1").style.display = "block";
    document.getElementById("photo_me").setAttribute("src", picture);
    return picture;
}


$(document).ready(function(){
    try {
        document.getElementById("btn_take_photo").addEventListener("click", async () => {
            takePhoto();
        });
        console.log("btn_take_photo event listener added");
        document.getElementById("4b").style.display = "none";
        document.getElementById("4b1").style.display = "none";
        makeCamera();       // if we have the take photo button, we can turn on the webcam
        console.log("hide 4b");
    } catch {
        console.warn("btn_take_photo event listener not added");
    }
});