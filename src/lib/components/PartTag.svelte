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

    $effect(() => {
        let { x, y } = RMPosition[rmName];
        if (!controller.imageLoader.imagesLoaded) return;

        updateImageData(x, y);
    });

    function updateImageData(x: number, y: number) {
        let jimpo = controller.imageLoader.getCroppedPart(rmPart, x, y);

        if (jimpo.bitmap.data.length > 0) {
            jimpo.getBase64("image/png").then((r) => {
                image.src = r;
            });
        }
    }
</script>

<article class="flex">
    <img bind:this={image} alt={`${rmName}'s ${rmPart}`} />
    <div>
        <p>{`${rmName}'s ${rmPart}`}</p>
        <RmSelectTag bind:value={rmName} />
    </div>
    <div>
        <NumberInput label="X Position" value={0} />
        <NumberInput label="Y Position" value={0} />
    </div>
</article>

<style>
    .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }

    .flex > * {
        margin-inline: 0.5rem;
    }

    article {
        border-radius: 0.5rem;
        background-color: dimgray;
        color: white;
        padding: 0.5rem;
    }

    img {
        width: 2rem;
        max-height: 3rem;
        image-rendering: pixelated;
    }

    p {
        margin-block: 0.5rem;
    }
</style>
