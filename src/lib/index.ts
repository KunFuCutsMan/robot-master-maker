import { mount } from "svelte";
import RobotMasterMaker from "$lib/components/RobotMasterMaker.svelte";
import { ImagePartLoader } from "./image/PartComponents.js";

export function startRMM( element: Element ) {
    mount( RobotMasterMaker, { target: element } );

    let imageLoader = new ImagePartLoader();

    (async () => {
        await imageLoader.loadImages()
        console.log("Images Loaded")
        let png = await imageLoader.getCroppedPart('Pants', 1, 5).getBase64('image/png')
        console.log(png)
    })()
}