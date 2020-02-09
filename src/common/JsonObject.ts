type JsonPrimitive = boolean | number | string | null | undefined;
type JsonValue = JsonPrimitive | JsonObject<unknown> | JsonValue[];

export type JsonObject<Structure> = {
    [property in keyof Structure]: JsonValue;
};
