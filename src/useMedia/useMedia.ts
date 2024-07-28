import {useLayoutEffect, useState} from 'react';
import {isSsr} from '../utils';

/**
 * Listeners to a media query and returns a boolean indicating whether the media
 * query matches.
 *
 * @param query - The media query to evaluate.
 * @returns A boolean indicating whether the media query matches.
 *
 * @example
 * const isLargeScreen = useMedia('(min-width: 1024px)');
 *
 * return (
 *   <div>
 *     {isLargeScreen ? 'You are on a large screen' : 'You are on a small screen'}
 *   </div>
 * );
 *
 * @remarks
 * This hook provides a convenient way to listen to media query changes and
 * reactively update the component state.
 * It handles browser compatibility for adding and removing media query
 * listeners.
 */
const useMedia = ((query: string): boolean => {
  const [matches, setMatches] = useState<boolean>((): boolean => {
    if(isSsr()) {
      return false;
    }

    return window.matchMedia(query)
        .matches;
  });

  useLayoutEffect(
      ((): (() => void) => {
        const media: MediaQueryList = window.matchMedia(query);

        const updateMatches = ((): void => {
          setMatches(media.matches);
        });

        updateMatches();

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if(media.addListener !== undefined) {
          // Safari < 14 support.
          media.addListener(updateMatches);
        } else {
          media.addEventListener('change', updateMatches);
        }

        return ((): void => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if(media.removeListener !== undefined) {
            // Safari < 14 support.
            media.removeListener(updateMatches);
          } else {
            media.removeEventListener('change', updateMatches);
          }
        });
      }),
      [query]
  );

  return matches;
});

export {
  useMedia
};
