<script>
    import Button from "./Button.svelte";
</script>

<div class="flex py-3 items-center space-x-2">
    <select
        value={"startsWith"}
        class="w-32 rounded border border-slate-500 hover:border-slate-400 bg-transparent p-1 h-8 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
    >
        <option value="startsWith">Starts with</option>
    </select>
    <input
        class="rounded flex-1 border border-slate-500 hover:border-slate-400 bg-slate-700 p-1 h-8 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
        type="text"
        value="hello.com"
    />
</div>
<div class="flex items-center justify-end space-x-3">
    <Button>Cancel</Button>
    <Button>Save</Button>
</div>
