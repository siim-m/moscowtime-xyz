<script lang="ts">
  import { viewsMap, type ActiveViewsStore } from '$lib/views';
  import { getContext, onMount } from 'svelte';

  export let interval: number | string | undefined = undefined;
  export let value: string | undefined = undefined;
  export let model: string | undefined = undefined;
  export let noFrame = false;

  const activeViews: ActiveViewsStore = getContext('activeViews');

  let clockContainer: HTMLElement;

  let clock = {
    unMount: () => undefined, // Temporarily assign an empty function, so Svelte doesn't complain about using it in onDestroy
  };

  onMount(() => {
    const unsubscribe = activeViews.subscribe((views) => {
      viewsMap.forEach((_, key) => {
        if (views.includes(key) && !clockContainer.classList.contains(key)) {
          clockContainer.classList.add(key);
        }

        if (!views.includes(key) && clockContainer.classList.contains(key)) {
          clockContainer.classList.remove(key);
        }
      });

      if (noFrame && !clockContainer.classList.contains('noframe')) {
        clockContainer.classList.add('noframe');
      }

      if (!noFrame && clockContainer.classList.contains('noframe')) {
        clockContainer.classList.remove('noframe');
      }

      if (interval && !clockContainer.className.includes('interval-')) {
        clockContainer.className += ` interval-${interval}`;
      }
      if (model && !clockContainer.className.includes('model-')) {
        clockContainer.className += ` model-${model}`;
      }
    });

    clock = mountBlockClock({ value, baseUrl: window.location.origin });

    return () => {
      unsubscribe();
      clock.unMount();
    };
  });
</script>

<div
  bind:this={clockContainer}
  id="blockclock-container"
/>
