<script lang="ts">
    import { CanvasController } from "$lib/image/CanvasController.js";
    import { ResizeStrategy } from "jimp";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;
    let controller: CanvasController;

    onMount(async () => {
        controller = new CanvasController(canvas);
        await controller.imageLoader.loadImages();

        let thingy = controller.imageLoader.getCroppedPart("LeftArm", 1, 1);
        thingy.scale({ f: 4, mode: ResizeStrategy.NEAREST_NEIGHBOR });
        await controller.draw(thingy, 0, 16);

        let thingo = controller.imageLoader.getCroppedPart("RightArm", 2, 3);
        thingo.scale({ f: 4, mode: ResizeStrategy.NEAREST_NEIGHBOR });
        await controller.draw(thingo, 0, 16);
    });
</script>

<div class="container">
    <div class="flex">
        <canvas width="256" height="256" bind:this={canvas}></canvas>
        <ul class="parts">
            <li></li>
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
