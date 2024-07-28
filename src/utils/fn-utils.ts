/**
 * Represents any function that accepts any arguments, an optional `this`
 * context, and returns any value.
 */
type AnyFn = ((this: any, ...args: any[]) => any);

/**
 * Represents a function with a specific `this` context, arguments, and return
 * type.
 */
type NarrowFn<Fn extends AnyFn> = ((this: ThisParameterType<Fn>, ...args: Parameters<Fn>) => ReturnType<Fn>);

/**
 * Represents a function that performs an action.
 */
type ActionFn = (() => void);

/**
 * Represents a function that compares two values and returns a number
 * indicating their relative order.
 */
type ComparatorFn<T> = ((a?: T, b?: T) => number);

/**
 * Represents a function that compares two values and returns a boolean
 * indicating whether they are equal.
 */
type EqualFn<T> = ((a?: T, b?: T) => boolean);

/**
 * Checks if the specified property exists on the object.
 *
 * @typeParam Obj - The object type.
 * @typeParam Key - The property key type.
 * @param obj - The object to check.
 * @param prop - The property key to check.
 * @returns A boolean indicating whether the property exists on the object.
 */
const has = (<Obj, Key extends PropertyKey>(obj: Obj, prop: Key): obj is (Obj & Record<Key, unknown>) =>
    ((obj !== null) && (typeof obj === 'object') && (prop in obj)));

export type {
  AnyFn,
  ActionFn,
  NarrowFn,
  ComparatorFn,
  EqualFn
};
export {
  has
};
