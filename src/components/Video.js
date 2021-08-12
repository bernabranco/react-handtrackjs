import { React, useEffect } from 'react'

export default function Image() {

    useEffect(() => {
        var video = document.querySelector("#video");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    })

    return (
        <video id="video" autoPlay>

        </video>
    )
}



