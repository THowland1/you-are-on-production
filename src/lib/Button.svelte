<script lang="ts">
  export let variant: "big" | "medium" | "icon" = "medium";
</script>

{#if variant === "medium"}
  <button
    type="button"
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:focus
    class="text-sm bg-slate-600 hover:bg-slate-500 active:bg-slate-500 rounded-md px-5 py-1 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
    ><slot /></button
  >
{/if}
{#if variant === "big"}
  <button
    type="button"
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:focus
    class="bg-slate-600 hover:bg-slate-500 active:bg-slate-500 rounded-md px-5 py-1 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
    ><slot /></button
  >
{/if}
{#if variant === "icon"}
  <button
    type="button"
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:focus
    class="bg-slate-600 hover:bg-slate-500 active:bg-slate-500 rounded-md px-1 py-1 focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300"
    ><slot /></button
  >
{/if}
