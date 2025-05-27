<script lang="ts">
    import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";
    import { type JimpInstance } from "jimp";
    import ColorPicker from "./ColorPicker.svelte";
    import NumberInput from "./NumberInput.svelte";
    import RmSelectTag from "./RMSelectTag.svelte";
    import { controller } from "$lib/data/canvasControllerStore.js";
    import { Part } from "$lib/data/robotMasterParts.svelte.js";
    import { onMount } from "svelte";

    type Props = {
        rmPart: BaseImageKey;
    };

    let { rmPart }: Props = $props();
    let image: HTMLImageElement;

    let thisPart = $state<Part>(new Part());

    onMount(() => {
        controller.subscribe((v) => {
            thisPart = v.getPart(rmPart);
        });
    });

    /*
    function updateImageData(x: number, y: number) {
        let jimpo = controller.imageLoader.getCroppedPart(rmPart, x, y);

        if (jimpo.bitmap.data.length > 0) {
            jimpo.getBase64("image/png").then((r) => {
                image.src = r;
            });

            thisPart.img = jimpo;
        }
    }
    */
</script>

<article class="flex surface-4">
    <img bind:this={image} alt={`${thisPart.name}'s ${rmPart}`} />
    <div>
        <p>{`${thisPart.name}'s ${rmPart}`}</p>
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
        <ColorPicker jimpo={thisPart.img as JimpInstance} />
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
