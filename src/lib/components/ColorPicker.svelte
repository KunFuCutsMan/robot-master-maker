<script lang="ts">
    import { intToRGBA, type JimpInstance, type RGBAColor } from "jimp";

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
    <button>
        {color.r}
        {color.g}
        {color.b}
        {color.a}
    </button>
{/snippet}

<style>
    .flex {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
