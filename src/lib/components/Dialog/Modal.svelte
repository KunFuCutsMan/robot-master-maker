<script lang="ts">
    import {
        closeDialog,
        getDialogContent,
        isDialogOpen,
    } from "./index.svelte.js";

    let dialog: HTMLDialogElement;

    $effect(() => {
        if (dialog ?? null) {
            isDialogOpen() ? dialog.showModal() : dialog.close();
        }
    });
</script>

<dialog bind:this={dialog}>
    <section>
        {@render getDialogContent()()}
    </section>
    <button aria-label="Close Dialog" class="surface-1" use:closeDialog
        >X</button
    >
</dialog>

<style>
    dialog {
        margin: auto;
        padding: var(--size-6);
        position: relative;
        inset: 0;

        border: var(--size-1) solid var(--surface-3);
        border-radius: var(--radius-3);
    }

    dialog::backdrop {
        background-color: rgba(22, 25, 29, 0.75);
    }

    button {
        position: absolute;
        top: var(--size-1);
        right: var(--size-1);
        width: var(--size-4);
        aspect-ratio: var(--ratio-square);
        border: none;
        border-radius: var(--radius-2);
        cursor: pointer;
    }
</style>
