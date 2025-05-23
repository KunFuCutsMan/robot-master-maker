import { type JimpInstance } from "jimp"
import { ImagePartLoader } from "./PartComponents.svelte.js"
import { RobotMasterParts } from "$lib/data/robotMasterParts.svelte.js"
import { NESColors } from "./NESColors.svelte.js"


export class CanvasController {

    ctx?: CanvasRenderingContext2D
    canvasWidth: number = 0
    canvasHeight: number = 0
    imageLoader: ImagePartLoader
    rmParts: RobotMasterParts
    nesColors: NESColors

    constructor() {
        this.imageLoader = new ImagePartLoader()
        this.rmParts = new RobotMasterParts()
        this.nesColors = new NESColors()
    }

    async setup() {
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