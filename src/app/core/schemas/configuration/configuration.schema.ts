
export interface Configuration {
  [scope: string]: {
    [key: string]: Configurable
  }
}

export interface Configurable<T = any> {
  // Display name of config value
  name: string,
  // Determines if display toggle, slider, etc.
  type: string,
  // Default value of config
  default: T,
  // Actual value of config
  value: T,
  // If type "select", these are valid options
  options?: string[]
}