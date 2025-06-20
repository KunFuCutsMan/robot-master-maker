<script lang="ts">
    import { type ModalProps } from "svelte-modals";

    let { isOpen, close }: ModalProps = $props();
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <section class="surface-0">
            <div class="content">
                <h1>What is this?</h1>
                <p>
                    Hello! KFCMan here! For my one year anniversary I decided to
                    make a widget for you to place on your server. Seeing as
                    there are no mega-man themed stuff (at least from what I
                    research), I thought to myself, why not make something?
                </p>
                <p>
                    And here we are! It took me months to develop this, hope you
                    like it!
                </p>
                <h2>How do I use this?</h2>
                <p>There are two sections in this widget:</p>
                <ol>
                    <li>Robot Master Panel</li>
                    <li>Parts Modifier</li>
                </ol>
                <p>
                    The <b>Robot Master Panel</b> is a 64x64 canvas, showing the
                    constructed robot master that you made. Simple as that.
                </p>
                <p>
                    The <b>Parts Modifier</b>, meanwhile, are where you edit
                    every part of your Robot Master. Each one modifies the type,
                    position, and color of each part of your Robot Master, and
                    they're displayed on the Robot Master Panel.
                </p>
                <p>
                    The Robot Master Parts were <del>stolen</del> borrowed from Robot
                    Masters from the classic saga, so mix and match whatever you
                    feel fits best.
                </p>
                <p>
                    Keep in mind that the order they're showed in, also
                    represents where their "layer" is located relative to the
                    other parts. The head is the top layer, then the arms,
                    chest, pants, and finally the legs. Also, some parts may be
                    missing as they were not located on the original Robot
                    Master designs.
                </p>
                <p>
                    Once you're done, click the Export button download the Robot
                    Master you created, along with a widget for you to copy
                    somewhere on your site.
                </p>

                <p>V{APP_VERSION}</p>
            </div>
            <button
                aria-label="Close Dialog"
                class="surface-1"
                onclick={() => close()}>X</button
            >
        </section>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(22, 25, 29, 0.75);
    }

    section {
        margin: auto;
        padding: var(--size-6);
        position: relative;
        inset: 0;

        border: var(--size-1) solid var(--surface-3);
        border-radius: var(--radius-3);

        font-family: var(--font-industrial);
    }

    button {
        position: absolute;
        top: var(--size-1);
        right: var(--size-1);
        width: var(--size-4);
        aspect-ratio: var(--ratio-square);
        border: none;
        border-radius: var(--radius-2);
        cursor: pointer;
    }

    .content {
        overflow-y: scroll;
        padding-inline: var(--size-4);
        max-height: var(--size-14);
    }

    .content > * {
        margin-bottom: var(--size-2);
    }

    p {
        max-width: 60ch;
    }

    h1,
    h2 {
        text-align: center;
    }
</style>
