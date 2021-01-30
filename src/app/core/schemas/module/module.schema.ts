
export interface Module {
  // the unique identifier for the module
  id: number,
  // the state of the module: 'active', 'deleted'
  workflow_state: string,
  // the position of this module in the course (1-based)
  position: number,
  // the name of this module
  name: string,
  // (Optional) the date this module will unlock
  unlock_at: string,
  // Whether module items must be unlocked in order
  require_sequential_progress: boolean,
  // IDs of Modules that must be completed before this one is unlocked
  prerequisite_module_ids: number[],
  // The number of items in the module
  items_count: number,
  // The API URL to retrive this module's items
  items_url: string,
  // The contents of this module, as an array of Module Items. (Present only if
  // requested via include[]=items AND the module is not deemed too large by
  // Canvas.)
  items: any[],
  // The state of this Module for the calling user one of 'locked', 'unlocked',
  // 'started', 'completed' (Optional; present only if the caller is a student or
  // if the optional parameter 'student_id' is included)
  state: string,
  // the date the calling user completed the module (Optional; present only if the
  // caller is a student or if the optional parameter 'student_id' is included)
  completed_at: string,
  // if the student's final grade for the course should be published to the SIS
  // upon completion of this module
  publish_final_grade: any,
  // (Optional) Whether this module is published. This field is present only if
  // the caller has permission to view unpublished modules.
  published: boolean
}

export interface ModuleItem {
  // the unique identifier for the module item
  id: number,
  // the id of the Module this item appears in
  module_id: number,
  // the position of this item in the module (1-based)
  position: number,
  // the title of this item
  title: string,
  // 0-based indent level; module items may be indented to show a hierarchy
  indent: number,
  // the type of object referred to one of 'File', 'Page', 'Discussion',
  // 'Assignment', 'Quiz', 'SubHeader', 'ExternalUrl', 'ExternalTool'
  type: string,
  // the id of the object referred to applies to 'File', 'Discussion',
  // 'Assignment', 'Quiz', 'ExternalTool' types
  content_id: number,
  // link to the item in Canvas
  html_url: string,
  // (Optional) link to the Canvas API object, if applicable
  url: string,
  // (only for 'Page' type) unique locator for the linked wiki page
  page_url: string,
  // (only for 'ExternalUrl' and 'ExternalTool' types) external url that the item
  // points to
  external_url: string,
  // (only for 'ExternalTool' type) whether the external tool opens in a new tab
  new_tab: boolean,
  // Completion requirement for this module item
  completion_requirement: {
    type: string,
    min_score: number,
    completed: boolean
  },
  // (Present only if requested through include[]=content_details) If applicable,
  // returns additional details specific to the associated object
  content_details: {
    points_possible: number,
    due_at: string,
    unlock_at: string,
    lock_at: string
  },
  // (Optional) Whether this module item is published. This field is present only
  // if the caller has permission to view unpublished items.
  published: boolean
}