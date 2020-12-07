
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