<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type Variant = "big" | "medium" | "icon";
  export let variant: Variant = "medium";

  interface $$Props extends HTMLButtonAttributes {
    variant?: Variant;
  }
</script>

<button
  type="button"
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:focus
  class={twMerge(
    `focus-visible:ring-2 ring-offset-slate-700 ring-offset-1 ring-slate-300`,
    `bg-slate-600 hover:bg-slate-500 active:bg-slate-500`,
    `rounded-md`,
    {
      big: `px-5 py-1`,
      medium: `text-sm px-5 py-1`,
      icon: `px-1 py-1 `,
    }[variant],
    $$props.class
  )}><slot /></button
>
