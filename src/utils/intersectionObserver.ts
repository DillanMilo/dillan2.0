type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

export const createIntersectionObserver = (
  callback: IntersectionCallback,
  options: IntersectionObserverInit = { threshold: 0.3 }
) => {
  return new IntersectionObserver(
    (entries) => entries.forEach((entry) => callback(entry)),
    options
  );
}; 