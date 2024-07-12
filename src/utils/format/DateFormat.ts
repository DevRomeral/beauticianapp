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

export function getDateValueAsString(date: Date | null | undefined): string {
  if (date == undefined || date == null) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDateTimeValueAsString(date: Date | null | undefined): string {
  if (date == undefined || date == null) return '';

  const day = getDateValueAsString(date);

  const hour = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${day}T${hour}:${mins}`;
}

export function getDateValueFromString(localDateString: string): Date {
  if (!localDateString) return new Date();

  const localDate = new Date(localDateString);
  const utcDate = new Date(Date.UTC(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate()));

  return utcDate;
}

export function getDateTimeValueFromString(localDateString: string): Date {
  if (!localDateString) return new Date();

  const localDate = new Date(localDateString);
  const utcDate = new Date(
    Date.UTC(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes(),
    ),
  );

  // console.log(
  //   `${utcDate.getUTCDate()}/${utcDate.getMonth() + 1}/${utcDate.getUTCFullYear()}, ${utcDate.getUTCHours()}:${utcDate.getUTCMinutes()}`,
  // );
  return utcDate;
}

export function getAge(date: Date) {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
}

export function printTime(minutes: number): string {
  if (minutes <= 0) return '';

  const hours = minutes / 60;
  const remainingMins = minutes % 60;

  const stringMins = `${remainingMins}min`;

  if (hours >= 1) return `${hours.toFixed(0)}h ${stringMins}`;

  return stringMins;
}
