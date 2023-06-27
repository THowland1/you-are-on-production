<script lang="ts">
    import { slide } from "svelte/transition";
    import Button from "./Button.svelte";
    import Switch from "./Switch.svelte";
    import Pencil from "./icons/Pencil.svelte";
    import Trash from "./icons/Trash.svelte";
    import { TYPE_OPTIONS, type Rule, PART_OPTIONS } from "./storage";
    export let rule: Rule;

    let form: Rule | null = null;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        saveClick: {
            rule: Rule;
        };
        deleteClick: void;
        toggle: { value: boolean };
    }>();

    function onDeleteClick() {
        dispatch("deleteClick");
    }
    function onEditClick() {
        form = { ...rule };
    }
    function onToggle(value: boolean) {
        dispatch("toggle", { value });
    }
    function onCancelClick() {
        form = null;
    }
    function onSaveClick() {
        if (form) {
            dispatch("saveClick", { rule: form });
            form = null;
        }
    }
</script>

<form
    on:submit={(e) => {
        e.preventDefault();
        onSaveClick();
    }}
    class="hover:bg-slate-600/50 px-2"
>
    <div class="h-[1px] bg-slate-600" />
    <div class="flex py-1 items-center space-x-2 group text-xs h-8">
        <div class="w-24">
            {#if form}
                <select
                    bind:value={form.part}
                    class="w-full rounded border border-slate-500 hover:border-slate-400 bg-transparent px-1 h-6 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
                >
                    {#each PART_OPTIONS as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            {:else}
                <div class="px-2">
                    {rule.part}
                </div>
            {/if}
        </div>
        <div class="w-32">
            {#if form}
                <select
                    bind:value={form.type}
                    class="w-full rounded border border-slate-500 hover:border-slate-400 bg-transparent px-1 h-6 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
                >
                    {#each TYPE_OPTIONS as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            {:else}
                <div class="px-2">
                    {rule.type}
                </div>
            {/if}
        </div>

        <div class="flex-1">
            {#if form}
                <input
                    class=" w-full rounded border border-slate-500 hover:border-slate-400 bg-slate-700 px-1 h-6 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
                    type="text"
                    bind:value={form.value}
                />
            {:else}
                <div class="px-1 border border-transparent">
                    {rule.value}
                </div>
            {/if}
        </div>

        <div class="flex space-x-2 items-center justify-between">
            <div
                class="hidden space-x-1 items-center justify-between group-hover:flex"
            >
                <Button variant="icon" on:click={onDeleteClick}>
                    <Trash class="h-4 w-4" />
                </Button>
                <Button variant="icon" on:click={onEditClick}>
                    <Pencil class="h-4 w-4" />
                </Button>
            </div>
            <div>
                <Switch
                    checked={rule.enabled}
                    on:checkedChange={(e) => onToggle(e.detail.value)}
                />
            </div>
        </div>
    </div>
    {#if form}
        <div
            transition:slide
            class="flex items-center justify-end space-x-3 pb-1"
        >
            <Button on:click={onCancelClick}>Cancel</Button>
            <Button on:click={onSaveClick}>Save</Button>
        </div>
    {/if}
</form>
