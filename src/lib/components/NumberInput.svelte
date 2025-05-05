<script lang="ts">
    type Props = {
        label: string;
        value: number;
    };

    let { label, value = $bindable(1) }: Props = $props();
</script>

<label>
    <p>{label}</p>
    <input type="number" name="" bind:value />
</label>

<style>
    label {
        display: inline-block;
        margin-inline: auto;
    }
</style>
