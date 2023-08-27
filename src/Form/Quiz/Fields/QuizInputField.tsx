import React from "react";
import { FormInputField, FormTextAreaField } from "../../../types";

export default function QuizInputField(props: {
	field: FormInputField | FormTextAreaField;
	setFieldValue: Function;
	progressValue: string;
	keyUpAction: Function;
	disabled?: boolean;
}) {
	return (
		<>
			<input
				autoFocus={true}
				disabled={props.disabled || false}
				type={props.field.type}
				id={props.field.label}
				value={props.progressValue}
				autoComplete="off"
				onChange={(e) =>
					props.setFieldValue(props.field.field_id, e.target.value)
				}
				onKeyUp={(e) => {
					props.keyUpAction(e);
				}}
				className="border-2 border-gray-200 rounded-lg p-2 w-full"
			/>
		</>
	);
}
