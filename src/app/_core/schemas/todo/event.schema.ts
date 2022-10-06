export interface TodoEvent {
	id: number;
	title: string;
	description: string;
	start_at: string;
	end_at: string;
	location_name: string;
	location_address: string;
	all_day: boolean;
	all_day_date?: any;
	created_at: string;
	updated_at: string;
	workflow_state: string;
	context_code: string;
	child_events_count: number;
	child_events: any[];
	parent_event_id?: any;
	hidden: boolean;
	url: string;
	html_url: string;
}
