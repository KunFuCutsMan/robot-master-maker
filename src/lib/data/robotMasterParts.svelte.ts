import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js"
import type { JimpInstance } from "jimp"

export class RobotMasterParts {

    leftArm = new Part()
    rightArm = new Part()
    pants = new Part()
    leftLeg = new Part()
    rightLeg = new Part()

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

class Part {
    x: number = $state(0)
    y: number = $state(0)
    img = $state<JimpInstance>()
}