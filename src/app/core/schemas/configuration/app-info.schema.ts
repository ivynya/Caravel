
export interface AppInfo {
  version: string,
  previous: string,
  requiresRefresh: boolean,
  updateInfo: {
    title: string,
    desc: string,
    features?: string[],
    stage?: string
  }[]
}