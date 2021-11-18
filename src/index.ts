import * as Database from './database';

export interface NotionParserOptions {
  propertyOptions: Partial<Database.PropertyOptions>;
}

export interface INotionParser {
  database: {
    getRows: Database.GetRows;
  };
}
export class NotionParser {
  public database: INotionParser['database'];

  public constructor(options?: Partial<NotionParserOptions>) {
    const {propertyOptions} = options ?? {};

    this.database = {
      getRows: Database.getRows(propertyOptions),
    };
  }
}
