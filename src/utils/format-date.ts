import {utcToZonedTime, format} from 'date-fns-tz';
import type {PropertyOptions} from '../database';

export const formatDate = (
  dateString: string,
  options?: PropertyOptions['date'],
) => {
  const {timeZone = 'Asia/Seoul', format: format_ = 'yyyy-MM-dd HH:mm:ss'} =
    options ?? {};

  return format(utcToZonedTime(new Date(dateString), timeZone), format_, {
    timeZone,
  });
};
