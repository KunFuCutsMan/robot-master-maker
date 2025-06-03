<script lang="ts">
    import { type JimpInstance } from "jimp";
    import ColorPicker from "./ColorPicker.svelte";
    import NumberInput from "./NumberInput.svelte";
    import RmSelectTag from "./RMSelectTag.svelte";
    import type { Part } from "$lib/data/robotMasterParts.svelte.js";
    import { controller } from "$lib/data/canvasControllerStore.svelte.js";
    import { RMPosition } from "$lib/data/robotMasters.js";

    type Props = {
        thisPart: Part;
    };

    let { thisPart = $bindable<Part>() }: Props = $props();
    let image: HTMLImageElement;

    $effect(() => {
        if (!controller.isLoaded()) return;
        if (thisPart.img?.bitmap.data.length ?? 0 > 0) {
            thisPart.img?.getBase64("image/png").then((r) => (image.src = r));
        }
    });

    $effect(() => {
        if (controller.isLoaded()) controller.drawRobotMaster();
    });

    $effect(() => {
        if (!controller.isLoaded()) return;
        let { x, y } = RMPosition[thisPart.name];
        thisPart.img = controller.getCroppedPart(thisPart.type, x, y);
    });
</script>

<article class="flex surface-4">
    <img bind:this={image} alt={`${thisPart.name}'s ${thisPart.type}`} />
    <div>
        <p>{`${thisPart.name}'s ${thisPart.type}`}</p>
        <RmSelectTag bind:value={thisPart.name} />
    </div>
    <div>
        <NumberInput
            label="X Position"
            bind:value={thisPart.x}
            min={0}
            max={63}
        />
    </div>
    <div>
        <NumberInput
            label="Y Position"
            bind:value={thisPart.y}
            min={0}
            max={63}
        />
    </div>
    <div>
        <ColorPicker
            jimpo={thisPart.img as JimpInstance}
            selectedPart={thisPart.type}
        />
    </div>
</article>

<style>
    .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        gap: var(--size-4);
    }

    article {
        border-radius: var(--radius-2);
        padding-block: var(--size-3);
        padding-inline: var(--size-4);

        font-family: var(--font-industrial);

        margin-block: var(--size-3);
        margin-inline: var(--size-1);
    }

    img {
        width: 2rem;
        max-height: 3rem;
        image-rendering: pixelated;
    }
</style>
