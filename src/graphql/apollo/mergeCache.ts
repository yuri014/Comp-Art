import handleInjectionSink from '@utils/handleInjectionSink';

const mergeCache = (existing: [], incoming: [], offset: number): unknown[] => {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; ++i) {
    const newIncoming = handleInjectionSink(incoming, i);

    merged[offset + i] = newIncoming;
  }
  return merged;
};

export const mergeArrayCache = (
  existing: [],
  incoming: [],
  offset: [number, number],
): unknown[] => {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; ++i) {
    const newIncoming = handleInjectionSink(incoming, i);

    merged[offset[0] + offset[1] + i] = newIncoming;
  }
  return merged;
};

export default mergeCache;
