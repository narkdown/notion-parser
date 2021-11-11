import {escape} from '../../src/utils';

describe('escape markdown characters', () => {
  it('|', () => {
    const string_ = 'a | b';

    expect(escape(string_)).toBe('a \\| b');
  });
});
