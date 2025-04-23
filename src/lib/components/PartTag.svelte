<script lang="ts">
    import { RMPosition, type RobotMaster } from "$lib/data/robotMasters.js";
    import type { BaseImageKey } from "$lib/image/PartComponents.svelte.js";
    import { getCanvasControllerContext } from "./context.js";

    type Props = {
        rmName: RobotMaster;
        rmPart: BaseImageKey;
    };

    let { rmName, rmPart }: Props = $props();
    let controller = getCanvasControllerContext();
    let image: HTMLImageElement;

    $effect(() => {
        if (!controller.imageLoader.imagesLoaded) return;

        let { x, y } = RMPosition[rmName];
        let jimpo = controller.imageLoader.getCroppedPart(rmPart, x, y);

        if (jimpo.bitmap.data.length > 0) {
            jimpo.getBase64("image/png").then((r) => {
                image.src = r;
            });
        }
    });
</script>

<article>
    <img bind:this={image} alt={`${rmName}'s ${rmPart}`} />
    <div>{`${rmName}'s ${rmPart}`}</div>
</article>

<style>
    article {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    img {
        width: 2rem;
        image-rendering: pixelated;
    }
</style>
