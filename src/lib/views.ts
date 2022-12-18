import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

type ViewName = 'moscowtime' | 'usdprice' | 'blockheight' | 'satsperdollar';

export type ActiveViewsStore = Writable<ViewName[]>;

const allViews: ViewName[] = ['moscowtime', 'usdprice', 'blockheight', 'satsperdollar'];

export const viewsMap: Map<ViewName, string> = new Map([
  ['moscowtime', 'Moscow Time'],
  ['usdprice', 'USD Price'],
  ['blockheight', 'Block Height'],
  ['satsperdollar', 'Sats per Dollar'],
]);

export const initActiveViewsStore = () => {
  const _store = writable<ViewName[]>([]);

  const { set: _set, subscribe } = _store;

  const set = (views: ViewName[]) => {
    const sortedViews = views.sort((a, b) => {
      const aIndex = allViews.indexOf(a);
      const bIndex = allViews.indexOf(b);
      return aIndex - bIndex;
    });

    if (browser) {
      localStorage.setItem('views', JSON.stringify(sortedViews));
    }

    _set(sortedViews);
  };

  if (browser) {
    const storedViews = localStorage.getItem('views');
    if (storedViews) {
      set(JSON.parse(storedViews));
    } else {
      set(allViews);
    }
  } else {
    set([]);
  }

  return {
    subscribe,
    set,
  };
};
