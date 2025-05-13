<script lang="ts">
    import {
        MMGames,
        RMPosition,
        type RobotMaster,
    } from "$lib/data/robotMasters.js";

    type Props = {
        value: RobotMaster;
    };

    type RMGameData = {
        game: string;
        row: number;
    };

    let { value = $bindable() }: Props = $props();

    function getMMGames(): RMGameData[] {
        let data: RMGameData[] = [];
        for (const key in MMGames) {
            data.push({
                game: key,
                row: MMGames[key],
            });
        }

        return data;
    }

    function findRMsOnRow(row: number): RobotMaster[] {
        let rms: RobotMaster[] = [];

        for (const rm in RMPosition) {
            if (RMPosition[rm as RobotMaster].y == row) {
                rms.push(rm as RobotMaster);
            }
        }

        return rms;
    }
</script>

<!--
@component
Special Select tag that includes all the Robot Masters

-->

<select bind:value class="input-bg">
    {#each getMMGames() as { game, row }}
        <optgroup label={game}>
            {#each findRMsOnRow(row) as rm}
                <option>{rm}</option>
            {/each}
        </optgroup>
    {/each}
</select>

<style>
    select,
    ::picker(select) {
        appearance: base-select;
    }

    select {
        padding: var(--size-1);

        width: var(--size-11);

        font: var(--font-industrial);
        font-size: var(--font-size-1);

        border-radius: var(--radius-2);
        border-width: 0;

        scrollbar-width: thin;
    }

    ::picker(select) {
        background: var(--gradient-8);
        scrollbar-width: thin;
    }

    optgroup {
        background-color: var(--surface-1);
        margin: var(--size-1);
        border-radius: var(--radius-2);
    }

    option {
        padding-inline: var(--size-2);
    }

    option::checkmark {
        order: 1;
        content: "<";
        margin-left: auto;
    }

    option:is(:checked, :hover, :focus) {
        background-color: var(--surface-0);
        color: var(--text-1);

        outline: none;
    }
</style>
