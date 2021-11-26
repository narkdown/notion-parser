export function objectEntries<
  Type extends Record<string, unknown>,
  Key extends Extract<keyof Type, string>,
>(value: Type): Array<[Key, Type[Key]]> {
  return Object.entries(value) as Array<[Key, Type[Key]]>;
}
