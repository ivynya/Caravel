
export interface Configuration {
  // Display name of config value
  name: string,
  // Determines if display slider, boolean, etc.
  type: string,
  // Default value of config
  default: number
  // Actual value of config
  value: number
  // Units of config (ex: seconds)
  unit: string
}