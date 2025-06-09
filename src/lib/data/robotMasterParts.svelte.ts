import type { BaseImageKey, ImagePartLoader } from "$lib/image/PartComponents.svelte.js"
import { rgbaToInt, type JimpInstance, type RGBAColor } from "jimp"
import type { RobotMaster } from "./robotMasters.js"

export class RobotMasterParts {

    leftArm = new Part("Left Arm")
    rightArm = new Part("Right Arm")
    pants = new Part("Pants")
    leftLeg = new Part("Left Leg")
    rightLeg = new Part("Right Leg")
    head = new Part("Head")
    chest = new Part("Chest")

    getPart( key: BaseImageKey ): Part {
        switch (key) {
            case 'Left Arm': return this.leftArm
            case 'Right Arm': return this.rightArm
            case 'Pants': return this.pants
            case 'Left Leg': return this.leftLeg
            case 'Right Leg': return this.rightLeg
            case 'Head': return this.head
            case "Chest": return this.chest
        }
    }
}

export class Part {
    x = $state(0)
    y = $state(0)
    img = $state<JimpInstance>()
    name = $state<RobotMaster>("Cut")
    type: BaseImageKey

    constructor(key: BaseImageKey) {
        this.type = key
    }

    setup( imageLoader: ImagePartLoader ) {
        let {x, y} = initialPositions[this.type]
        this.x = x
        this.y = y
        this.img = imageLoader.getCroppedPart(this.type, 1, 0)
    }

    colorSwap(selected: RGBAColor, newColor: RGBAColor) {
        for (const { x, y } of this.img!.scanIterator()) {
            if ( this.img!.getPixelColor(x, y) == rgbaToInt( selected.r, selected.g, selected.b, selected.a) ) {
                this.img!.setPixelColor( rgbaToInt(newColor.r, newColor.g, newColor.b, newColor.a), x, y );
            }
        }

        // Now svelte knows the image was modified
        // Thanks m8! https://github.com/sveltejs/svelte/issues/14520#issuecomment-2562014563
        let tmp = this.img;
		this.img = undefined;
		this.img = tmp;
    }
}

const initialPositions: Record<BaseImageKey, {x: number, y: number}> = {
    "Pants": { x: 24, y: 32 },
    "Left Leg": { x: 10, y: 34 },
    "Right Leg": { x: 34, y: 34 },
    "Left Arm": { x: 12, y: 22 },
    "Right Arm": { x: 36, y: 22 },
    "Head": { x: 22, y: 6 },
    "Chest": { x: 24, y: 26}
}