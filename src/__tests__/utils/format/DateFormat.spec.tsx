import { UndefinedTime, getDateDay, getDateTime } from '@/utils/format/DateFormat';

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

  it('getDateDay returns an empty string if not valid date provided', () => {
    expect(getDateDay(null)).toBe('');
    expect(getDateDay(undefined)).toBe('');
  });
});
