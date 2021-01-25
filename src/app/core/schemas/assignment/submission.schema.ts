
export interface Submission {
  // The submission's assignment id
  assignment_id: number,
  // The submission's assignment (see the assignments API) (optional)
  assignment?: any,
  // The submission's course (see the course API) (optional)
  course?: any,
  // This is the submission attempt number.
  attempt: number,
  // The content of the submission, if it was submitted directly in a text field.
  body: string;
  // The grade for the submission (a letter grade, for example).
  grade: string,
  // A boolean flag which is false if the student has re-submitted since.
  grade_matches_current_submission: boolean;
  // URL to the submission. This will require the user to log in.
  html_url: string;
  // URL to the submission preview. This will require the user to log in.
  preview_url: string,
  // The raw score
  score: number,
  // Associated comments for a submission (optional)
  submission_comments: any,
  // The types of submission ex: ('online_text_entry'|'online_url'|'online_upload'|'media_recording')
  submission_type: string,
  // The timestamp when the assignment was submitted
  submitted_at: string,
  // The URL of the submission (for 'online_url' submissions).
  url: string,
  // The id of the user who created the submission
  user_id: number,
  // The id of the user who graded the submission. This will be null for
  // submissions that haven't been graded yet. It will be a positive number if a
  // real user has graded the submission and a negative number if the submission
  // was graded by a process (e.g. Quiz autograder and autograding LTI tools). 
  // Specifically autograded quizzes set grader_id to the negative of the quiz id.
  // Submissions autograded by LTI tools set grader_id to the negative of the tool
  // id.
  grader_id: number,
  graded_at: string,
  // The submissions user (see user API) (optional)
  user?: any,
  // Whether the submission was made after the applicable due date
  late: false,
  // Whether the assignment is visible to the user who submitted the assignment.
  // Submissions where `assignment_visible` is false no longer count towards the
  // student's grade and the assignment can no longer be accessed by the student.
  // `assignment_visible` becomes false for submissions that do not have a grade
  // and whose assignment is no longer assigned to the student's section.
  assignment_visible: true,
  // Whether the assignment is excused.  Excused assignments have no impact on a
  // user's grade.
  excused: true,
  // Whether the assignment is missing.
  missing: true,
  // The status of the submission in relation to the late policy. Can be late,
  // missing, none, or null.
  late_policy_status: string,
  // The amount of points automatically deducted from the score by the
  // missing/late policy for a late or missing assignment.
  points_deducted: number,
  // The amount of time, in seconds, that an submission is late by.
  seconds_late: number,
  // The current state of the submission
  workflow_state: number,
  // Extra submission attempts allowed for the given user and assignment.
  extra_attempts: number,
  // The date this submission was posted, or nil if it has not been posted.
  posted_at?: string
}