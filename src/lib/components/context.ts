import { CanvasController } from "$lib/image/CanvasController.js";
import { getContext, setContext } from "svelte";

const key1 = {}
export function setCanvasControllerContext(controller: CanvasController) {
    setContext(key1, controller)
}

export function getCanvasControllerContext() {
    return getContext(key1) as CanvasController
}