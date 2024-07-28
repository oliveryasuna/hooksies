interface UseInViewportOptions extends IntersectionObserverInit {
  callback?: ((entry: IntersectionObserverEntry) => void);
}

export type {
  UseInViewportOptions
};
