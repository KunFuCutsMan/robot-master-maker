<script lang="ts">
    import "$lib/assets/rmm-styles.css";
    import PartTag from "./PartTag.svelte";
    import OpenDialog from "$lib/components/Dialog/OpenDialog.svelte";
    import { controller } from "$lib/data/canvasControllerStore.svelte.js";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    onMount(async () => await controller.setup(canvas));
</script>

<div class="rmm-container">
    <div class="flex">
        <canvas width="64" height="64" bind:this={canvas}></canvas>
        <ul class="parts">
            <li><PartTag thisPart={controller.rmParts.leftArm} /></li>
            <li><PartTag thisPart={controller.rmParts.rightArm} /></li>
            <li><PartTag thisPart={controller.rmParts.pants} /></li>
            <li><PartTag thisPart={controller.rmParts.leftLeg} /></li>
            <li><PartTag thisPart={controller.rmParts.rightArm} /></li>
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
