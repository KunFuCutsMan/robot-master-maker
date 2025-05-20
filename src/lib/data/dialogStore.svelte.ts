import type { Snippet } from "svelte";
import type { Action } from "svelte/action";
import { writable } from "svelte/store";

export type DialogStore = {
    isOpen: boolean
    inner: Snippet | null
}

export const store = writable<DialogStore>()

export const openDialog: Action<HTMLElement, Snippet> = (node, snippet) => {

    $effect(() => {

        store.set({ isOpen: false, inner: snippet })

        function open() {
            store.update((v) => {
                v.isOpen = true
                return v
            } )
        }

        node.addEventListener("click", open);

        return () => {
            node.removeEventListener("click", open);
        };
    });
};

export const closeDialog: Action<HTMLElement> = node => {
    $effect(() => {

        function close() {
            store.update((v) => {
                v.isOpen = false
                return v
            } )
        }

        node.addEventListener("click", close);

        return () => {
            node.removeEventListener("click", close);
        };
    });
}