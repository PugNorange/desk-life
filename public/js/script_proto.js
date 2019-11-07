function openCvReady() {
    cv['onRuntimeInitialized']=()=>{
        let video = document.getElementById("cam_input"); // video is the id of video tag
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        }).catch(function(err) {
            console.log("An error occurred! " + err);
        });

        let faceCascade = new cv.CascadeClassifier();
        let eyeCascade = new cv.CascadeClassifier();
        let utils = new Utils('errorMessage');
        /// Load the cascades ///
        // Face & eye
        let faceCascadeFile = 'haarcascade_frontalface_default.xml';
        utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
            faceCascade.load(faceCascadeFile);
        });
        let eyeCascadeFile = 'haarcascade_eye_tree_eyeglasses.xml';
        utils.createFileFromUrl(eyeCascadeFile, eyeCascadeFile, () => {
            eyeCascade.load(eyeCascadeFile);
        });


        const FPS = 30;
        function processVideo() {

            let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            let videoCapture = new cv.VideoCapture(cam_input);
            let begin = Date.now();
            videoCapture.read(src);
            src.copyTo(dst);
            let grayScaleData = new cv.Mat();
            cv.cvtColor(dst, grayScaleData, cv.COLOR_BGR2GRAY, 0);
            let faces = new cv.RectVector();
            let eyes = new cv.RectVector();
            let msize = new cv.Size(0, 0);
            // let faces = cascade.detectMultiScale(grayScaleData, scaleFactor=1.11, minNeighbors=3, minSize=(100, 100))
            try {

                faceCascade.detectMultiScale(grayScaleData, faces, 1.1, 3, 0, msize, msize);
                //console.log("Face size >>> ", faces.size());

                if (faces.size() == 1) {

                    for (let i = 0; i < faces.size(); ++i) {
                        let face = faces.get(i);
                        console.log("Face info ", i, " >> x:", face.x, " y:", face.y, " width:", face.width, " height:", face.height);

                        // Detect face distance.
                        if (face.width > 200 || face.height > 200) {
                            console.log("Too close to screen!!");
                            document.getElementById("p1").innerHTML = "Too close to the screen!";

                        } else {
                            document.getElementById("p1").innerHTML = " ";
                        }
                        // document.getElementById("p1").innerHTML = "";

                        let point1 = new cv.Point(face.x, face.y);
                        let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                        cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);

                        //console.log("faceROI >> ", faces.get(i));
                        faces.get(i).x = faces.get(i).x;
                        faces.get(i).y = faces.get(i).y;
                        faces.get(i).height = faces.get(i).height/2;
                        faces.get(i).width = faces.get(i).width;
                        //console.log("Update faceROI >> ", faces);
                        let faceROI = grayScaleData.roi(faces.get(i));
                        //{x: 281, y: 191, width: 67, height: 67}
                        //let roiSrc = src.roi(faces.get(i));
                        eyeCascade.detectMultiScale(faceROI, eyes);
                        //console.log("eye size >>", eyes.size());
                        // loop two times to get left and right eye
                        for (var j = 0; j < eyes.size() ; j++) {
                            let eye = eyes.get(j);
                            //console.log("Eye info ", j, " >> x:", eye.x, " y:", eye.y);
                            let eyePoint1 = new cv.Point(eye.x+face.x, eye.y+face.y);
                            let eyePoint2 = new cv.Point(eye.x+face.x+eye.width, eye.y+face.y+eye.height);
                            cv.rectangle(dst, eyePoint1, eyePoint2, [144, 238, 144, 255]);
                        }
                        // Detect eye blink
                        if (eyes.size()==0) {
                            console.log("BLINK!!!!");
                            document.getElementById("p2").innerHTML = "Eye blinked";

                        } else {
                            document.getElementById("p2").innerHTML = " ";
                        }
                    }
                    cv.imshow("canvas_output", dst);
                }
                // schedule next one.
                //console.log("begin >> ", begin);
                let delay = 1000/FPS - (Date.now() - begin);
                //console.log("delay >> ", delay);
                src.delete();
                grayScaleData.delete();
                dst.delete();
                faces.delete();
                eyes.delete();
                setTimeout(processVideo, delay);

            } catch (e) {
                console.log("Error >> ", e);
                setTimeout(processVideo, 0);
            }

        }
        // schedule first one.
        setTimeout(processVideo, 0);
    };
};
