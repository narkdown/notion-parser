import * as Database from '../src/database';

describe('Database.properties', () => {
  it('title', async () => {
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

  it('rich_text', async () => {
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

  it('number', async () => {
    const value: Database.PropertyValue<'number'> = {
      id: 'number',
      type: 'number',
      number: 1234,
    };

    expect(Database.number(value)).toBe(1234);
  });

  it('select', async () => {
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

  it('multi_select', async () => {
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

  it('date', async () => {
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

  it('checkbox', async () => {
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

  it('url', async () => {
    const value: Database.PropertyValue<'url'> = {
      id: 'url',
      type: 'url',
      url: 'https://hilario.info',
    };

    expect(Database.url(value)).toBe('https://hilario.info');
  });

  it('email', async () => {
    const value: Database.PropertyValue<'email'> = {
      id: 'email',
      type: 'email',
      email: 'Tre.Streich18@yahoo.com',
    };

    expect(Database.email(value)).toBe('Tre.Streich18@yahoo.com');
  });

  it('phone_number', async () => {
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

  it('created_time', async () => {
    const value: Database.PropertyValue<'created_time'> = {
      id: 'created_time',
      type: 'created_time',
      created_time: '2021-11-10T06:26:00.000Z',
    };

    expect(Database.created_time()(value)).toBe('2021-11-10 15:26:00');
  });

  // Unsupported

  // it('last_edited_by', async () => {
  //   const value: Database.PropertyValue<'last_edited_by'> = {};

  //   expect(Database.last_edited_by(value)).toBe();
  // });

  it('last_edited_time', async () => {
    const value: Database.PropertyValue<'last_edited_time'> = {
      id: 'last_edited_time',
      type: 'last_edited_time',
      last_edited_time: '2021-11-10T06:26:00.000Z',
    };

    expect(Database.last_edited_time()(value)).toBe('2021-11-10 15:26:00');
  });
});
