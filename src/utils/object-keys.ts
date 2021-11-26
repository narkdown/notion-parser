export function objectKeys<
  Type extends Record<string, unknown>,
  Key extends Extract<keyof Type, string>,
>(value: Type): Key[] {
  return Object.keys(value) as Key[];
}
