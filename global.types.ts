export type Id = string | number
export type ValueInObject<T extends object> = T[keyof T]
