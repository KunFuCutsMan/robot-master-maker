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

<select bind:value>
    {#each getMMGames() as { game, row }}
        <optgroup label={game}>
            {#each findRMsOnRow(row) as rm}
                <option>{rm}</option>
            {/each}
        </optgroup>
    {/each}
</select>
