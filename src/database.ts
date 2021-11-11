import type {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';
import {ValueOf} from 'type-fest';
import {ArrayElement} from './util-types/array-element';
import {escape, formatDate} from './utils';

export type PropertyValues = ValueOf<
  ArrayElement<QueryDatabaseResponse['results']>['properties']
>;

export type PropertyType = PropertyValues['type'];

export type PropertyValue<PropertyKey extends PropertyType> = Extract<
  PropertyValues,
  {type: PropertyKey}
>;

export const SUPPORTED_PROPERTIES: PropertyType[] = [
  'title',
  'rich_text',
  'number',
  'select',
  'multi_select',
  'date',
  // 'files',
  'checkbox',
  'url',
  'email',
  'phone_number',
  // 'formula',
  // 'relation',
  // 'rollup',
  // 'people',
  // 'created_by',
  'created_time',
  // 'last_edited_by',
  'last_edited_time',
];

export type PropertyOptions = {
  date: {
    timeZone?: string;
    format?: string;
  };
};

export const title = (value: PropertyValue<'title'>) =>
  value.title.map(({plain_text}) => plain_text).join('');

export const rich_text = (value: PropertyValue<'rich_text'>) =>
  value.rich_text.map(({plain_text}) => plain_text).join('');

export const number = ({number}: PropertyValue<'number'>) => number;

export const select = ({select}: PropertyValue<'select'>) => select?.name ?? '';

export const multi_select = ({multi_select}: PropertyValue<'multi_select'>) =>
  multi_select.at(0)?.name ?? '';

export const date =
  (options?: PropertyOptions['date']) =>
  ({date}: PropertyValue<'date'>) =>
    date?.end
      ? `${formatDate(date.start, options)} ~ ${formatDate(date.end, options)}`
      : `${formatDate(date.start, options)}`;

// Unsupported

// export const files = ({files}: PropertyValue<'files'>) => files;

export const checkbox = ({checkbox}: PropertyValue<'checkbox'>) =>
  checkbox ? ':white_check_mark:' : ':x:';

export const url = ({url}: PropertyValue<'url'>) => url;

export const email = ({email}: PropertyValue<'email'>) => email;

export const phone_number = ({phone_number}: PropertyValue<'phone_number'>) =>
  phone_number;

// Unsupported

// export const formula = ({formula}: PropertyValue<'formula'>) => formula;

// export const relation = ({relation}: PropertyValue<'relation'>) => relation;

// export const rollup = ({rollup}: PropertyValue<'rollup'>) => rollup;

// export const people = ({people}: PropertyValue<'people'>) => people;

// export const created_by = ({created_by}: PropertyValue<'created_by'>) =>
//   created_by;

export const created_time =
  (options?: PropertyOptions['date']) =>
  ({created_time}: PropertyValue<'created_time'>) =>
    formatDate(created_time, options);

// Unsupported

// export const last_edited_by = ({
//   last_edited_by,
// }: PropertyValue<'last_edited_by'>) => last_edited_by;

export const last_edited_time =
  (options?: PropertyOptions['date']) =>
  ({last_edited_time}: PropertyValue<'last_edited_time'>) =>
    formatDate(last_edited_time, options);

export const properties =
  (options?: Partial<PropertyOptions>) => (value: PropertyValues) => {
    switch (value.type) {
      case 'title':
        return title(value);
      case 'rich_text':
        return rich_text(value);
      case 'number':
        return number(value).toString();
      case 'select':
        return select(value);
      case 'multi_select':
        return multi_select(value);
      case 'date':
        return date(options?.date)(value);
      // Unsupported
      //
      // case 'files':
      //   return files(value);
      case 'checkbox':
        return checkbox(value);
      case 'url':
        return url(value);
      case 'email':
        return email(value);
      case 'phone_number':
        return phone_number(value);
      // Unsupported
      //
      // case 'formula':
      //   return formula(value);
      // case 'relation':
      //   return relation(value);
      // case 'rollup':
      //   return rollup(value);
      // case 'people':
      //   return people(value);
      // case 'created_by':
      //   return created_by(value);
      case 'created_time':
        return created_time(options?.date)(value);
      // Unsupported
      //
      // Case 'last_edited_by':
      //   return last_edited_by(value);
      case 'last_edited_time':
        return last_edited_time(options?.date)(value);
      default:
        return null;
    }
  };

export type GetRows = (
  results: QueryDatabaseResponse['results'],
) => Array<Record<string, string | null>>;

export const getRows =
  (options?: Partial<PropertyOptions>): GetRows =>
  (results) =>
    results
      .map(({properties}) => properties)
      .map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, propertyValue]) => {
            const value = properties(options)(propertyValue);

            return [key, value ? escape(value) : value];
          }),
        ),
      );
