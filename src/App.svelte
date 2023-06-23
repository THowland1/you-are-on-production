<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import { onMount } from "svelte";
  import { getRules, setRules, type Rule } from "./lib/storage";
  import "./app.css";
  import Trash from "./lib/icons/Trash.svelte";
  import Pencil from "./lib/icons/Pencil.svelte";
  import Switch from "./lib/Switch.svelte";
  import Form from "./lib/Form.svelte";
  import Button from "./lib/Button.svelte";
  import { slide } from "svelte/transition";

  let rules: Rule[] = [
    // {
    //   id: new Date().toISOString(),
    //   enabled: true,
    //   type: "starts with",
    //   value: "Hello",
    // },
    // {
    //   id: new Date().toISOString(),
    //   enabled: true,
    //   type: "starts with",
    //   value: "Bello",
    // },
  ];
  let width = "600px";
  onMount(async () => {
    rules = await getRules();
    // await setRules([
    //   ...rules,
    //   {
    //     id: new Date().toISOString(),
    //     enabled: true,
    //     type: "starts with",
    //     value: "deszf",
    //   },
    // ]);
  });
  async function updateRules(new_rules: Rule[]) {
    rules = new_rules;
    await setRules(new_rules);
  }
  let checked = true;
  $: {
    // setRules(rules);
  }
</script>

<div class="all bg-slate-900 text-slate-200">
  {#if checked}
    <div class="left p-4">
      <div class="text-lg">Rules</div>
      {#each rules as rule (rule.id)}
        <div out:slide>
          <Form
            {rule}
            on:cancelClick={() => console.log("cancelClick")}
            on:deleteClick={() =>
              updateRules(rules.filter((r) => r.id !== rule.id))}
            on:editClick={() => console.log("editClick")}
            on:saveClick={(r) => {
              const index = rules.findIndex((r) => r.id === rule.id);
              if (index > -1) {
                rules[index] = r.detail.rule;
              }
              updateRules(rules);
            }}
            on:toggle={() => console.log("toggle")}
          />
        </div>
      {/each}
      <div class="h-[1px] bg-slate-600" />

      <Button variant="big">Add Rule</Button>
    </div>
  {/if}
  <main class="right">
    <label for="">
      <input type="checkbox" bind:checked />
      Hello
    </label>
    <div class="text-4xl">BIG ICON</div>
    <div>You are not on production</div>
  </main>
</div>

<style>
  :global(body) {
    /* width: 800px; */
    width: fit-content;
    --blue-grey-50: #f8fafc;
    --blue-grey-100: #f1f5f9;
    --blue-grey-200: #e2e8f0;
    --blue-grey-300: #cbd5e1;
    --blue-grey-400: #94a3b8;
    --blue-grey-500: #64748b;
    --blue-grey-600: #475569;
    --blue-grey-700: #334155;
    --blue-grey-800: #1e293b;
    --blue-grey-900: #0f172a;
    background-color: var(--blue-grey-800);
  }
  .all {
    display: flex;
  }
  .left {
    width: 600px;
    background-color: var(--blue-grey-700);
  }
  .right {
    width: 200px;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
