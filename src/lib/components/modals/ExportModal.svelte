<script lang="ts">
    import { controller } from "$lib/data/canvasControllerStore.svelte.js";
    import { widgetHTML } from "$lib/data/widgetHTML.js";
    import { onMount } from "svelte";
    import { type ModalProps } from "svelte-modals";

    let { isOpen, close }: ModalProps = $props();

    let canvas = $state<HTMLCanvasElement>();
    let href = "";

    onMount(async () => {
        const croppedRM = await controller.cropRobotMaster();

        canvas!.width = croppedRM.bitmap.width;
        canvas!.height = croppedRM.bitmap.height;

        const ctx = canvas!.getContext("2d");
        ctx!.putImageData(
            new ImageData(
                new Uint8ClampedArray(croppedRM.bitmap.data),
                croppedRM.bitmap.width,
                croppedRM.bitmap.height
            ),
            0,
            0
        );

        href = canvas!.toDataURL();
    });

    function downloadRobotMaster() {
        const link = document.createElement("a");
        link.href = href;
        link.download = "Robot Master";
        link.click();
        link.remove();
    }
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <section class="surface-0">
            <div class="content">
                <div class="column">
                    <canvas bind:this={canvas}></canvas>
                    <button
                        class="surface-1 input-bg download-button"
                        onclick={downloadRobotMaster}
                        >Click here to download your Robot Master</button
                    >
                </div>
                <div class="column">
                    <div>{@html widgetHTML}</div>

                    <button class="surface-1 input-bg download-button">
                        Click here to copy the widget
                    </button>
                </div>
            </div>

            <button
                aria-label="Close Dialog"
                class="surface-1 close-button"
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

        font-family: var(--font-industrial);
    }

    canvas {
        width: var(--size-13);
        aspect-ratio: var(--ratio-square);
        image-rendering: pixelated;
    }

    button {
        border: none;
        border-radius: var(--radius-2);
        cursor: pointer;
        text-align: center;
    }

    button.close-button {
        position: absolute;
        top: var(--size-1);
        right: var(--size-1);
        width: var(--size-4);
        aspect-ratio: var(--ratio-square);
    }

    button.download-button {
        padding: var(--size-2);
        max-width: 24ch;
    }

    .content {
        display: grid;
        grid-template-columns: auto auto;
        gap: var(--size-6);
    }

    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: var(--size-2);
    }

    @media (max-width: 768px) {
        .content {
            grid-template-columns: auto;
        }
    }
</style>
