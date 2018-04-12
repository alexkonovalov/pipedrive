export interface Action<T extends string> {
  type: T
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

export type ActionFn<T extends string> = () => Action<T>
export type ActionWithPayloadFn<T extends string, P> = (payload: P) => ActionWithPayload<T, P>

export function action<T extends string>(type: T): ActionFn<T>
export function action<T extends string, P>(type: T): ActionWithPayloadFn<T, P>
export function action(type: string) {
  return (payload?: any) => (payload ? { type, payload } : { type })
}
