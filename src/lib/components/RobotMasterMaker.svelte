<script lang="ts">
    import "$lib/assets/rmm-styles.css";
    import PartTag from "./PartTag.svelte";
    import { controller } from "$lib/data/canvasControllerStore.svelte.js";
    import { Modals } from "svelte-modals";
    import { onMount } from "svelte";
    import helpSVG from "$lib/assets/svg/help.svg?raw";
    import outputSVG from "$lib/assets/svg/output.svg?raw";

    let canvas: HTMLCanvasElement;

    let actionList: { icon: string; desc: string; action: () => void }[] = [
        { icon: helpSVG, desc: "Help", action: () => {} },
        { icon: outputSVG, desc: "Export Robot Master", action: () => {} },
    ];

    onMount(async () => await controller.setup(canvas));
</script>

<div class="rmm-container">
    <div class="flex">
        <div>
            <canvas width="64" height="64" bind:this={canvas}></canvas>
            <ul class="button-list">
                {#each actionList as button}
                    <li>
                        {@render buttonWithIcon(
                            button.icon,
                            button.desc,
                            button.action
                        )}
                    </li>
                {/each}
            </ul>
        </div>
        <ul class="parts">
            {#each controller.getPartsInOrder() as part}
                <li><PartTag thisPart={part} /></li>
            {/each}
        </ul>
    </div>
</div>

{#snippet buttonWithIcon(icon: string, desc: string, action: () => void)}
    <button onclick={action} aria-label={desc} class="surface-1">
        {@html icon}
    </button>
{/snippet}

<Modals>
    {#snippet backdrop({ close })}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="backdrop" onclick={() => close()}></div>
    {/snippet}
</Modals>

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

    .flex > * {
        flex-grow: 1;
    }

    .backdrop {
        background-color: rgba(22, 25, 29, 0.75);
    }

    canvas {
        display: block;
        width: min(100%, var(--size-15));
        aspect-ratio: var(--ratio-square);
        image-rendering: pixelated;
        background-color: rebeccapurple;
        margin-block: var(--size-2);
        border-radius: var(--radius-2);
    }

    li {
        list-style: none;
    }

    .button-list {
        display: flex;
        justify-content: center;
        gap: var(--size-2);
    }

    button {
        border: 0;
        cursor: pointer;
        padding: var(--size-1);
        border-radius: var(--radius-2);
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
