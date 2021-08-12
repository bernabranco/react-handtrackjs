import * as handTrack from 'handtrackjs';
import { React, useEffect, useState } from 'react'

import Loading from './Loading'

export default function Handtrack() {

    var video = document.getElementById("video");
    let myModel = null;

    //start video stream
    handTrack.startVideo(video);
    
    //load tracker model
    const loadModel = () => {
        handTrack.load()
            .then(model => {
                myModel = model;
                console.log("model loaded");
                setLoading(1);
            });
    }

    //run tracker detection
    const runDetection = () => {
        var video = document.getElementById("video");
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d')
        var mediasource = video;
        if (myModel != null) {
            myModel.detect(video).then(predictions => {
                myModel.renderPredictions(predictions, canvas, context, mediasource);
            });
        }
    }


    //render tracker results to canvas
    const [loading, setLoading] = useState(0);
    const render = ()=>{

        var video = document.getElementById("video");
        var loadingInfo = document.getElementById('loading');

        //load the model
        if (loading === 0) {
            loadModel();
        }

        //remove loading information
        if (loading === 1) {
            loadingInfo.style.display = 'none';
        }

        //need to check if video loaded before each detection
        video.addEventListener('loadeddata', () => {
            runDetection();
        })

        video.removeEventListener('loadeddata', render);
    }

    //re-render component 
    const [fps, setFps] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setFps(fps+1);
        }, 500);

        render();

        return () => clearTimeout(timer);
    })

    return (
        <canvas id="canvas"></canvas>
    )
}


