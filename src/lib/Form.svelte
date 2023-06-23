<script lang="ts">
    import Button from "./Button.svelte";
    import Switch from "./Switch.svelte";
    import Pencil from "./icons/Pencil.svelte";
    import Trash from "./icons/Trash.svelte";
    import type { Rule } from "./storage";
    export let rule: Rule;
    export let editing: boolean;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onDeleteClick() {
        dispatch("deleteClick", {});
    }
    function onEditClick() {
        dispatch("editClick", {});
    }
    function onToggle() {
        dispatch("toggle", {});
    }
    function onCancelClick() {
        dispatch("cancelClick", {});
    }
    function onSaveClick() {
        dispatch("saveClick", {});
    }
</script>

<!-- 
<div class="flex py-2 items-center justify-between">
    <div class="w-32 p-2">{rule.type}</div>
    <div class="flex-1">{rule.value}</div>
 
  </div>
-->
<div class="flex py-3 items-center space-x-2">
    <div class="w-32">
        {#if editing}
            <select
                value={rule.type}
                class=" rounded border border-slate-500 hover:border-slate-400 bg-transparent p-1 h-8 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
            >
                <option value="startsWith">Starts with</option>
            </select>
        {:else}
            <div>
                {rule.type}
            </div>
        {/if}
    </div>

    <div class="flex-1">
        {#if editing}
            <input
                class="rounded border border-slate-500 hover:border-slate-400 bg-slate-700 p-1 h-8 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
                type="text"
                value={rule.value}
            />
        {:else}
            <div>
                {rule.value}
            </div>
        {/if}
    </div>

    <div class="flex space-x-2 items-center justify-between">
        <Button variant="icon" on:click={onDeleteClick}>
            <Trash class="h-4 w-4" />
        </Button>
        <Button variant="icon" on:click={onEditClick}>
            <Pencil class="h-4 w-4" />
        </Button>
        <div><Switch checked={rule.enabled} on:change={onToggle} /></div>
    </div>
</div>

{#if editing}
    <div class="flex items-center justify-end space-x-3">
        <Button on:click={onCancelClick}>Cancel</Button>
        <Button on:click={onSaveClick}>Save</Button>
    </div>
{/if}
<div class="h-[1px] bg-slate-600" />
