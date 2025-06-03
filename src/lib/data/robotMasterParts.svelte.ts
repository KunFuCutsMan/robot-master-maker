import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js"
import { rgbaToInt, type JimpInstance, type RGBAColor } from "jimp"
import type { RobotMaster } from "./robotMasters.js"

export class RobotMasterParts {

    leftArm = new Part("LeftArm")
    rightArm = new Part("RightArm")
    pants = new Part("Pants")
    leftLeg = new Part("LeftLeg")
    rightLeg = new Part("RightLeg")

    getPart( key: BaseImageKey ): Part {
        switch (key) {
            case 'LeftArm': return this.leftArm
            case 'RightArm': return this.rightArm
            case 'Pants': return this.pants
            case 'LeftLeg': return this.leftLeg
            case 'RightLeg': return this.rightLeg
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

    colorSwap(selected: RGBAColor, newColor: RGBAColor) {
        for (const { x, y } of this.img!.scanIterator()) {
            if ( this.img!.getPixelColor(x, y) == rgbaToInt( selected.r, selected.g, selected.b, selected.a) ) {
                this.img!.setPixelColor( rgbaToInt(newColor.r, newColor.g, newColor.b, newColor.a), x, y );
            }
        }
    }
}