
export interface Profile {
  id: number
  name: string
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

export interface TodoGeneric {
  type: string // grading|submitting
  ignore: string // URL -> DELETE request
  ignore_permanently: string
  html_url: string
  context_type: string // course|group
  course_id: number
  assignment?: any
  quiz?: any
}

// Can be type-casted to a more specific object later
// Based on 'type' property
export interface ActivityStreamGeneric {
  created_at: string
  updated_at: string
  id: number
  title: string
  message: string
  read_state: boolean
  context_type: string // course|group
  course_id: number
  group_id: number
  html_url: string
  type: string // one of below types
}

export interface DiscussionTopic extends ActivityStreamGeneric {
  discussion_topic_id: number
  total_root_discussion_entries: number
  require_initial_post: boolean
  user_has_posted: boolean
  root_discussion_entries: any
}

export interface Announcement extends ActivityStreamGeneric {
  announcement_id: number
  total_root_discussion_entries: number
  require_initial_post: boolean
  user_has_posted: boolean
  root_discussion_entries: any
}

export interface Conversation extends ActivityStreamGeneric {
  conversation_id: number
  private: boolean
  participant_count: number
}

export interface Message extends ActivityStreamGeneric {
  message_id: number
  notification_category: string
}

export interface Conference extends ActivityStreamGeneric {
  web_conference_id: number
}

export interface Collaboration extends ActivityStreamGeneric {
  collaboration_id: number
}

export interface AssessmentRequest extends ActivityStreamGeneric {
  assessment_request_id: number
}