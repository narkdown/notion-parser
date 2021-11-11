import process from 'process'; // eslint-disable-line unicorn/prefer-node-protocol
import {Client as NotionClient} from '@notionhq/client';
import NotionFaker from '@narkdown/notion-faker';
import dotenv from 'dotenv';
import {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';
import {arrayIncludes} from '../src/utils';
import NotionParser from '../src/index';
import * as Database from '../src/database';

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const ENTRY_POINT_PAGE_ID = process.env.ENTRY_POINT_PAGE_ID!;

const notion: NotionClient = new NotionClient({auth: NOTION_API_KEY});
const notionFaker: NotionFaker = new NotionFaker();
const notionParser: NotionParser = new NotionParser();

const TIMEOUT = 60_000;

let response: QueryDatabaseResponse;
let TEST_PAGE_ID: string;

beforeAll(async () => {
  const {id: testPageId} = await notion.pages.create({
    parent: {
      page_id: ENTRY_POINT_PAGE_ID,
    },
    properties: {
      title: notionFaker.page.properties.title()()(),
    },
  });

  TEST_PAGE_ID = testPageId;

  const {id: relationDatabaseId} = await notion.databases.create({
    parent: {
      page_id: testPageId,
    },
    title: notionFaker.database.title()()(),
    properties: {
      title: notionFaker.database.properties.title(),
    },
  });

  const {id: testDatabaseId} = await notion.databases.create({
    parent: {
      page_id: testPageId,
    },
    title: notionFaker.database.title()()(),
    properties: {
      title: notionFaker.database.properties.title(),
      rich_text: notionFaker.database.properties.rich_text(),
      number: notionFaker.database.properties.number(),
      select: notionFaker.database.properties.select(),
      multi_select: notionFaker.database.properties.multi_select(),
      date: notionFaker.database.properties.date(),
      files: notionFaker.database.properties.files(),
      checkbox: notionFaker.database.properties.checkbox(),
      url: notionFaker.database.properties.url(),
      email: notionFaker.database.properties.email(),
      phone_number: notionFaker.database.properties.phone_number(),
      formula: notionFaker.database.properties.formula(),
      relation: notionFaker.database.properties.relation({
        database_id: relationDatabaseId,
      }),
      rollup: notionFaker.database.properties.rollup({
        rollup_property_name: 'title',
        relation_property_name: 'relation',
        function: 'count',
      }),
      people: notionFaker.database.properties.people(),
      created_by: notionFaker.database.properties.created_by(),
      created_time: notionFaker.database.properties.created_time(),
      last_edited_by: notionFaker.database.properties.last_edited_by(),
      last_edited_time: notionFaker.database.properties.last_edited_time(),
    },
  });

  const {properties: scheme} = await notion.databases.retrieve({
    database_id: testDatabaseId,
  });

  await notion.pages.create({
    parent: {
      database_id: testDatabaseId,
    },
    properties: notionFaker.page.properties.propertiesByScheme(scheme),
  });

  response = await notion.databases.query({
    database_id: testDatabaseId,
  });
}, TIMEOUT);

describe('NotionParser.database.getRows', () => {
  it(
    'return parsed rows',
    async () => {
      const rows = notionParser.database.getRows(response.results);

      const columns = [
        'title',
        'rich_text',
        'number',
        'select',
        'multi_select',
        'date',
        'files',
        'checkbox',
        'url',
        'email',
        'phone_number',
        'formula',
        'relation',
        'rollup',
        'people',
        'created_by',
        'created_time',
        'last_edited_by',
        'last_edited_time',
      ];

      for (const row of rows) {
        for (const column of columns) {
          expect(row).toHaveProperty(column);

          if (arrayIncludes(Database.SUPPORTED_PROPERTIES, column)) {
            expect(typeof row[column]).toBe('string');
          } else {
            expect(row[column]).toBeNull();
          }
        }
      }
    },
    TIMEOUT,
  );
});

afterAll(async () => {
  await notion.blocks.delete({
    block_id: TEST_PAGE_ID,
  });
});
