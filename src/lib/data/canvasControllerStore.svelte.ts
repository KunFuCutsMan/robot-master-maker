import { NESColors } from "$lib/image/NESColors.svelte.js";
import { ImagePartLoader, type BaseImageKey } from "$lib/image/PartComponents.svelte.js";
import { RobotMasterParts } from "./robotMasterParts.svelte.js";
import type { JimpInstance } from "jimp";

class CanvasController  {

    private ctx?: CanvasRenderingContext2D
    private canvasWidth: number = 0
    private canvasHeight: number = 0
    private imageLoader = $state(new ImagePartLoader())
    public rmParts = $state(new RobotMasterParts())
    private nesColors = $state(new NESColors())

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
            "Left Arm",
            1,
            0
        );

        this.rmParts.rightArm.x = 36
        this.rmParts.rightArm.y = 22
        this.rmParts.rightArm.img = this.imageLoader.getCroppedPart(
            "Right Arm",
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
            "Left Leg",
            1,
            0
        );

        this.rmParts.rightLeg.x = 34
        this.rmParts.rightLeg.y = 34
        this.rmParts.rightLeg.img = this.imageLoader.getCroppedPart(
            "Right Leg",
            1,
            0
        );

        this.rmParts.head.x = 22
        this.rmParts.head.y = 6
        this.rmParts.head.img = this.imageLoader.getCroppedPart(
            "Head",
            1,
            0
        )
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
            this.rmParts.getPart('Head'),
            this.rmParts.getPart('Left Arm'),
            this.rmParts.getPart('Left Leg'),
            this.rmParts.getPart('Pants'),
            this.rmParts.getPart('Right Arm'),
            this.rmParts.getPart('Right Leg'),
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

    getNesColors() {
        return this.nesColors
    }

    getPart(key: BaseImageKey) {
        return this.rmParts.getPart(key)
    }

    getCroppedPart(key: BaseImageKey, xPos: number, yPos: number) {
        return this.imageLoader.getCroppedPart(key, xPos, yPos)
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
export const controller = new CanvasController()