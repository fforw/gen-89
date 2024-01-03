import domready from "domready"
import "./style.css"

import * as Easings from "./easing"

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;

const config = {
    width: 0,
    height: 0
};

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;

domready(
    () => {

        canvas = document.getElementById("screen");
        ctx = canvas.getContext("2d");

        const width = (window.innerWidth) | 0;
        const height = (window.innerHeight) | 0;

        config.width = width;
        config.height = height;

        canvas.width = width;
        canvas.height = height;

        const paint = () => {

            ctx.fillStyle = "#000";
            ctx.fillRect(0,0, width, height);

            let x = 0
            let y = 0

            const size = 300
            const padding = 10

            for (let name in Easings)
            {
                const fn = Easings[name]

                ctx.strokeStyle = "#fff"
                ctx.fillStyle = "#888"

                ctx.beginPath()
                ctx.moveTo(x,y)
                ctx.lineTo(x,y + size)
                ctx.lineTo(x + size ,y + size)
                ctx.stroke()
                ctx.fillText(name, x, y + 20)

                ctx.strokeStyle = "#080"
                ctx.beginPath()
                ctx.moveTo(x,y + size)
                for (let i = 0; i < size; i++)
                {
                    ctx.lineTo(x + i,y + size - fn(i/size) * size)
                }
                ctx.stroke()

                x += size + padding
                if (x > width - size)
                {
                    x = 0
                    y += size + padding
                }
            }
        }

        paint()

        canvas.addEventListener("click", paint, true)
    }
);
