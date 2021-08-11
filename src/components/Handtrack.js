import * as handTrack from 'handtrackjs';
import { React, useEffect, useState } from 'react'

export default function Handtrack() {

    var video = document.getElementById("video");
    let myModel = null;

    //start video stream
    handTrack.startVideo(video);
    
    //load tracker model
    const loadTracker = () => {
        handTrack.load()
            .then(model => {
                myModel = model;
                console.log("model loaded");
                setLoading(1);
            });
    }

    //run tracker detection
    const runTracker = () => {
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

        if (loading === 0) loadTracker();
        var video = document.getElementById("video");
        video.addEventListener('loadeddata', () => {
            runTracker();
        })

        video.removeEventListener('loadeddata', render);
    }

    const [time, setTime] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time+1);
        }, 100);

        render();

        return () => clearTimeout(timer);
    })

    return (
        <canvas id="canvas"></canvas>
    )
}


