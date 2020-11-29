/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, Subject } from "rxjs";
import { Dispatch, useEffect, useState } from "react";

type Return<T> = {
  loading: boolean;
  data: T | undefined;
  error: Error | undefined;
};

export default function useObservable<T>(
  factory: (...args: any[]) => Observable<T>,
  deps: any[] = []
): Return<T> {
  const [state, setState] = useState<Return<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  useEffect(() => {
    const observable$ = factory(...deps);
    const subscription = observable$.subscribe({
      next: (data) => setState({ data, loading: false, error: undefined }),
      error: (error) => setState({ data: undefined, loading: false, error }),
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
  return state;
}

export function useSubject<T>(): [Observable<T>, Dispatch<T>] {
  const subject = new Subject<T>();
  return [subject, subject.next];
}
