import { type JimpInstance } from "jimp"
import { ImagePartLoader } from "./PartComponents.svelte.js"
import { RobotMasterParts } from "$lib/data/robotMasterParts.svelte.js"


export class CanvasController {

    ctx?: CanvasRenderingContext2D
    canvasWidth: number = 0
    canvasHeight: number = 0
    imageLoader: ImagePartLoader
    rmParts: RobotMasterParts

    constructor() {
        this.imageLoader = new ImagePartLoader()
        this.rmParts = new RobotMasterParts()
    }

    async setup() {
        await this.imageLoader.loadImages();

        this.rmParts.leftArm.img = this.imageLoader.getCroppedPart(
            "LeftArm",
            0,
            0
        );
        this.rmParts.rightArm.img = this.imageLoader.getCroppedPart(
            "RightArm",
            0,
            0
        );
        this.rmParts.pants.img = this.imageLoader.getCroppedPart(
            "Pants",
            0,
            0
        );
        this.rmParts.leftLeg.img = this.imageLoader.getCroppedPart(
            "LeftLeg",
            0,
            0
        );
        this.rmParts.rightLeg.img = this.imageLoader.getCroppedPart(
            "RightLeg",
            0,
            0
        );
    }

    draw(instance: JimpInstance, dx: number, dy: number) {
        let imageData = new ImageData(
            new Uint8ClampedArray(instance.bitmap.data),
            instance.bitmap.width,
            instance.bitmap.height
        )

        createImageBitmap(imageData)
            .then( ( img ) => this.ctx!.drawImage(img, dx, dy) )
    }

    clearCanvas() {
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
}