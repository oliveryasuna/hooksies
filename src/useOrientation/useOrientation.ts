import type {Orientation} from './orientation';
import {useState} from 'react';
import {useMount} from '../useMount';
import {isSsr} from '../utils';
import {noop} from 'lodash-es';

// TODO: Would it be smart to add a throttle to this?
const useOrientation = ((): (Orientation | undefined) => {
  const [orientation, setOrientation] = useState<Orientation>();

  useMount((): (() => void) => {
    if(isSsr()) {
      return noop;
    }

    const handleDeviceOrientation = ((ev: DeviceOrientationEvent): void => {
      setOrientation({
        absolute: ev.absolute,
        alpha: ev.alpha,
        beta: ev.beta,
        gamma: ev.gamma
      });
    });

    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return ((): void => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    });
  });

  return orientation;
});

export {
  useOrientation
};
