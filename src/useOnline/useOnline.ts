import {useState} from 'react';
import {useMount} from '../useMount';
import {isSsr} from '../utils';
import {noop} from 'lodash-es';

/**
 * Tracks the online/offline status of the browser.
 *
 * @returns A boolean indicating whether the browser is online.
 *
 * @example
 * const isOnline = useOnline();
 *
 * return <div>{isOnline ? 'Online' : 'Offline'}</div>;
 *
 * @remarks
 * This hook is useful for tracking the online/offline status of the browser and
 * updating the component state accordingly.
 * It listens for `online` and `offline` events on the `window` object and
 * updates the state.
 */
const useOnline = ((): boolean => {
  const [online, setOnline] = useState<boolean>((): boolean => {
    if(isSsr() || (typeof navigator === 'undefined')) {
      return true;
    }

    return window.navigator.onLine;
  });

  useMount((): (() => void) => {
    if(isSsr()) {
      return noop;
    }

    const handleOnline = ((): void => {
      setOnline(true);
    });
    const handleOffline = ((): void => {
      setOnline(false);
    });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return ((): void => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    });
  });

  return online;
});

export {
  useOnline
};
