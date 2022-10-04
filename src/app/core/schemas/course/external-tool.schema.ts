// Schema for an EXTERNALTOOL or LTI object.
// Not useful without extra JS/TS to launch the LTI.
export interface ExternalTool {
	id: number;
	domain: string;
	url: string;
	consumer_key: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	privacy_level: string;
	custom_fields: any;
	is_rce_favorite: boolean;
	account_navigation: {
		canvas_icon_class: string;
		icon_url: string;
		text: string;
		url: string;
		label: string;
		selection_width: number;
		selection_height: number;
	} | null;
	assignment_selection: null;
	course_home_sub_navigation: null;
	course_navigation: {
		canvas_icon_class: string;
		icon_url: string;
		text: string;
		url: string;
		label: string;
		default: string;
		enabled: boolean;
		visibility: string;
		windowTarget: string;
	} | null;
	editor_button: {
		canvas_icon_class: string;
		icon_url: string;
		text: string;
		url: string;
		label: string;
		selection_width: number;
		selection_height: number;
		message_type: any;
	} | null;
	homework_submission: null;
	link_selection: null;
	migration_selection: null;
	resource_selection: null;
	tool_configuration: null;
	user_navigation: null;
	selection_width: number;
	selection_height: number;
	icon_url: string;
	not_selectable: boolean;
}

export interface SessionlessLaunch {
	id: string;
	name: string;
	url: string;
}
