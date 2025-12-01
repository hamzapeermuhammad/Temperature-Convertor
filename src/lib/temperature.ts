export type Unit = 'C' | 'F' | 'K';

export function convertTemperature(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) {
    return value;
  }

  let celsiusValue: number;

  // First, convert the input value to Celsius
  switch (fromUnit) {
    case 'C':
      celsiusValue = value;
      break;
    case 'F':
      celsiusValue = (value - 32) * 5 / 9;
      break;
    case 'K':
      celsiusValue = value - 273.15;
      break;
  }

  // Then, convert from Celsius to the target unit
  let result: number;
  switch (toUnit) {
    case 'C':
      result = celsiusValue;
      break;
    case 'F':
      result = (celsiusValue * 9 / 5) + 32;
      break;
    case 'K':
      result = celsiusValue + 273.15;
      break;
  }
  
  // Return the raw value; formatting will be done in the component.
  return result;
}
