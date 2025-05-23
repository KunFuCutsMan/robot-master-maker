<script lang="ts">
    import { cssColorToHex, type JimpInstance, type RGBAColor } from "jimp";
    import { getCanvasControllerContext } from "./context.js";

    type Props = {
        jimpo: JimpInstance;
    };

    let { jimpo }: Props = $props();
    let { nesColors } = getCanvasControllerContext();

    let colors = $derived.by(() => {
        if (!nesColors.colorsLoaded) return [];

        return nesColors.colors();
    });
</script>

<p>Click one of the buttons to select it:</p>

<div class="grid">
    {#each colors as color}
        {@render colorButton(color)}
    {/each}
</div>

{#snippet colorButton(c: RGBAColor)}
    {@const color = `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`}
    <button aria-label="Click to change to this color">
        <div class="square" style:--color={color}></div>
    </button>
{/snippet}

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(8, auto);
        gap: var(--size-1);
    }

    button {
        border: 0;
        cursor: pointer;
        background: var(--gradient-8);
        padding: var(--size-1);
        border-radius: var(--radius-2);
    }

    p {
        font-family: var(--font-industrial);
        text-align: center;
    }

    .square {
        width: var(--size-4);
        aspect-ratio: var(--ratio-square);
        background-color: var(--color, transparent);
        border-radius: var(--radius-1);
    }
</style>
