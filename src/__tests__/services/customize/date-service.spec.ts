import { getDateTime } from '@/services/customize/date-service';

describe('date-time', () => {
  const noDateProvidedResult = '--:--';

  it('getDateTime works given a valid date', () => {
    const hours = 12;
    const minutes = 34;
    // Test case 1: Valid date
    const date1 = new Date(2024, 5, 20, hours, minutes);
    expect(getDateTime(date1)).toBe(`${hours}:${minutes}`);
  });

  it('getDateTime returns a default value if not date provided', () => {
    expect(getDateTime(null)).toBe(noDateProvidedResult);
    expect(getDateTime(undefined)).toBe(noDateProvidedResult);
  });
});
