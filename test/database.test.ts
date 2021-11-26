import * as Database from '../src/database';

describe('Database.properties', () => {
  it('title', () => {
    const value: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
        {
          type: 'text',
          text: {content: 'bar', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'bar',
          href: null,
        },
        {
          type: 'text',
          text: {content: 'baz', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'baz',
          href: null,
        },
      ],
    };

    expect(Database.title(value)).toBe('foobarbaz');
  });

  it('title with annotation', () => {
    const bold: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.title(bold)).toBe('**foo**');

    const italic: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: true,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.title(italic)).toBe('_foo_');

    const strikethrough: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: true,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.title(strikethrough)).toBe('~~foo~~');

    const underline: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: true,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.title(underline)).toBe('<u>foo</u>');

    const code: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.title(code)).toBe('`foo`');

    const color: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.title(color)).toBe('foo'); // Not suppoted

    const link: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: 'foo',
            link: {
              url: 'https://github.com',
            },
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: 'https://github.com',
        },
      ],
    };

    expect(Database.title(link)).toBe('[foo](https://github.com)');

    const mixed: Database.PropertyValue<'title'> = {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: 'foo',
            link: {
              url: 'https://github.com',
            },
          },
          annotations: {
            bold: true,
            italic: true,
            strikethrough: true,
            underline: true,
            code: true,
            color: 'default',
          },
          plain_text: 'foo',
          href: 'https://github.com',
        },
      ],
    };

    expect(Database.title(mixed)).toBe(
      '[`<u>~~_**foo**_~~</u>`](https://github.com)',
    );
  });

  it('rich_text', () => {
    const value: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
        {
          type: 'text',
          text: {content: 'bar', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'bar',
          href: null,
        },
        {
          type: 'text',
          text: {content: 'baz', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'baz',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(value)).toBe('foobarbaz');
  });

  it('rich_text with annotation', () => {
    const bold: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(bold)).toBe('**foo**');

    const italic: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: true,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(italic)).toBe('_foo_');

    const strikethrough: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: true,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(strikethrough)).toBe('~~foo~~');

    const underline: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: true,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(underline)).toBe('<u>foo</u>');

    const code: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(code)).toBe('`foo`');

    const color: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {content: 'foo', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: null,
        },
      ],
    };

    expect(Database.rich_text(color)).toBe('foo'); // Not suppoted

    const link: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'foo',
            link: {
              url: 'https://github.com',
            },
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'foo',
          href: 'https://github.com',
        },
      ],
    };

    expect(Database.rich_text(link)).toBe('[foo](https://github.com)');

    const mixed: Database.PropertyValue<'rich_text'> = {
      id: 'rich_text',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'foo',
            link: {
              url: 'https://github.com',
            },
          },
          annotations: {
            bold: true,
            italic: true,
            strikethrough: true,
            underline: true,
            code: true,
            color: 'default',
          },
          plain_text: 'foo',
          href: 'https://github.com',
        },
      ],
    };

    expect(Database.rich_text(mixed)).toBe(
      '[`<u>~~_**foo**_~~</u>`](https://github.com)',
    );
  });

  it('number', () => {
    const value: Database.PropertyValue<'number'> = {
      id: 'number',
      type: 'number',
      number: 1234,
    };

    expect(Database.number(value)).toBe(1234);
  });

  it('select', () => {
    const value: Database.PropertyValue<'select'> = {
      id: 'select',
      type: 'select',
      select: {
        id: 'foo',
        name: 'facilis placeat explicabo',
        color: 'default',
      },
    };

    expect(Database.select(value)).toBe('facilis placeat explicabo');
  });

  it('multi_select', () => {
    const value: Database.PropertyValue<'multi_select'> = {
      id: 'multi_select',
      type: 'multi_select',
      multi_select: [
        {
          id: 'foo',
          name: 'pariatur ex ut',
          color: 'yellow',
        },
      ],
    };

    expect(Database.multi_select(value)).toBe('pariatur ex ut');
  });

  it('date', () => {
    const value: Database.PropertyValue<'date'> = {
      id: 'date',
      type: 'date',
      date: {start: '2021-11-10T06:26:00.000+09:00', end: null},
    };

    expect(Database.date()(value)).toBe('2021-11-10 06:26:00');
  });

  // Unsupported

  // it('files', () => {
  //   const value: Database.PropertyValue<'files'> = {};

  //   expect(Database.files(value)).toBe();
  // });

  it('checkbox', () => {
    const falseValue: Database.PropertyValue<'checkbox'> = {
      id: 'checkbox',
      type: 'checkbox',
      checkbox: false,
    };

    expect(Database.checkbox(falseValue)).toBe(':x:');

    const trueValue: Database.PropertyValue<'checkbox'> = {
      id: 'checkbox',
      type: 'checkbox',
      checkbox: true,
    };

    expect(Database.checkbox(trueValue)).toBe(':white_check_mark:');
  });

  it('url', () => {
    const value: Database.PropertyValue<'url'> = {
      id: 'url',
      type: 'url',
      url: 'https://hilario.info',
    };

    expect(Database.url(value)).toBe('https://hilario.info');
  });

  it('email', () => {
    const value: Database.PropertyValue<'email'> = {
      id: 'email',
      type: 'email',
      email: 'Tre.Streich18@yahoo.com',
    };

    expect(Database.email(value)).toBe('Tre.Streich18@yahoo.com');
  });

  it('phone_number', () => {
    const value: Database.PropertyValue<'phone_number'> = {
      id: 'phone_number',
      type: 'phone_number',
      phone_number: '268-664-1792',
    };

    expect(Database.phone_number(value)).toBe('268-664-1792');
  });

  // Unsupported

  // it('formula', () => {
  //   const value: Database.PropertyValue<'formula'> = {};

  //   expect(Database.formula(value)).toBe();
  // });

  // it('relation', () => {
  //   const value: Database.PropertyValue<'relation'> = {};

  //   expect(Database.relation(value)).toBe();
  // });

  // it('rollup', () => {
  //   const value: Database.PropertyValue<'rollup'> = {};

  //   expect(Database.rollup(value)).toBe();
  // });

  // it('people', () => {
  //   const value: Database.PropertyValue<'people'> = {};

  //   expect(Database.people(value)).toBe();
  // });

  // it('created_by', () => {
  //   const value: Database.PropertyValue<'created_by'> = {};

  //   expect(Database.created_by(value)).toBe();
  // });

  it('created_time', () => {
    const value: Database.PropertyValue<'created_time'> = {
      id: 'created_time',
      type: 'created_time',
      created_time: '2021-11-10T06:26:00.000Z',
    };

    expect(Database.created_time()(value)).toBe('2021-11-10 15:26:00');
  });

  // Unsupported

  // it('last_edited_by',  () => {
  //   const value: Database.PropertyValue<'last_edited_by'> = {};

  //   expect(Database.last_edited_by(value)).toBe();
  // });

  it('last_edited_time', () => {
    const value: Database.PropertyValue<'last_edited_time'> = {
      id: 'last_edited_time',
      type: 'last_edited_time',
      last_edited_time: '2021-11-10T06:26:00.000Z',
    };

    expect(Database.last_edited_time()(value)).toBe('2021-11-10 15:26:00');
  });
});
