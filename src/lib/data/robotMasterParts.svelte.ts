import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js"
import { rgbaToInt, type JimpInstance, type RGBAColor } from "jimp"
import type { RobotMaster } from "./robotMasters.js"

export class RobotMasterParts {

    leftArm = new Part("Left Arm")
    rightArm = new Part("Right Arm")
    pants = new Part("Pants")
    leftLeg = new Part("Left Leg")
    rightLeg = new Part("Right Leg")
    head = new Part("Head")

    getPart( key: BaseImageKey ): Part {
        switch (key) {
            case 'Left Arm': return this.leftArm
            case 'Right Arm': return this.rightArm
            case 'Pants': return this.pants
            case 'Left Leg': return this.leftLeg
            case 'Right Leg': return this.rightLeg
            case 'Head': return this.head
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

        // Now svelte knows the image was modified
        // Thanks m8! https://github.com/sveltejs/svelte/issues/14520#issuecomment-2562014563
        let tmp = this.img;
		this.img = undefined;
		this.img = tmp;
    }
}