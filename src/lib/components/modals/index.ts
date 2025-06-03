import { modals } from "svelte-modals";
import ColorChangerModal from "./ColorChangerModal.svelte";
import type { RGBAColor } from "jimp";
import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";

export function openColorChangerModal(selectedPart: BaseImageKey, selectedColor: RGBAColor) {
    modals.open( ColorChangerModal, { selectedPart, selectedColor } )
}