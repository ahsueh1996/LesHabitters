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

function checkBluff(){
    console.log("checkBluff()");
    document.getElementById("photo_them").setAttribute("src", "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_512,q_80,w_1024,x_712,y_474/v1/clients/toronto/Solmaz_Khosrowshahian_Owned_478_wl_f154abd8_a587_413f_95b7_04662e00861c_medium_b48e38b4-df84-4d9a-a646-f8cf6de6c69b.jpg")
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
    try {
        document.getElementById("btn_call_bluff").addEventListener("click", async () => {
            checkBluff();
        });
    } catch {
        console.warn("btn_call_bluff event listener not added");
    }
});