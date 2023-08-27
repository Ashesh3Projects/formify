import React from "react";
import { Rating } from "react-simple-star-rating";
import { FormField } from "../../../types";
import QuizInputField from "../Fields/QuizInputField";
import QuizOptionField from "../Fields/QuizOptionField";
import QuizTextField from "../Fields/QuizTextField";

function AttemptField(props: { field: FormField }) {
	return (
		<div key={props.field.field_id} className="pb-2">
			<label
				htmlFor={props.field.label}
				className="pb-2 font-semibold text-sm"
			>
				{props.field.label}
			</label>
			<div className="flex gap-2">
				{((field: FormField) => {
					switch (field.kind) {
						case "input":
							return (
								<QuizInputField
									field={field}
									progressValue={field.value || ""}
									keyUpAction={() => {}}
									setFieldValue={() => {}}
									disabled={true}
								/>
							);
						case "textarea":
							return (
								<QuizTextField
									field={field}
									progressValue={field.value || ""}
									keyUpAction={() => {}}
									setFieldValue={() => {}}
									disabled={true}
								/>
							);
						case "options":
							return (
								<QuizOptionField
									field={field}
									keyUpAction={() => {}}
									setFieldValue={() => {}}
									disabled={true}
									selectedOptions={field.options.map((o) =>
										o.selected ? o.option_id : -1
									)}
									setFieldValueOption={() => {}}
									selectedValue={field.value}
								/>
							);
						case "rating":
							return (
								<Rating
									ratingValue={Number(field.value) || 0}
									readonly={true}
								/>
							);
					}
				})(props.field)}
				{/* <input
					type={
						props.field.type === "password"
							? "text"
							: props.field.type
					}
					id={props.field.label}
					value={props.field.value}
					disabled={true}
					className="border-2 border-gray-200 rounded-lg p-2 w-full"
				/> */}
			</div>
		</div>
	);
}

export default AttemptField;
