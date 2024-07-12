'use client';

import { getDateTimeValueAsString } from '@/utils/format/DateFormat';

import BaseDateField, { BaseDateFieldProps } from './BaseDateField';

export interface DateTimeFieldProps extends Omit<BaseDateFieldProps, 'type' | 'formatValue'> {}

const DateTimeField: React.FC<DateTimeFieldProps> = (props) => {
  return <BaseDateField {...props} type="datetime-local" formatValue={getDateTimeValueAsString} />;
};

export default DateTimeField;
