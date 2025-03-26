export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isValidDateTime(dateTimeString: string): boolean {
  // Проверка по стандарту ISO 8601 (который использует $date-time)
  const regex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
  if (!regex.test(dateTimeString)) return false;

  // Дополнительная проверка через Date object
  const date = new Date(dateTimeString);
  return !isNaN(date.getTime());
}
