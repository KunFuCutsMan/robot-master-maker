import { intToRGBA, Jimp, type JimpInstance, type RGBAColor } from "jimp";
import colors from "$lib/assets/nes-pallete.png";

export class NESColors {

    private colorsImage?: JimpInstance
    colorsLoaded = $state(false)

    async loadColors() {
        this.colorsImage = await Jimp.read(colors) as JimpInstance
        this.colorsLoaded = true
    }

    public colors() : RGBAColor[] {
        if (!this.colorsImage) return []

        let colors: RGBAColor[] = []
        this.colorsImage!.scan( (x, y, _) => {
            let color = this.colorsImage!.getPixelColor(x, y)
            colors.push( intToRGBA(color) )
        } )

        return colors
    }
}