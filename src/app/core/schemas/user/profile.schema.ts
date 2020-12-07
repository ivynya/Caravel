
export interface Profile {
  id: number
  name: string
  pronouns: string
  short_name: string
  sortable_name: string
  title: string | null
  bio: string | null
  primary_email: string
  login_id: string
  sis_user_id: string
  lti_user_id: string | null
  avatar_url: string
  calendar: { ics?: string } | null
  time_zone: string
  locale: string | null
}