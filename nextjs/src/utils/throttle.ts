export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout === null) {
      func(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }
  };
}
