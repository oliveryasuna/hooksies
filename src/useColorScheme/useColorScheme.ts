import {useMedia} from '../useMedia';

const useColorScheme = ((): ('dark' | 'light') => (useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'));

export {
  useColorScheme
};
