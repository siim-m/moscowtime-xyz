<script>
  import Footer from '$lib/footer.svelte';
  import { initActiveViewsStore } from '$lib/views';
  import { setContext } from 'svelte';
  import '../../app.css';

  const activeViews = initActiveViewsStore();
  setContext('activeViews', activeViews);
</script>

<div class="mx-2 flex h-full flex-col sm:mx-6 md:mx-10 lg:mx-14">
  <main class="flex-grow">
    <slot />
  </main>

  <Footer />
</div>
