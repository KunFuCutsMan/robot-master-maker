<script lang="ts">
    import { RMPosition, type RobotMaster } from "$lib/data/robotMasters.js";
    import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";
    import { type JimpInstance } from "jimp";
    import ColorPicker from "./ColorPicker.svelte";
    import { getCanvasControllerContext } from "./context.js";
    import NumberInput from "./NumberInput.svelte";
    import RmSelectTag from "./RMSelectTag.svelte";

    type Props = {
        rmName?: RobotMaster;
        rmPart: BaseImageKey;
    };

    let { rmName = $bindable("Cut"), rmPart }: Props = $props();
    let controller = getCanvasControllerContext();
    let image: HTMLImageElement;

    let thisPart = controller.rmParts.getPart(rmPart);

    $effect(() => {
        let { x, y } = RMPosition[rmName];
        if (!controller.imageLoader.imagesLoaded) return;

        updateImageData(x, y);
    });

    $effect(() => {
        if (!controller.imageLoader.imagesLoaded) return;

        controller.drawRobotMaster();
    });

    function updateImageData(x: number, y: number) {
        let jimpo = controller.imageLoader.getCroppedPart(rmPart, x, y);

        if (jimpo.bitmap.data.length > 0) {
            jimpo.getBase64("image/png").then((r) => {
                image.src = r;
            });

            thisPart.img = jimpo;
        }
    }
</script>

<article class="flex surface-4">
    <img bind:this={image} alt={`${rmName}'s ${rmPart}`} />
    <div>
        <p>{`${rmName}'s ${rmPart}`}</p>
        <RmSelectTag bind:value={rmName} />
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
