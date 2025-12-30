const inFlightRequests = new Map();

export function withRequestLock(key, fetcher) {
  if (!inFlightRequests.has(key)) {
    const promise = Promise.resolve()
      .then(fetcher)
      .then(
        (result) => {
          inFlightRequests.delete(key);
          return result;
        },
        (error) => {
          inFlightRequests.delete(key);
          throw error;
        }
      );

    inFlightRequests.set(key, promise);
  }

  return inFlightRequests.get(key);
}

export function clearRequestLock(key) {
  if (key) {
    inFlightRequests.delete(key);
  } else {
    inFlightRequests.clear();
  }
}
