<script lang="ts">
    import { RMPosition, type RobotMaster } from "$lib/data/robotMasters.js";
    import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";
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

    let xValue = $state(0);
    let yValue = $state(0);

    $effect(() => {
        let { x, y } = RMPosition[rmName];
        if (!controller.imageLoader.imagesLoaded) return;

        updateImageData(x, y);
    });

    $effect(() => {
        updateRMPartPosition(xValue, yValue);
    });

    function updateImageData(x: number, y: number) {
        let jimpo = controller.imageLoader.getCroppedPart(rmPart, x, y);

        if (jimpo.bitmap.data.length > 0) {
            jimpo.getBase64("image/png").then((r) => {
                image.src = r;
            });

            let part = controller.rmParts.getPart(rmPart);
            part.img = jimpo;
        }
    }

    function updateRMPartPosition(x: number, y: number) {
        let part = controller.rmParts.getPart(rmPart);

        part.x = x;
        part.y = y;
    }
</script>

<article class="flex surface-4">
    <img bind:this={image} alt={`${rmName}'s ${rmPart}`} />
    <div>
        <p>{`${rmName}'s ${rmPart}`}</p>
        <RmSelectTag bind:value={rmName} />
    </div>
    <div>
        <NumberInput label="X Position" bind:value={xValue} />
        <NumberInput label="Y Position" bind:value={yValue} />
    </div>
</article>

<style>
    .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
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
