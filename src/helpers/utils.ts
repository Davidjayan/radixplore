export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const getFormattedResult = (unitType: string, value: number) => {
  if (unitType === "CELCIUS") {
    return kelvinToCelsius(value);
  } else {
    return kelvinToFahrenheit(value);
  }
};

export function kelvinToCelsius(kelvin: number) {
  return (kelvin - 273.15).toFixed(2) + "C";
}
export function kelvinToFahrenheit(kelvin: number) {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2) + "F";
}
