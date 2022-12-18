<script lang="ts">
  import { page } from '$app/stores';
  import Clock from '$lib/clock.svelte';
  import Toggle from '$lib/toggle.svelte';
  import { viewsMap, type ActiveViewsStore } from '$lib/views';
  import { getContext } from 'svelte';

  const interval = '3000';
  const model = $page.url.searchParams.get('model') || 'mini';
  const noFrame = $page.url.searchParams.get('noframe') === 'true' ? true : false;

  const activeViews: ActiveViewsStore = getContext('activeViews');
</script>

<svelte:head>
  <title>Moscow Time</title>
  <meta
    name="description"
    content="The best bitcoin meme of 2021"
  />
  <meta
    name="twitter:description"
    content="The best bitcoin meme of 2021"
  />
  <meta
    name="twitter:title"
    content="Moscow Time"
  />
</svelte:head>

<div class="mx-auto pt-[10vh] sm:max-w-screen-lg">
  <Clock
    {interval}
    {model}
    {noFrame}
  />
  <div
    class="mx-auto grid w-4/5 grid-cols-2 gap-y-6 pt-[3vh] sm:w-3/4 sm:grid-cols-4 md:w-4/5 lg:w-5/6 lg:pt-16"
  >
    {#each [...viewsMap] as view (view[0])}
      <Toggle
        label={view[1]}
        enabled={$activeViews.includes(view[0])}
        handleClick={() => {
          if ($activeViews.includes(view[0])) {
            $activeViews = $activeViews.filter((v) => v !== view[0]);
          } else {
            $activeViews = [...$activeViews, view[0]];
          }
        }}
      />
    {/each}
  </div>
</div>
