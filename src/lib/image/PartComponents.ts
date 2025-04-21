import { Jimp, type JimpInstance } from "jimp";
import leftArm from '$lib/assets/left arm.png'
import rightArm from '$lib/assets/right arm.png'
import leftLeg from '$lib/assets/left leg.png'
import rightLeg from '$lib/assets/right leg.png'
import pants from '$lib/assets/pants.png'

type BaseImageKey = 'Pants'
    | 'LeftLeg' | 'RightLeg'
    | 'LeftArm' | 'RightArm'

export class ImagePartLoader {

    LeftArmImage?: JimpInstance //w2h3
    RightArmImage?: JimpInstance //w2h3
    PantsImage?: JimpInstance //w3h2
    LeftLegImage?: JimpInstance //w3h2
    RightLegImage?: JimpInstance //w3h2

    static spriteSize = 8

    async loadImages() {
        const promises = [
            async () => { this.LeftArmImage = await Jimp.read(leftArm) as JimpInstance },
            async () => { this.RightArmImage = await Jimp.read(rightArm) as JimpInstance },
            async () => { this.LeftLegImage = await Jimp.read(leftLeg) as JimpInstance },
            async () => { this.RightLegImage = await Jimp.read(rightLeg) as JimpInstance },
            async () => { this.PantsImage = await Jimp.read(pants) as JimpInstance },
        ]

        return Promise.all( promises.map( p => p.call(this) ) )
    }

    /**
     * 
     * @param imageBasin ``JimpInstance`` that contains the part desired
     * @param xPos X position of part. Goes from left to right.
     * @param yPos Y position of part. Goes from top to bottom.
     * @returns A ``JimpInstance`` with the cropped part that is desired. May be blank if the coordenates were sent incorrectly
     */
    getCroppedPart( baseImageKey: BaseImageKey, xPos: number, yPos: number ): JimpInstance {
        const { spriteSize } = ImagePartLoader
        let x: number, y: number, w: number, h: number
        switch (baseImageKey) {
            case 'LeftArm':
                x = 2 * spriteSize * xPos
                y = 3 * spriteSize * yPos
                w = 2 * spriteSize
                h = 3 * spriteSize
                console.dir({ x, y, w, h })
                return this.LeftArmImage!.crop({ h, w, x, y }) as JimpInstance
            case 'RightArm':
                x = 2 * spriteSize * xPos
                y = 3 * spriteSize * yPos
                w = 2 * spriteSize
                h = 3 * spriteSize
                return this.RightArmImage!.crop({ h, w, x, y }) as JimpInstance
            case 'LeftLeg':
                x = 3 * spriteSize * xPos
                y = 2 * spriteSize * yPos
                w = 3 * spriteSize
                h = 2 * spriteSize
                return this.LeftLegImage!.crop({ h, w, x, y }) as JimpInstance
            case 'RightLeg':
                x = 3 * spriteSize * xPos
                y = 2 * spriteSize * yPos
                w = 3 * spriteSize
                h = 2 * spriteSize
                return this.RightLegImage!.crop({ h, w, x, y }) as JimpInstance
            case "Pants":
                x = 3 * spriteSize * xPos
                y = 2 * spriteSize * yPos
                w = 3 * spriteSize
                h = 2 * spriteSize
                return this.PantsImage!.crop({ h, w, x, y }) as JimpInstance
        }
    }

}