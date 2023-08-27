import React from "react";
import { FormInputField, FormTextAreaField } from "../../../types";

export default function QuizTextField(props: {
	field: FormInputField | FormTextAreaField;
	setFieldValue: Function;
	progressValue: string;
	keyUpAction: Function;
	disabled?: boolean;
}) {
	return (
		<>
			<textarea
				autoFocus={true}
				id={props.field.label}
				disabled={props.disabled || false}
				value={props.progressValue}
				autoComplete="off"
				onChange={(e) =>
					props.setFieldValue(props.field.field_id, e.target.value)
				}
				className="border-2 border-gray-200 rounded-lg p-2 w-full min-h-[143px]"
			/>
		</>
	);
}
