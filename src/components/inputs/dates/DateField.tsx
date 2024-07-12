'use client';

import { getDateValueAsString } from '@/utils/format/DateFormat';

import BaseDateField, { BaseDateFieldProps } from './BaseDateField';

export interface DateFieldProps extends Omit<BaseDateFieldProps, 'type' | 'formatValue'> {}

const DateField: React.FC<DateFieldProps> = (props) => {
  return <BaseDateField {...props} type="date" formatValue={getDateValueAsString} />;
};

export default DateField;
