import { Assignment } from "../assignment/assignment.schema";

export interface TodoAssignment {
	title?: string; // honestly idk this appears sometimes
	type: string; // grading|submitting
	ignore: string; // URL -> DELETE request
	ignore_permanently: string;
	html_url: string;
	context_type: string; // course|group
	course_id: number;
	assignment?: Assignment;
	quiz?: any;
}
