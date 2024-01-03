import domready from "domready"
import "./style.css"
import spectral from "spectral.js"

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

            const cx = width >> 1
            const cy = height >> 1

            const palette = [
                "#000",
                Math.random() < 0.5 ? "#51ff21" : "#ff2151",
                ... spectral.palette("rgba(32,82,255,0.5)", "rgba(255,255,255,0.85)", 22, spectral.RGBA)
            ]

            ctx.fillStyle = "#000";
            ctx.fillRect(0,0, width, height);

            ctx.strokeStyle = "#fff"
            //drawGrid()

            const max = 250
            ctx.fillStyle = "#fff";
            const size = Math.min(cx,cy)
            for (let i = 0; i < 120; i++)
            {

                const a = Math.random() * TAU/12
                const r = Math.floor(Math.random() * (size - max * 0.5))

                const a2 = Math.floor(Math.random() * 12) * TAU/12
                const r2 = Math.floor(Math.pow(Math.random(),2) * max * 0.5)

                const x = cx + Math.cos(a) * r + Math.cos(a2) * r2
                const y = cy + Math.sin(a) * r + Math.sin(a2) * r2
                const x2 = cx + Math.cos(a) * r + Math.cos(a2 + TAU/2) * r2
                const y2 = cy + Math.sin(a) * r + Math.sin(a2 + TAU/2) * r2

                ctx.strokeStyle = palette[0|Math.random() * palette.length] 
                ctx.lineWidth = 1 + Math.floor(Math.pow(Math.random(),2) * 5)
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

            }

        }

        paint()

        canvas.addEventListener("click", paint, true)
    }
);
