<script lang="ts">
    import { type ModalProps } from "svelte-modals";
    import ColorChanger from "../ColorChanger.svelte";
    import type { RGBAColor } from "jimp";
    import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";

    type Props = {
        selectedPart: BaseImageKey;
        selectedColor: RGBAColor;
    };

    let { isOpen, close, selectedPart, selectedColor }: ModalProps & Props =
        $props();
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <section class="surface-0">
            <ColorChanger {selectedPart} {selectedColor} />
            <button
                aria-label="Close Dialog"
                class="surface-1"
                onclick={() => close()}>X</button
            >
        </section>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(22, 25, 29, 0.75);
    }

    section {
        margin: auto;
        padding: var(--size-6);
        position: relative;
        inset: 0;

        border: var(--size-1) solid var(--surface-3);
        border-radius: var(--radius-3);
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
