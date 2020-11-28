import {
  createContext,
  DispatchWithoutAction,
  useContext,
  useEffect,
  useReducer,
} from "react";

export const PrintContext = createContext(false);

export function usePrint(
  printMode: boolean,
  togglePrintMode: () => void
): void {
  useEffect(() => {
    if (printMode) {
      window.print();
      togglePrintMode();
    }
  }, [printMode, togglePrintMode]);
}

export function usePrintModeReducer(): [boolean, DispatchWithoutAction] {
  return useReducer((mode) => {
    if (mode) {
      document.body.classList.remove("print-mode");
    } else {
      document.body.classList.add("print-mode");
    }
    return !mode;
  }, false);
}

export function usePrintMode<T>(
  screen: T | T[] | Record<string, T>,
  print: T
): T | T[] | Record<string, T> {
  const printCtx = useContext(PrintContext);
  return printCtx ? print : screen;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePrintModeAs(breakpoint: string): (fix: any) => any {
  const printCtx = useContext(PrintContext);
  return <T = string | number>(screen: Record<string, T>) =>
    printCtx ? screen[breakpoint] : screen;
}
