/**
 * Formats a date time
 * @returns string with the time of the date (e.g.: '12:34')
 */
export function getDateTime(date: Date | null | undefined): string {
  if (date === undefined || date === null) return '--:--';

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
