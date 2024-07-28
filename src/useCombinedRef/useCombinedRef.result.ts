import type React from 'react';

interface UseCombinedRefResult<T> {
  ref: React.RefCallback<T>;
  node: (T | null);
}

export type {
  UseCombinedRefResult
};
