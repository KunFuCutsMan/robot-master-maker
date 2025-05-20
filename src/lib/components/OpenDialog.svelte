<script lang="ts">
    import { store, type DialogStore } from "$lib/data/dialogStore.svelte.js";
    import { onMount, type Snippet } from "svelte";

    let inner = $state<Snippet | null>(null);

    let dialog: HTMLDialogElement;

    store.subscribe((v) => {
        inner = v?.inner ?? null;

        if (v?.isOpen) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    });
</script>

<dialog bind:this={dialog}>
    {#if inner}
        {@render inner()}
    {/if}
</dialog>

<style>
    dialog {
        margin: auto;
        padding: auto;
    }
</style>
