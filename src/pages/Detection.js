import React from 'react';
import '../styles/detection.scss';
import * as tmImage from '@teachablemachine/image';

const Detection = () => {

    const URL = "https://teachablemachine.withgoogle.com/models/dBPUzWgbV/";

    let model, webcam, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }
    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

    return (
        <>
            <>
                <>
                    <>
                        <>
                            <>
                                <>
                                    <div className='text-center'><h3>Click to detect food</h3>
                                        <button className="custom-button mb-3" type="button" onClick={() => init()}>
                                            Upload
                                        </button>
                                    </div>
                                </>
                                <div className='d-flex justify-content-center'>
                                    <div id="webcam-container" style={{ marginRight: '10px' }}></div>
                                    <div id="label-container"></div>
                                </div>
                            </>
                            <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
                        </>
                        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
                    </>
                    <script type="text/javascript"></script>
                </>
                <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
            </>
            <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js"></script>
        </>
    )
}


export default Detection