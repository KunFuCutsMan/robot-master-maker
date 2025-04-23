import type { JimpInstance } from "jimp"
import { ImagePartLoader } from "./PartComponents.svelte.js"


export class CanvasController {

    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    imageLoader: ImagePartLoader

    constructor(canvasRef: HTMLCanvasElement) {
        this.canvas = canvasRef
        this.ctx = this.canvas.getContext("2d")!
        this.imageLoader = new ImagePartLoader()
    }

    async draw(instance: JimpInstance, dx: number, dy: number) {
        let imageData = new ImageData(
            new Uint8ClampedArray(instance.bitmap.data),
            instance.bitmap.width,
            instance.bitmap.height
        )

        this.ctx.drawImage(await createImageBitmap(imageData), dx, dy)
    }
}