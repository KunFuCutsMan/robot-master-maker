<script lang="ts">
    import { CanvasController } from "$lib/image/CanvasController.js";
    import { onMount } from "svelte";
    import PartTag from "./PartTag.svelte";
    import { setCanvasControllerContext } from "./context.js";

    let canvas: HTMLCanvasElement;
    let controller = new CanvasController();

    setCanvasControllerContext(controller);

    onMount(async () => {
        controller.ctx = canvas.getContext("2d")!;
        await controller.imageLoader.loadImages();
    });
</script>

<div class="container">
    <div class="flex">
        <canvas width="256" height="256" bind:this={canvas}></canvas>
        <ul class="parts">
            <li>
                <PartTag rmName="Blizzard" rmPart="Pants" />
            </li>
            <li></li>
            <li></li>
        </ul>
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        border: 1px dotted dodgerblue;
    }

    .container {
        container: container / inline-size;
        --canvas-size: 30rem;
    }

    .flex {
        display: flex;
        border: 1px solid red;
    }

    .flex > :not(canvas) {
        flex-grow: 1;
    }

    canvas {
        display: inline-block;
        width: min(100%, var(--canvas-size));
        height: min(100%, var(--canvas-size));
        image-rendering: pixelated;
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
