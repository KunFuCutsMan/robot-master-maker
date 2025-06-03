import { modals } from "svelte-modals";
import ColorChangerModal from "./ColorChangerModal.svelte";
import type { JimpInstance, RGBAColor } from "jimp";

export function openColorChangerModal(jimpo: JimpInstance, selectedColor: RGBAColor) {
    modals.open( ColorChangerModal, { jimpo, selectedColor } )
}