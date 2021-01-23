
export interface Configuration {
  [scope: string]: {
    [key: string]: Configurable
  }
}

export interface Configurable {
  // Display name of config value
  name: string,
  // Determines if display toggle, slider, etc.
  type: string,
  // Default value of config
  default: boolean
  // Actual value of config
  value: boolean
}