import { Jimp, type JimpInstance } from "jimp";
import leftArm from '$lib/assets/left arm.png'
import rightArm from '$lib/assets/right arm.png'
import leftLeg from '$lib/assets/left leg.png'
import rightLeg from '$lib/assets/right leg.png'
import pants from '$lib/assets/pants.png'
import head from '$lib/assets/head.png'
import chest from '$lib/assets/chest.png'

export type BaseImageKey = 'Pants'
    | 'Left Leg' | 'Right Leg'
    | 'Left Arm' | 'Right Arm'
    | 'Head' | 'Chest'

export class ImagePartLoader {

    LeftArmImage: SpriteMap
    RightArmImage: SpriteMap
    PantsImage: SpriteMap
    LeftLegImage: SpriteMap
    RightLegImage: SpriteMap
    HeadImage: SpriteMap
    ChestImage: SpriteMap

    imagesLoaded = $state(false)

    constructor() {
        this.LeftArmImage = new SpriteMap(leftArm, 2, 3)
        this.RightArmImage = new SpriteMap(rightArm, 2, 3)
        this.LeftLegImage = new SpriteMap(leftLeg, 3, 2)
        this.RightLegImage = new SpriteMap(rightLeg, 3, 2)
        this.PantsImage = new SpriteMap(pants, 3, 2)
        this.HeadImage = new SpriteMap(head, 3, 3)
        this.ChestImage = new SpriteMap(chest, 4, 3)
    }

    async loadImages() {
        const promises = [
            this.LeftArmImage.loadImage(),
            this.RightArmImage.loadImage(),
            this.LeftLegImage.loadImage(),
            this.RightLegImage.loadImage(),
            this.PantsImage.loadImage(),
            this.HeadImage.loadImage(),
            this.ChestImage.loadImage()
        ]

        return Promise.all( promises ).then( () => { this.imagesLoaded = true } )
    }

    /**
     * 
     * @param imageBasin ``JimpInstance`` that contains the part desired
     * @param xPos X position of part. Goes from left to right.
     * @param yPos Y position of part. Goes from top to bottom.
     * @returns A ``JimpInstance`` with the cropped part that is desired. May be blank if the coordenates were sent incorrectly
     */
    getCroppedPart( baseImageKey: BaseImageKey, xPos: number, yPos: number ): JimpInstance {
        switch (baseImageKey) {
            case 'Left Arm':
                return this.LeftArmImage.getCroppedPart(xPos, yPos)
            case 'Right Arm':
                return this.RightArmImage.getCroppedPart(xPos, yPos)
            case 'Left Leg':
                return this.LeftLegImage.getCroppedPart(xPos, yPos)
            case 'Right Leg':
                return this.RightLegImage.getCroppedPart(xPos, yPos)
            case "Pants":
                return this.PantsImage.getCroppedPart(xPos, yPos)
            case "Head":
                return this.HeadImage.getCroppedPart(xPos, yPos)
            case "Chest":
                return this.ChestImage.getCroppedPart(xPos, yPos)
        }
    }

}

// Each map is designed around 8x8 sprites
const SPRITE_SIZE = 8

class SpriteMap {
    private _spriteMap?: JimpInstance
    private url: string
    private width: number
    private height: number

    /**
     * 
     * @param url URL of sprite map
     * @param width how many 8x8 squares wide is each sprite
     * @param height how many 8x8 squares high is each sprite
     */
    constructor( url: string, width: number, height: number ) {
        this.url = url
        this.width = width
        this.height = height
    }

    public get spriteMap() : JimpInstance {
        return this._spriteMap!
    }

    public async loadImage() {
        this._spriteMap = await Jimp.read(this.url) as JimpInstance
    }

    public getCroppedPart(xPos: number, yPos: number): JimpInstance {
        const x = this.width * SPRITE_SIZE * xPos
        const y = this.height * SPRITE_SIZE * yPos
        const w = this.width * SPRITE_SIZE
        const h = this.height * SPRITE_SIZE
        return this._spriteMap!.clone().crop({ h, w, x, y }).autocrop({ cropOnlyFrames: false }) as JimpInstance
    }
}