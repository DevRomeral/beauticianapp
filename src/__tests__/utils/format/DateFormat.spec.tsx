import {
  UndefinedTime,
  getDateDay,
  getDateTime,
  getDateValueAsString,
  getDateValueFromString,
} from '@/utils/format/DateFormat';

describe('DateFormat', () => {
  it('getDateTime works given a valid date', () => {
    const hours = 12;
    const minutes = 34;
    const date = new Date(2024, 5, 20, hours, minutes);
    expect(getDateTime(date)).toBe(`${hours}:${minutes}`);
  });

  it('getDateTime returns a default value if not date provided', () => {
    expect(getDateTime(null)).toBe(UndefinedTime);
    expect(getDateTime(undefined)).toBe(UndefinedTime);
  });

  it('getDateDay returns a valid date format', () => {
    expect(getDateDay(new Date(2024, 11, 1))).toBe('1 diciembre');
  });

  it('should transform input date values correctly', () => {
    const day = 31;
    const month = 12;
    const year = 2024;
    const emptyResult = '';
    const expectedResult = `${year}-${month}-${day}`;
    const date = new Date(year, month - 1, day);

    expect(getDateValueAsString(null)).toBe(emptyResult);
    expect(getDateValueAsString(undefined)).toBe(emptyResult);

    const result = getDateValueAsString(date);
    expect(result).toBe(expectedResult);

    const emptyDate = new Date();
    const emptyDateResult = getDateValueFromString('');
    expect(emptyDateResult.getDay()).toBe(emptyDate.getDay());
    expect(emptyDateResult.getMonth()).toBe(emptyDate.getMonth());
    expect(emptyDateResult.getFullYear()).toBe(emptyDate.getFullYear());

    const restoredResult = getDateValueFromString(result);
    expect(restoredResult.getDay()).toBe(date.getDay());
    expect(restoredResult.getMonth()).toBe(date.getMonth());
    expect(restoredResult.getFullYear()).toBe(date.getFullYear());
  });
});
