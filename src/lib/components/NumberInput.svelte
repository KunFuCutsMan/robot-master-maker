<script lang="ts">
    type Props = {
        label: string;
        value: number;
    };

    let { label, value = $bindable(1) }: Props = $props();
</script>

<label>
    <p>{label}:</p>
    <input type="number" class="input-bg" bind:value />
</label>

<style>
    label {
        display: inline-block;
        margin-inline: var(--size-4);
        margin-block: var(--size-1);
    }

    p {
        width: fit-content;
        display: inline-block;
    }

    input {
        appearance: none;
        display: inline-block;
        padding: var(--size-1);

        width: var(--size-11);

        background-color: var(--surface-1);
        border-radius: var(--radius-2);
        border-width: 0;
        box-shadow: var(--shadow-2);
    }
</style>
