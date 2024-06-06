export interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

export interface LoadingInfo {
  loading: boolean;
  mainText?: string;
  subTexts?: string[];
}

export type SetState<T extends unknown> = {
  _(
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined,
    actionName?: string
  ): void;
}["_"];
