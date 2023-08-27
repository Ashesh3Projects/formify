import { navigate } from "raviger";
import React from "react";
import { FormField, OptionsField } from "../../types";
import QuizOptionField from "./Fields/QuizOptionField";
import QuizInputField from "./Fields/QuizInputField";
import QuizTextField from "./Fields/QuizTextField";
import { Rating } from "react-simple-star-rating";

function QuizField(props: {
	formID: number;
	qIndex: number;
	field: FormField;
	fieldLength: number;
	submitQuiz: Function;
	quizProgress?: FormField[];
	setFieldValue: Function;
	setFieldValueOption: Function;
}) {
	const keyUpAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (Number(props.qIndex) < props.fieldLength - 1)
				navigate(
					`/quiz/${props.formID}?qIndex=${Number(props.qIndex) + 1}`
				);
			else props.submitQuiz();
		}
	};
	return (
		<div key={props.field.field_id} className="pb-2">
			<div className="pb-2">
				<label
					htmlFor={props.field.label}
					className="pb-2 font-semibold text-sm"
				>
					{props.field.label}
				</label>
			</div>
			<div className="flex gap-2">
				{((field: FormField) => {
					switch (field.kind) {
						case "input":
							return (
								<QuizInputField
									field={field}
									progressValue={
										props.quizProgress?.find(
											(f) => f.field_id === field.field_id
										)?.value || ""
									}
									setFieldValue={props.setFieldValue}
									keyUpAction={keyUpAction}
								/>
							);
						case "textarea":
							return (
								<QuizTextField
									field={field}
									progressValue={
										props.quizProgress?.find(
											(f) => f.field_id === field.field_id
										)?.value || ""
									}
									setFieldValue={props.setFieldValue}
									keyUpAction={keyUpAction}
								/>
							);
						case "options":
							return (
								<QuizOptionField
									field={field}
									setFieldValue={props.setFieldValue}
									keyUpAction={keyUpAction}
									selectedValue={
										props.quizProgress?.find(
											(f) => f.field_id === field.field_id
										)?.value || ""
									}
									selectedOptions={
										(
											props.quizProgress?.find(
												(f) =>
													f.field_id ===
														field.field_id &&
													f.kind === "options"
											) as OptionsField
										)?.options.map((o) =>
											o.selected ? o.option_id : -1
										) || []
									}
									setFieldValueOption={
										props.setFieldValueOption
									}
								/>
							);

						case "rating":
							return (
								<div className="flex flex-row w-full">
									<Rating
										className="w-full"
										allowHalfIcon={true}
										onClick={(rate) => {
											props.setFieldValue(
												field.field_id,
												rate
											);
										}}
										ratingValue={
											Number(
												props.quizProgress?.find(
													(f) =>
														f.field_id ===
														field.field_id
												)?.value
											) || 0
										}
									/>
								</div>
							);
					}
				})(props.field)}
			</div>
		</div>
	);
}

export default QuizField;
