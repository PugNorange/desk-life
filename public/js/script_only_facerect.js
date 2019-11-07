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

        // let faceCascade = new cv.CascadeClassifier();
        // let eyeCascade = new cv.CascadeClassifier();
        let utils = new Utils('errorMessage');

        // let video = document.getElementById('videoInput');
        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
        let gray = new cv.Mat();
        let cap = new cv.VideoCapture(video);
        let faces = new cv.RectVector();
        let classifier = new cv.CascadeClassifier();

        /// Load the cascades ///
        // Face & eye
        let faceCascadeFile = 'haarcascade_frontalface_default.xml';
        utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
            classifier.load(faceCascadeFile);
        });
        // let eyeCascadeFile = 'haarcascade_eye_tree_eyeglasses.xml';
        // utils.createFileFromUrl(eyeCascadeFile, eyeCascadeFile, () => {
        //     eyeCascade.load(eyeCascadeFile);
        // });


        const FPS = 30;
        function processVideo() {
            try {
                console.log("check >> ");
                // if (!streaming) {
                //     // clean and stop.
                //     src.delete();
                //     dst.delete();
                //     gray.delete();
                //     faces.delete();
                //     classifier.delete();
                //     return;
                // }
                let begin = Date.now();
                // start processing.
                cap.read(src);
                src.copyTo(dst);
                cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
                // detect faces.
                classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
                // draw faces.
                for (let i = 0; i < faces.size(); ++i) {
                    let face = faces.get(i);
                    let point1 = new cv.Point(face.x, face.y);
                    let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                    cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
                }
                cv.imshow('canvas_output', dst);
                // schedule the next one.
                let delay = 1000/FPS - (Date.now() - begin);
                console.log("delay >> ", delay);
                    // src.delete();
                    // dst.delete();
                    // gray.delete();
                    // faces.delete();
                    // classifier.delete();
                setTimeout(processVideo, delay);
            } catch (err) {
                utils.printError(err);
            }
        }
        // schedule first one.
        setTimeout(processVideo, 1000);
    };
};
