
export interface C$Notification {
  msg: string,
  type: C$NotificationType
}

export enum C$NotificationType {
  Error,
  Warning,
  Info
}