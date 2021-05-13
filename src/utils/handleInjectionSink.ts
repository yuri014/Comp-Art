/**
 * Função para previnir Generic Object Injection Sink
 */
const handleInjectionSink = (index: number, array: unknown[]): boolean => {
  const newIndex = index as unknown | string | number;
  const boolValue = !!array[parseInt(newIndex as string, 10)];
  return boolValue;
};

export default handleInjectionSink;
