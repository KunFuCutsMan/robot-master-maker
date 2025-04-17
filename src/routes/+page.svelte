<script lang="ts">
    import { startRMM } from "$lib/index.js";

    let rmm: HTMLDivElement;

    $effect(() => {
        startRMM(rmm);
    });
</script>

<h1>Welcome to your library project</h1>
<p>
    Create your package using @sveltejs/package and preview/showcase your work
    with SvelteKit
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>

<div id="robot-master-maker" bind:this={rmm}></div>

<style>
    #robot-master-maker {
        border: 1px solid black;
        margin: 0;
        padding: 0;
    }
</style>
