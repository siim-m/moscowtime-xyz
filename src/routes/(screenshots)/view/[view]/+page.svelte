<script lang="ts">
  import { page } from '$app/stores';
  import Clock from '$lib/clock.svelte';
  import { addMilliseconds, format } from 'date-fns';
  import { setContext } from 'svelte';
  import { readable } from 'svelte/store';

  const queryTimestamp = $page.url.searchParams.get('timestamp');

  const localDate = queryTimestamp
    ? new Date(parseInt(queryTimestamp) * 1000)
    : new Date(Date.now());
  const offsetMinutes = localDate.getTimezoneOffset();
  const utcDate = addMilliseconds(new Date(offsetMinutes * 1000 * 60), localDate.getTime());

  const { view } = $page.params;
  const value = $page.url.searchParams.get('value') ?? undefined;
  const model = $page.url.searchParams.get('model') || 'mini';
  const noFrame = $page.url.searchParams.get('noframe') === 'true' ? true : false;
  const timestamp = `${format(utcDate, 'MMMM do, y @ HH:mm')} UTC`;

  setContext('activeViews', readable([view]));
</script>

<svelte:head>
  <title>Moscow Time | Snapshot</title>
</svelte:head>

<div class="px-6 pt-[189px]">
  <Clock
    interval={60000}
    {value}
    {model}
    {noFrame}
  />
  <p class="pt-16 text-center font-mono text-3xl text-neutral-600">
    {timestamp} | BLOCKCLOCK is a registered trademark of Coinkite Inc.
  </p>
</div>
