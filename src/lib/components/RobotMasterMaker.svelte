<script lang="ts">
    import { CanvasController } from "$lib/image/CanvasController.js";
    import { onMount } from "svelte";
    import PartTag from "./PartTag.svelte";
    import { setCanvasControllerContext } from "./context.js";

    import "$lib/assets/rmm-styles.css";
    import OpenDialog from "./OpenDialog.svelte";

    let canvas: HTMLCanvasElement;
    let controller = new CanvasController();

    setCanvasControllerContext(controller);

    onMount(async () => {
        controller.ctx = canvas.getContext("2d")!;
        controller.canvasWidth = canvas.width;
        controller.canvasHeight = canvas.height;
        await controller.setup();
    });
</script>

<div class="rmm-container">
    <div class="flex">
        <canvas width="64" height="64" bind:this={canvas}></canvas>
        <ul class="parts">
            <li><PartTag rmPart="LeftArm" /></li>
            <li><PartTag rmPart="RightArm" /></li>
            <li><PartTag rmPart="Pants" /></li>
            <li><PartTag rmPart="LeftLeg" /></li>
            <li><PartTag rmPart="RightLeg" /></li>
        </ul>
    </div>
</div>

<OpenDialog />

<style>
    .rmm-container {
        container: container / inline-size;
        background: var(--gradient-8);
    }

    .flex {
        display: flex;
        padding: var(--size-2);
        gap: var(--size-2);
    }

    .flex > :not(canvas) {
        flex-grow: 1;
    }

    canvas {
        display: inline-block;
        width: min(100%, var(--size-15));
        height: min(100%, var(--size-15));
        image-rendering: pixelated;
        background-color: rebeccapurple;
        margin-block: var(--size-2);
        border-radius: var(--radius-2);
    }

    li {
        list-style: none;
    }

    @container container ( max-width: 40rem ) {
        .flex {
            flex-direction: column;
        }

        canvas {
            margin-inline: auto;
        }
    }
</style>
