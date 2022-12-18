<script lang="ts">
  import Footer from '$lib/footer.svelte';
  import { initActiveViewsStore } from '$lib/views';
  import { setContext } from 'svelte';
  import '../../app.css';

  const activeViews = initActiveViewsStore();
  setContext('activeViews', activeViews);
</script>

<svelte:head>
  <title>Moscow Time</title>
  <meta
    name="twitter:title"
    content="Moscow Time"
  />
  <meta
    name="twitter:card"
    content="summary_large_image"
  />
  <meta
    name="twitter:description"
    content="The best bitcoin meme of 2021"
  />
  <meta
    name="description"
    content="The best bitcoin meme of 2021"
  />
  <meta
    name="twitter:image"
    content="https://moscowtime.xyz/card.png"
  />
</svelte:head>

<div class="mx-2 flex h-full flex-col sm:mx-6 md:mx-10 lg:mx-14">
  <main class="flex-grow">
    <slot />
  </main>

  <Footer />
</div>
