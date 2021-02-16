
export interface PlannerItem {
  context_type: string, // course|group
  course_id: number,
  plannable_id: number,
  planner_override?: PlannerOverride,
  plannable_type: string, // assignment|discussion_topic|planner_note|wiki_page|calendar_event
  new_activity: boolean,
  submissions: {
    submitted: boolean,
    excused: boolean,
    graded: boolean,
    late: boolean,
    missing: boolean,
    needs_grading: boolean,
    has_feedback: boolean
  },
  plannable_date: string, // UTC date
  plannable: any | PlannerNote, // Assignment|DiscussionTopic|PlannerNote
  html_url: string,
  context_name: string,
  context_image: string // image url
}

export interface PlannerNote {
  // The ID of the planner note
  id: number,
  // The title for a planner note
  title: string,
  // The description of the planner note
  description: string,
  // The id of the associated user creating the planner note
  user_id: number,
  // The current published state of the planner note
  workflow_state: string,
  // The course that the note is in relation too, if applicable
  course_id: number,
  // The datetime of when the planner note should show up on their planner
  todo_date: string,
  // the type of the linked learning object
  linked_object_type: string,
  // the id of the linked learning object
  linked_object_id: number,
  // the Canvas web URL of the linked learning object
  linked_object_html_url: string,
  // the API URL of the linked learning object
  linked_object_url: string
}

// User controlled setting
export interface PlannerOverride {
  // The ID of the planner override
  id: number,
  // The type of the associated object for the planner override
  plannable_type: string,
  // The id of the associated object for the planner override
  plannable_id: number,
  // The id of the associated user for the planner override
  user_id: number,
  // The id of the plannable's associated assignment, if it has one
  assignment_id: number,
  // The current published state of the item, synced with the associated object
  workflow_state: string,
  // Controls whether or not the associated plannable item is marked complete on
  // the planner
  marked_complete: boolean,
  // Controls whether or not the associated plannable item shows up in the
  // opportunities list
  dismissed: boolean,
  // The datetime of when the planner override was created
  created_at: string,
  // The datetime of when the planner override was updated
  updated_at: string,
  // The datetime of when the planner override was deleted, if applicable
  deleted_at: string
}