<script lang="ts">
    import { intToRGBA, type JimpInstance, type RGBAColor } from "jimp";
    import ColorChanger from "./ColorChanger.svelte";
    import { openColorChangerModal } from "./modals/index.js";

    type Props = {
        jimpo: JimpInstance;
    };

    let { jimpo = $bindable<JimpInstance>() }: Props = $props();

    let colors: RGBAColor[] = $derived.by(() => {
        if (!jimpo) return [];

        let currentColors = new Set<number>();

        jimpo.scan((x, y, _) => {
            currentColors.add(jimpo.getPixelColor(x, y));
        });

        return [...currentColors.values()]
            .filter((n) => n !== 0)
            .toSorted((a, b) => a - b)
            .map((v) => intToRGBA(v));
    });
</script>

<div>
    <p>Change colors:</p>
    <div class="flex">
        {#each colors as color}
            {@render colorButton(color)}
        {/each}
    </div>
</div>

{#snippet colorButton(color: RGBAColor)}
    <button
        aria-label="Click to modify color"
        onclick={() => openColorChangerModal(jimpo, color)}
    >
        <div
            class="square"
            style:--color={`rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
        ></div>
    </button>
{/snippet}

{#snippet dialogContent()}
    <!--
        <ColorChanger {jimpo} selectedColor={color} />
        -->
    Dialog Content
{/snippet}

<style>
    .flex {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    button {
        border: 0;
        cursor: pointer;
        background: var(--gradient-8);
        padding: var(--size-1);
        border-radius: var(--radius-2);
    }

    .square {
        width: var(--size-4);
        aspect-ratio: var(--ratio-square);
        background-color: var(--color, transparent);
        border-radius: var(--radius-1);
    }
</style>
