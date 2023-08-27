import React from "react";
import { FormInputField, FormTextAreaField, RatingField } from "../../types";

export default function TextField(props: {
	field: FormInputField | FormTextAreaField | RatingField;
	setFieldValue: Function;
	removeField: Function;
}) {
	return (
		<div className="flex w-full">
			<div className="flex flex-col w-full rounded-lg p-2 border-4 gap-2 px-8">
				<div className="flex flex-col">
					<span className="text-sm text-gray-500 pb-1">
						Type: {props.field.type}
					</span>
				</div>
				<div className="flex gap-2">
					<input
						autoComplete="off"
						type="text"
						id={props.field.label}
						value={props.field.label}
						onChange={(e) =>
							props.setFieldValue(
								props.field.field_id,
								e.target.value
							)
						}
						className="border-2 border-gray-200 rounded-lg p-2 w-full"
					/>
					<input
						type="button"
						className="cursor-pointer font-bold bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-4"
						onClick={() => props.removeField(props.field.field_id)}
						value="Remove"
					/>
				</div>
			</div>
		</div>
	);
}
