export type QuizAttempt = {
	attempt_id: number;
	date: Date;
	answers: FormField[];
	user: string;
};

export type FormInputField = {
	kind: "input";
	field_id: number;
	label: string;
	type: "text" | "number" | "email" | "password" | "date" | "time";
	value?: string;
};

export type FormTextAreaField = {
	kind: "textarea";
	type: "textarea";
	field_id: number;
	label: string;
	value?: string;
};

export type Option = {
	option_id: number;
	label: string;
	selected: boolean;
};

export type OptionsField = {
	kind: "options";
	field_id: number;
	label: string;
	type: "radio" | "checkbox" | "select" | "multi-select";
	options: Option[];
	value?: string;
};

export type RatingField = {
	kind: "rating";
	type: "rating";
	field_id: number;
	label: string;
	value?: string;
};

export type FormDetails = {
	form_id: number;
	title: string;
	fields: FormField[];
	attempts?: QuizAttempt[];
};

export type NewField = {
	label: string;
	type: string;
};

export type FormField =
	| FormInputField
	| FormTextAreaField
	| OptionsField
	| RatingField;
