import { createRawSnippet, type Snippet } from "svelte";
import type { Action } from "svelte/action";

export type DialogStore = {
    isOpen: boolean
    inner: Snippet<[]>
}

let isOpen = $state(false);
let content = $state( createRawSnippet<[]>(() => {return { render: () => "" };}) )

export const getDialogContent = () => content
export const isDialogOpen = () => isOpen

export const openDialog: Action<HTMLElement, Snippet<[]>> = function(node, snippet) {

    function open() {
        console.log("Opened to open", snippet)
        content = snippet
        isOpen = true
    }

    $effect(() => {

        node.addEventListener("click", open);

        return () => {
            node.removeEventListener("click", open);
        };
    });
};

export const closeDialog: Action<HTMLElement> = node => {
    function close() {
        isOpen = false
        content = createRawSnippet(() => {return { render: () => "" };})
    }
    $effect(() => {

        node.addEventListener("click", close);

        return () => {
            node.removeEventListener("click", close);
        };
    });
}