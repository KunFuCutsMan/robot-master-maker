import type { JimpInstance } from "jimp"
import { ImagePartLoader } from "./PartComponents.svelte.js"


export class CanvasController {

    ctx?: CanvasRenderingContext2D
    imageLoader: ImagePartLoader

    constructor() {
        this.imageLoader = new ImagePartLoader()
    }

    async draw(instance: JimpInstance, dx: number, dy: number) {
        let imageData = new ImageData(
            new Uint8ClampedArray(instance.bitmap.data),
            instance.bitmap.width,
            instance.bitmap.height
        )

        this.ctx!.drawImage(await createImageBitmap(imageData), dx, dy)
    }
}