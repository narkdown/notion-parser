export const markdownEscapes: Array<[RegExp, string]> = [
  // prettier-ignore
  [/\|/g, '\\|'],
];

export const escape = (string_: string) => {
  let string__ = string_;

  for (const markdownEscape of markdownEscapes) {
    string__ = string__.replace(markdownEscape[0], markdownEscape[1]);
  }

  return string__;
};
