// Schema for a COURSE object.
// Basically only the super top levels of courses.
export interface Course {
	id: number;
	sis_course_id: number | null;
	uuid: string;
	integration_id: string | null;
	sis_import_id: number;
	name: string;
	course_code: string;
	workflow_state: string;
	account_id: number;
	root_account_id: number;
	enrollment_term_id: number;
	grading_standard_id: number;
	grade_passback_setting: string;
	created_at: string;
	start_at: string;
	end_at: string;
	locale: string;
	enrollments: any; // See users enrolled
	total_students: number;
	calendar: string; // Link to an ICS file
	default_view: string;
	syllabus_body: string;
	needs_grading_count: number;
	term: null;
	course_progress: null;
	apply_assignment_group_weights: boolean;
	permissions: {
		create_discussion_topic: boolean;
		create_announcement: boolean;
	};
	is_public: boolean;
	is_public_to_auth_users: boolean;
	public_syllabus: boolean;
	public_syllabus_to_auth: boolean;
	public_description: string;
	storage_quota_mb: number;
	storage_quota_used_mb: number;
	hide_final_grades: boolean;
	license: string;
	allow_student_assignment_edits: boolean;
	allow_wiki_comments: boolean;
	allow_student_forum_attachments: boolean;
	open_enrollment: boolean;
	self_enrollment: boolean;
	restrict_enrollments_to_course_dates: boolean;
	course_format: string;
	access_restricted_by_date: boolean;
	time_zone: string;
	blueprint: boolean;
	blueprint_restrictions: {
		content: boolean;
		points: boolean;
		due_dates: boolean;
		availability_dates: boolean;
	};
	blueprint_restrictions_by_object_type: {
		assignment: { content: boolean; points: boolean };
		wiki_page: { content: boolean };
	};
}
