<script lang="ts">
    let canvas: HTMLCanvasElement;
</script>

<div class="container">
    <div class="flex">
        <canvas bind:this={canvas}></canvas>
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
        aspect-ratio: 1;
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
