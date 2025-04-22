import { mount } from "svelte";
import RobotMasterMaker from "$lib/components/RobotMasterMaker.svelte";

export function startRMM( element: Element ) {
    mount( RobotMasterMaker, { target: element } );
}