import {Predicate, default as ow} from "ow";
import {JsonValue} from "type-fest";

export type Spec<T> = {
    [P in keyof T]: Predicate<T[P]>;
};

// TODO factor away the Extract<..., string> somehow?
export function sanitize<T>(source: Record<keyof T, JsonValue>, spec: Spec<T>, defaults: T): T {
    const destination: Partial<T> = {};

    for (const field in spec) {
        if (Object.prototype.hasOwnProperty.call(spec, field)) {
            const validator = spec[field];
            const sourceValue = source[field] as T[Extract<keyof T, string>];

            destination[field] = ow.isValid(sourceValue, validator) ? sourceValue : defaults[field];
        }
    }

    return destination as T;
}
