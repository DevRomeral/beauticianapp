export const UndefinedTime = '--:--';

/**
 * Formats a date time
 * @returns string with the time of the date (e.g.: '12:34')
 */
export function getDateTime(date: Date | null | undefined): string {
  if (date === undefined || date === null) return UndefinedTime;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Obtiene el día dado una fecha
 * @returns Fecha en formato día y mes: (ejemplo: 12 enero)
 */
export function getDateDay(date: Date | null | undefined): string {
  if (date === undefined || date === null) return '';

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat('es-ES', options).format(date).replace(' de ', ' ');
}
