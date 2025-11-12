/**
 * Converts a number to Roman numerals
 */
export function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return num.toString();
  
  const values: number[] = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals: string[] = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const numeral = numerals[i];
    if (value !== undefined && numeral !== undefined) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
  }
  return result;
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Add ordinal suffix
  const ordinal = (n: number): string => {
    const s: string[] = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    const suffix = s[(v - 20) % 10] || s[v] || s[0];
    return n + (suffix || 'th');
  };
  
  return `${month} ${ordinal(day)}, ${year}`;
}

