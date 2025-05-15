import type { JimpInstance } from "jimp"
import { ImagePartLoader } from "./PartComponents.svelte.js"
import { RobotMasterParts } from "$lib/data/robotMasterParts.svelte.js"


export class CanvasController {

    ctx?: CanvasRenderingContext2D
    imageLoader: ImagePartLoader
    rmParts: RobotMasterParts

    constructor() {
        this.imageLoader = new ImagePartLoader()
        this.rmParts = new RobotMasterParts()
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