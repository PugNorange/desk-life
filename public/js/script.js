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

        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst_eye = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let gray = new cv.Mat();
        let cap = new cv.VideoCapture(cam_input);
        let faces = new cv.RectVector();
        let eyes = new cv.RectVector();
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
            let begin = Date.now();
            let msize = new cv.Size(0, 0);
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            dst.copyTo(dst_eye);
            try{
                faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
                console.log("Face size >>> ", faces.size());
            }catch(err){
                console.log(err);
            }

            // for (let i = 0; i < faces.size(); ++i) {
            //     let roiGray = gray.roi(faces.get(i));
            //     let roiSrc = src.roi(faces.get(i));
            //     let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
            //     let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
            //                               faces.get(i).y + faces.get(i).height);
            //     cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
            //     // detect eyes in face ROI
            //     eyeCascade.detectMultiScale(roiGray, eyes);
            //     for (let j = 0; j < eyes.size(); ++j) {
            //         let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
            //         let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
            //                                   eyes.get(j).y + eyes.get(j).height);
            //         cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
            //     }
            //     roiGray.delete(); roiSrc.delete();
            // }


            //draw rect around the face.
            for (let i = 0; i < faces.size(); ++i) {
                let face = faces.get(i);
                let point1 = new cv.Point(face.x, face.y);
                let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);

                let faceROI = gray.roi(faces.get(i));
                let roiSrc = src.roi(faces.get(i));
                eyeCascade.detectMultiScale(faceROI, eyes); //eyes is defined at line 17
                console.log("eye size >>", eyes.size());
                for (var j = 0; j < eyes.size() ; j++) {
                    let eye = eyes.get(j);
                    console.log("Eye info ", j, " >> ", eye.x, ": ", eye.y);
                    let eyePoint1 = new cv.Point(eye.x, eye.y);
                    let eyePoint2 = new cv.Point(eye.x + eye.width, eye.y + eye.height);
                    cv.rectangle(dst, eyePoint1, eyePoint2, [144, 238, 144, 255]);
                }

            }


            cv.imshow("canvas_output", dst);
            // cv.imshow("canvas_output", dst_eye);
            // schedule next one.
            let delay = 1000/FPS - (Date.now() - begin);
            // src.delete(); gray.delete(); faceCascade.delete();
            // eyeCascade.delete(); faces.delete(); eyes.delete();
            setTimeout(processVideo, delay);
        }
        // schedule first one.
        setTimeout(processVideo, 0);
    };
};





///////
// // detect faces
// let msize = new cv.Size(0, 0);
// faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
// for (let i = 0; i < faces.size(); ++i) {
//     let roiGray = gray.roi(faces.get(i));
//     let roiSrc = src.roi(faces.get(i));
//     let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
//     let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
//                               faces.get(i).y + faces.get(i).height);
//     cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
//     // detect eyes in face ROI
//     eyeCascade.detectMultiScale(roiGray, eyes);
//     for (let j = 0; j < eyes.size(); ++j) {
//         let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
//         let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
//                                   eyes.get(j).y + eyes.get(j).height);
//         cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
//     }
//     roiGray.delete(); roiSrc.delete();
// }
// cv.imshow('canvas_output', src);
// src.delete(); gray.delete(); faceCascade.delete();
// eyeCascade.delete(); faces.delete(); eyes.delete();
