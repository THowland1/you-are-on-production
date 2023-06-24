<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import "./app.css";
  import Button from "./lib/Button.svelte";
  import Form from "./lib/Form.svelte";
  import { getRules, setRules, type Rule, getUrl } from "./lib/storage";

  let rules: Rule[] = [];
  let width = "600px";
  let has_mounted = false;
  let url: URL | null = null;
  onMount(async () => {
    rules = await getRules();
    url = await getUrl();
    has_mounted = true;
  });
  async function updateRules(new_rules: Rule[]) {
    rules = new_rules;
    await setRules(new_rules);
  }
  let checked = true;
</script>

<div class="all bg-slate-900 text-slate-200">
  {#if checked}
    <div class="left">
      <div class="flex justify-between items-center py-2 pl-4 pr-2">
        <div class="text-lg">Rules</div>
        <Button
          variant="big"
          on:click={() => {
            rules.push({
              id: new Date().toISOString(),
              enabled: true,
              type: "starts with",
              value: window.location.origin,
            });
            updateRules(rules);
          }}>Add Rule</Button
        >
      </div>
      {#each rules as rule (rule.id)}
        <div transition:slide={{ duration: has_mounted ? 300 : 0 }}>
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
            on:toggle={(r) => {
              const index = rules.findIndex((r) => r.id === rule.id);
              if (index > -1) {
                rules[index].enabled = r.detail.value;
              }
              updateRules(rules);
            }}
          />
        </div>
      {/each}
    </div>
  {/if}
  <main class="right">
    <label for="">
      <input type="checkbox" bind:checked />
      Hello
    </label>
    <div class="text-4xl">BIG ICON</div>
    <div>You are not on production</div>
    <div>{url?.toString()}</div>
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
    width: 500px;
    background-color: var(--blue-grey-700);
  }
  .right {
    width: 300px;
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
