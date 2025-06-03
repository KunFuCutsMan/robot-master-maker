<script lang="ts">
    import { rgbaToInt, type JimpInstance, type RGBAColor } from "jimp";
    import { controller } from "$lib/data/canvasControllerStore.svelte.js";
    import { modals } from "svelte-modals";
    import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";

    type Props = {
        selectedPart: BaseImageKey;
        selectedColor: RGBAColor;
    };

    let { selectedPart, selectedColor }: Props = $props();
    let nesColors = controller.getNesColors();

    let colors = $derived.by(() => {
        if (!controller.isLoaded()) return [];

        return nesColors.colors();
    });

    function changeColor(color: RGBAColor) {
        let thisPart = controller.getPart(selectedPart);
        thisPart.colorSwap(selectedColor, color);
        controller.drawRobotMaster();
    }
</script>

<p>Click one of the buttons to select it:</p>

<div class="grid">
    {#each colors as color}
        {@render colorButton(color)}
    {/each}
</div>

{#snippet colorButton(c: RGBAColor)}
    {@const color = `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`}
    <button
        aria-label="Click to change to this color"
        onclick={() => {
            changeColor(c);
            modals.close();
        }}
    >
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
