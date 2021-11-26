# @narkdown/notion-parser

> Generate massive amounts of fake contextual data for Notion

[![codecov](https://codecov.io/gh/narkdown/notion-parser/branch/main/graph/badge.svg)](https://codecov.io/gh/narkdown/notion-parser)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![npm version](https://badge.fury.io/js/@narkdown%2Fnotion-parser.svg)](https://badge.fury.io/js/@narkdown%2Fnotion-parser)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## Install

```
$ npm install @narkdown/notion-parser
```

## Usage

```typescript
const {Client} = require('@notionhq/client');
const {NotionParser} = require('@narkdown/notion-parser');

const NOTION_API_KEY = ''; // Notion API Key
const DATABASE_ID = ''; // Database ID

const notion = new Client({auth: NOTION_API_KEY});
const notionParser = new NotionParser({
  propertyOptions: {
    date: {
      timeZone: 'Asia/Seoul',
      format: 'yyyy-MM-dd HH:mm:ss',
    },
  },
});

const {results} = await notion.databases.query({
  database_id: DATABASE_ID,
});

const rows = notionParser.database.getRows(results);

console.log(rows);
```

## API

### `const notionParser = new NotionParser(options?)`

#### options

Type: `object`

##### propertyOptions

Type: `object`

###### date

- `timeZone` (`string`): [time zone name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (Default: `Asia/Seoul`)
- `format` (`string`) : [Date format patterns](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) (Default: `yyyy-MM-dd HH:mm:ss`)

#### `notionParser.database.getRows(results)`

##### results

results field of [Query a database response](https://developers.notion.com/reference/post-database-query)

## Support

### [Database Object](https://developers.notion.com/reference/database)

| Property           | Supported |
| ------------------ | --------- |
| `object`           | ❌        |
| `id`               | ❌        |
| `created_time`     | ❌        |
| `last_edited_time` | ❌        |
| `title`            | ❌        |
| `icon`             | ❌        |
| `cover`            | ❌        |
| `properties`       | ⚠️        |
| `parent`           | ❌        |
| `url`              | ❌        |

#### Property Object

| Property           | Supported |
| ------------------ | --------- |
| `title`            | ✅        |
| `rich_text`        | ✅        |
| `number`           | ✅        |
| `select`           | ✅        |
| `multi_select`     | ✅        |
| `date`             | ✅        |
| `files`            | ❌        |
| `checkbox`         | ✅        |
| `url`              | ✅        |
| `email`            | ✅        |
| `phone_number`     | ✅        |
| `formula`          | ❌        |
| `relation`         | ❌        |
| `rollup`           | ❌        |
| `people`           | ❌        |
| `created_by`       | ❌        |
| `created_time`     | ✅        |
| `last_edited_by`   | ❌        |
| `last_edited_time` | ✅        |

### [Page Object](https://developers.notion.com/reference/page)

| Property           | Supported |
| ------------------ | --------- |
| `object`           | ❌        |
| `id`               | ❌        |
| `created_time`     | ❌        |
| `last_edited_time` | ❌        |
| `archived`         | ❌        |
| `icon`             | ❌        |
| `cover`            | ❌        |
| `properties`       | ❌        |
| `parent`           | ❌        |
| `url`              | ❌        |

## Related

- [makenotion/notion-sdk-js](https://github.com/makenotion/notion-sdk-js)

## License

[MIT](LICENSE)
