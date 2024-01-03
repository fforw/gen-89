import domready from "domready"
import spectral from "spectral.js"
import perfNow from "performance-now"
import { createNoise3D } from "simplex-noise"
import "./style.css"
import spectral from "spectral.js"
import AABB from "./AABB"
import { easeFlank, easeInOutQuint } from "./easing"

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


function drawGrid()
{
    const { width, height } = config
    const cx = width >> 1
    const cy = height >> 1

    for (let i = 0; i < 12; i++)
    {
        const r = Math.floor(Math.min(cx, cy) * 0.95)
        const a = i * TAU / 12
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}


function setupClip(i, r)
{
    const { width, height } = config
    const cx = width >> 1
    const cy = height >> 1


    const aabb = new AABB()

    const a0 = TAU / 12 + (i + 1) * TAU / 6
    const a1 = (i + 1) * TAU / 6
    const a2 = TAU / 12 + i * TAU / 6
    const x = cx + Math.cos(a0) * r
    const y = cy + Math.sin(a0) * r
    const x2 = cx + Math.cos(a1) * r
    const y2 = cy + Math.sin(a1) * r
    const x3 = cx + Math.cos(a2) * r
    const y3 = cy + Math.sin(a2) * r

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.lineTo(cx, cy)
    ctx.clip()

    aabb.add(cx,cy)
    aabb.add(x,y)
    aabb.add(x2,y2)
    aabb.add(x3,y3)

    return aabb;
}

let noiseFn


function randomSpeed()
{
    return 0.001 + Math.random() * 0.002
}


class RandomValue
{
    x = 0
    y = 0
    z = 0
    dx = 0
    dy = 0
    dz = 0
    pow = 1

    constructor(x = Math.random(), y = Math.random(), z = Math.random(),a = Math.random() * TAU, speed = randomSpeed())
    {
        this.x = x
        this.y = y
        this.z = z
        this.dx = Math.cos(a) * speed
        this.dy = Math.sin(a) * speed
        this.dz = 0
    }

    valueOf()
    {
        let v = 0.5 + noiseFn(this.x, this.y, this.z) * 0.5
        return Math.pow(v, this.pow)
    }

    update()
    {
        this.x += this.dx
        this.y += this.dy
        this.z += this.dz
    }
}




function getShaped(rndA2)
{
    const v = +rndA2

    let value = Math.floor(v * 6) / 6
    
    return value + easeFlank((v - value) * 6) / 6
}

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

        let frameCounter = 0
        let last = perfNow();


        const cx = width >> 1
        const cy = height >> 1

        let run = 0
        const paint = () => {

            const activeRun = ++run

            noiseFn = createNoise3D()

            const rndA = new RandomValue()
            const rndA2 = new RandomValue(undefined,undefined,undefined,undefined,0.0003)
            const rndR = new RandomValue()
            const rndR2 = new RandomValue()
            const rndColor = new RandomValue()
            const rndWidth = new RandomValue()

            rndR2.pow = 2
            rndWidth.pow = 2

            const palette = [
                "#000",
                Math.random() < 0.5 ? "#51ff21" : "#ff2151",
                ... spectral.palette("rgba(32,82,255,0.5)", "rgba(255,255,255,0.85)", 22, spectral.RGBA)
            ]

            const animate = () => {
                ctx.fillStyle = "#000";
                ctx.fillRect(0,0, width, height);

                ctx.strokeStyle = "#fff"
                //drawGrid()

                const max = 250
                ctx.fillStyle = "#fff";
                const size = Math.min(cx,cy)
                for (let i = 0; i < 120; i++)
                {
                    rndR.z = i
                    rndR2.z = i
                    rndA.z = i
                    rndA2.z = i
                    rndColor.z = i
                    rndWidth.z = i

                    const a = rndA * TAU/12
                    const r = Math.floor(rndR * (size - max * 0.5))

                    const a2 = (getShaped(rndA2) + 1 / 12) * TAU
                    const r2 = Math.floor(rndR2 * max * 0.5)

                    const x = cx + Math.cos(a) * r + Math.cos(a2) * r2
                    const y = cy + Math.sin(a) * r + Math.sin(a2) * r2
                    const x2 = cx + Math.cos(a) * r + Math.cos(a2 + TAU/2) * r2
                    const y2 = cy + Math.sin(a) * r + Math.sin(a2 + TAU/2) * r2

                    ctx.strokeStyle = palette[0|rndColor * palette.length]
                    ctx.lineWidth = 1 + Math.floor(rndWidth * 4)
                    ctx.beginPath()
                    ctx.moveTo(x,y)
                    ctx.lineTo(x2,y2)
                    ctx.stroke()
                }

                {
                    const r = Math.floor(size)

                    // mirror once
                    ctx.save()
                    ctx.translate(0,cy)
                    ctx.scale(1,-1)
                    ctx.translate(0,-cy)

                    ctx.strokeStyle = "#f00"
                    setupClip(-1, r)


                    const sh = Math.sin(TAU/12) * r
                    ctx.drawImage(ctx.canvas, cx,cy, r, sh, cx,cy, r, sh)
                    ctx.restore()

                    // rotational symmetry
                    for (let i = 0; i < 5; i++)
                    {
                        ctx.save()
                        ctx.translate(cx,cy)
                        ctx.rotate(TAU/6 * (i+1))
                        ctx.translate(-cx,-cy)
                        const aabb = setupClip(-1, r)

                        // const sh = Math.sin(TAU/12) * r
                        ctx.drawImage(ctx.canvas, aabb.minX,aabb.minY, aabb.width, aabb.height, aabb.minX,aabb.minY, aabb.width, aabb.height)
                        // ctx.fillStyle ="rgba(255,0,255, 0.15)"
                        // ctx.fillRect(0,0,width,height)
                        ctx.restore()
                    }

                    rndA.update()
                    rndA2.update()
                    rndR.update()
                    rndR2.update()
                    rndColor.update()
                    rndWidth.update()

                    frameCounter++
                }

                if (run === activeRun)
                {
                    requestAnimationFrame(animate)
                }
            }

            requestAnimationFrame(animate)
        }

        // window.setInterval(() => {
        //
        //     const now = perfNow();
        //
        //     const delta = now - last
        //     last = now;
        //
        //     console.log(delta, "ms. fps = ", frameCounter * 1000 / delta)
        //     frameCounter = 0
        //
        // }, 3000)


        paint()

        canvas.addEventListener("click", paint, true)
    }
);
