<script lang="ts">
    import { RMPosition, type RobotMaster } from "$lib/data/robotMasters.js";
    import type {
        BaseImageKey,
        ImagePartLoader,
    } from "$lib/image/PartComponents.js";

    type Props = {
        imageLoader: ImagePartLoader;
        rmName: RobotMaster;
        rmPart: BaseImageKey;
    };

    let { imageLoader: controller, rmName, rmPart }: Props = $props();
    let image: HTMLImageElement;

    $effect(() => {
        let { x, y } = RMPosition[rmName];
        let jimpo = controller.getCroppedPart(rmPart, x, y);

        if (jimpo.bitmap.data.length > 0) {
            jimpo.getBase64("image/png").then((r) => {
                image.src = r;
            });
        }
    });
</script>

<article>
    <img bind:this={image} alt={`${rmName}'s ${rmPart}`} />
    <div>{`${rmName}'s' ${rmPart}`}</div>
</article>

<style>
    article {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    img {
        aspect-ratio: 1;
    }
</style>
