import { modals } from "svelte-modals";
import ColorChangerModal from "./ColorChangerModal.svelte";
import type { RGBAColor } from "jimp";
import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";
import InformationModal from "./InformationModal.svelte";
import ExportModal from "./ExportModal.svelte";

export function openColorChangerModal(selectedPart: BaseImageKey, selectedColor: RGBAColor) {
    modals.open( ColorChangerModal, { selectedPart, selectedColor } )
}

export function openInformationModal() {
    modals.open( InformationModal )
}

export function openExportModal() {
    modals.open( ExportModal )
}