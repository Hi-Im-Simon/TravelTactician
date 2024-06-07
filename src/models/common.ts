export interface LoadingInfo {
  loading: boolean;
  mainText?: string;
  subTexts?: string[];
}

export interface Results {
  basic: JSX.Element[];
  specific: JSX.Element[];
}

export type SetState<T extends unknown> = {
  _(
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined,
    actionName?: string
  ): void;
}["_"];
