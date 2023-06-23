<script lang="ts">
  export let checked: boolean;
</script>

<label
  class="group block h-5 w-10 relative cursor-pointer rounded-md focus-within:ring-2 ring-offset-slate-700 ring-offset-2 ring-slate-300"
>
  <input class="peer sr-only" type="checkbox" {checked} on:change />
  <div
    class="absolute top-1 left-1 bottom-1 right-1 bg-slate-600 rounded-full group-hover:bg-slate-500"
  />
  <div
    class="absolute top-0 left-0 peer-checked:translate-x-5 transition-all bottom-0 h-5 w-5 bg-slate-500 group-hover:bg-slate-400 peer-checked:bg-slate-400 group-hover:peer-checked:bg-slate-300 rounded-full"
  />
</label>
