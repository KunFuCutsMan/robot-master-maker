import { NESColors } from "$lib/image/NESColors.svelte.js";
import { ImagePartLoader, type BaseImageKey } from "$lib/image/PartComponents.svelte.js";
import { writable } from "svelte/store";
import { RobotMasterParts } from "./robotMasterParts.svelte.js";
import type { JimpInstance } from "jimp";

class CanvasController  {

    private ctx?: CanvasRenderingContext2D
    private canvasWidth: number = 0
    private canvasHeight: number = 0
    private imageLoader: ImagePartLoader
    private rmParts: RobotMasterParts
    private nesColors: NESColors

    constructor() {
        this.imageLoader = new ImagePartLoader()
        this.rmParts = new RobotMasterParts()
        this.nesColors = new NESColors()
    }

    async setup( canvas: HTMLCanvasElement ) {
        this.ctx = canvas.getContext("2d")!
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        await Promise.all([
            this.imageLoader.loadImages(),
            this.nesColors.loadColors()
        ])

        this.rmParts.leftArm.x = 12
        this.rmParts.leftArm.y = 22
        this.rmParts.leftArm.img = this.imageLoader.getCroppedPart(
            "LeftArm",
            1,
            0
        );

        this.rmParts.rightArm.x = 36
        this.rmParts.rightArm.y = 22
        this.rmParts.rightArm.img = this.imageLoader.getCroppedPart(
            "RightArm",
            1,
            0
        );

        this.rmParts.pants.x = 24
        this.rmParts.pants.y = 32
        this.rmParts.pants.img = this.imageLoader.getCroppedPart(
            "Pants",
            1,
            0
        );

        this.rmParts.leftLeg.x = 10
        this.rmParts.leftLeg.y = 34
        this.rmParts.leftLeg.img = this.imageLoader.getCroppedPart(
            "LeftLeg",
            1,
            0
        );

        this.rmParts.rightLeg.x = 34
        this.rmParts.rightLeg.y = 34
        this.rmParts.rightLeg.img = this.imageLoader.getCroppedPart(
            "RightLeg",
            1,
            0
        );

        console.log("Canvas Controller is ready")
    }

    private draw(instance: JimpInstance, dx: number, dy: number) {
            let imageData = new ImageData(
                new Uint8ClampedArray(instance.bitmap.data),
                instance.bitmap.width,
                instance.bitmap.height
            )

            createImageBitmap(imageData)
                .then( ( img ) => this.ctx!.drawImage(img, dx, dy) )
        }

    private clearCanvas() {
        this.ctx!.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    drawRobotMaster() {
        const partsInOrder = [
            this.rmParts.getPart('LeftArm'),
            this.rmParts.getPart('LeftLeg'),
            this.rmParts.getPart('Pants'),
            this.rmParts.getPart('RightArm'),
            this.rmParts.getPart('RightLeg'),
        ]

        this.clearCanvas()

        partsInOrder.forEach(p => {
            if ( p.img )
                this.draw(p.img, p.x, p.y)
        });
    }

    isLoaded() {
        return this.imageLoader.imagesLoaded && this.nesColors.colorsLoaded
    }

    getPart( partTag: BaseImageKey ) {
        return this.rmParts.getPart(partTag)
    }

    getNesColors() {
        return this.nesColors
    }
}

/**
 * # Canvas Controller Store
 * 
 * Includes
 * - ImageLoader: Loads all images from `$lib/assets` for later use by other stuffs
 * - RobotMaster: A class containing all the data for each part, image corresponding to it
 * (along with modifications), x and y position to draw on canvas
 * - nesColors: Image with references to all usable colors
 */
export const controller = writable( new CanvasController() )