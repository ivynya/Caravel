export interface Assignment {
	id: number;
	name: string;
	description: string; // HTML string
	created_at: string;
	updated_at: string;
	due_at: string;
	lock_at: string;
	unlock_at: string;
	has_overrides: boolean;
	course_id: number;
	html_url: string;
	url: string;
	submissions_download_url: string;
	assignment_group_id: number;
	due_date_required: boolean;
	allowed_extensions: string[];
	max_name_length: number;
	turnitin_enabled: boolean;
	vericite_enabled: boolean;
	turnitin_settings?: any;
	grade_group_students_individually: boolean;
	external_tool_tag_attributes?: any;
	peer_reviews: boolean;
	automatic_peer_reviews: boolean;
	peer_review_count: number;
	peer_reviews_assign_at: string;
	intra_group_peer_reviews: boolean;
	group_category_id: number;
	position: number;
	post_to_sis: boolean;
	integration_id: number;
	integration_data: { [id: string]: string };
	points_possible: number;
	// 'discussion_topic', 'online_quiz', 'on_paper', 'none', 'external_tool',
	// 'online_text_entry', 'online_url', 'online_upload' 'media_recording'
	submission_types: string[];
	has_submitted_submissions: boolean;
	grading_type: string; // 'pass_fail', 'percent', 'letter_grade', 'gpa_scale', 'points'
	grading_standard_id?: string; // grading_type is 'letter_grade' or 'gpa_scale'
	published: boolean;
	unpublishable: boolean;
	only_visible_to_overrides: boolean;
	locked_for_user: boolean;
	lock_info?: any;
	lock_explanation: string;
	quiz_id: number;
	anonymous_submissions: boolean;
	discussion_topic?: any;
	freeze_on_copy: boolean;
	frozen: boolean;
	frozen_attributes: string[];
	submission?: any;
	use_rubric_for_grading: boolean;
	rubric_settings: any;
	rubric?: any;
	assignment_visibility?: number[];
	overrides?: any;
	omit_from_final_grade: boolean;
	moderated_grading: boolean;
	grader_count: number;
	final_grader_id: number;
	grader_comments_visible_to_graders: boolean;
	graders_anonymous_to_graders: boolean;
	grader_names_visible_to_final_grader: boolean;
	anonymous_grading: boolean;
	allowed_attempts: number;
	post_manually: boolean;
	score_statistics?: any;
	can_submit: boolean;
}
