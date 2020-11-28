import { useCallback, useMemo } from "react";

const addOption = (array: string[], str: string) => [...array, str];
const removeOption = (array: string[], str: string) =>
  array.filter((it) => it !== str);

export default function useToggleOptions(
  options: string[]
): [(option: string) => string[], (option: string) => boolean] {
  const selectedSet = useMemo(() => new Set(options), [options]);
  const toggle = useCallback(
    (option) =>
      selectedSet.has(option)
        ? removeOption(options, option)
        : addOption(options, option),
    [options, selectedSet]
  );
  const contains = useCallback((option: string) => selectedSet.has(option), [
    selectedSet,
  ]);
  return [toggle, contains];
}
