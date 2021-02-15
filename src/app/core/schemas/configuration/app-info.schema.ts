
export interface AppInfo {
  version: string,
  updateInfo: {
    title: string,
    desc: string,
    features?: string[],
    stage?: string
  }[]
}