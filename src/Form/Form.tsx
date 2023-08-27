import { Link, navigate } from "raviger";
import React, { useEffect, useReducer } from "react";
import { FormDetails, FormField, NewField } from "../types";
import AddField from "./AddField";
import Field from "./Fields/Field";
import {
	fetchFormData,
	getRandomID,
	updateFormAndFetch,
	useEffectOnlyOnce,
} from "./utils";

type SetFormDataAction = {
	type: "setFormData";
	form: FormDetails;
};

type AddFieldAction = {
	type: "addField";
	newFieldData: NewField;
};

type RemoveFieldAction = {
	type: "removeField";
	field_id: number;
};

type SetFieldValueAction = {
	type: "setFieldValue";
	fieldId: number;
	fieldValue: string;
};

type ClearAllFieldsAction = {
	type: "clearAllFields";
};

type SetTitleAction = {
	type: "setTitle";
	title: string;
};

type SetNewFieldDetailAction = {
	type: "setNewFieldDetail";
	changeType: "label" | "type";
	changeValue: string;
};

type AddNewOptionAction = {
	type: "addNewOption";
	fieldId: number;
};

type RemoveOptionAction = {
	type: "removeOption";
	fieldId: number;
	optionId: number;
};

type SetOptionLabelAction = {
	type: "setOptionLabel";
	fieldId: number;
	optionId: number;
	label: string;
};

type FormAction =
	| SetFormDataAction
	| AddFieldAction
	| RemoveFieldAction
	| SetFieldValueAction
	| ClearAllFieldsAction
	| SetTitleAction
	| AddNewOptionAction
	| RemoveOptionAction
	| SetOptionLabelAction;

type NewFieldAction = SetNewFieldDetailAction;

function Form(props: { formID: number }) {
	const [newFieldData, newFieldDispacher] = useReducer(newFieldReducer, {
		label: "",
		type: "text",
	});

	function formDataReducer(
		formData: FormDetails,
		action: FormAction
	): FormDetails {
		if (formData.form_id === 0 && action.type !== "setFormData")
			return formData;
		switch (action.type) {
			case "setFormData":
				return action.form;

			case "addField":
				if (action.newFieldData.label === "" || !formData)
					return formData;

				let updatedFormData: FormDetails = { ...formData };

				if (
					action.newFieldData.type === "text" ||
					action.newFieldData.type === "number" ||
					action.newFieldData.type === "email" ||
					action.newFieldData.type === "password" ||
					action.newFieldData.type === "date" ||
					action.newFieldData.type === "time"
				)
					updatedFormData.fields.push({
						field_id: getRandomID(),
						label: action.newFieldData.label,
						type: action.newFieldData.type,
						kind: "input",
						value: "",
					});
				else if (action.newFieldData.type === "textarea")
					updatedFormData.fields.push({
						field_id: getRandomID(),
						label: action.newFieldData.label,
						kind: "textarea",
						type: "textarea",
						value: "",
					});
				else if (
					action.newFieldData.type === "checkbox" ||
					action.newFieldData.type === "radio" ||
					action.newFieldData.type === "select" ||
					action.newFieldData.type === "multi-select"
				)
					updatedFormData.fields.push({
						field_id: getRandomID(),
						label: action.newFieldData.label,
						type: action.newFieldData.type,
						kind: "options",
						value: "",
						options: [],
					});
				else if (action.newFieldData.type === "rating")
					updatedFormData.fields.push({
						field_id: getRandomID(),
						label: action.newFieldData.label,
						kind: "rating",
						type: "rating",
						value: "",
					});

				newFieldDispacher({
					type: "setNewFieldDetail",
					changeType: "label",
					changeValue: "",
				});
				return updatedFormData;

			case "removeField":
				let updatedFormDataRemoved = { ...formData };
				updatedFormDataRemoved.fields =
					updatedFormDataRemoved.fields.filter(
						(field: FormField) => field.field_id !== action.field_id
					);
				return updatedFormDataRemoved;
			case "setFieldValue":
				let updatedFormDataSet = formData.fields.map((field) => {
					if (field.field_id === action.fieldId) {
						return {
							...field,
							...{ label: action.fieldValue, value: "" },
						};
					}
					return field;
				});
				return { ...formData, fields: updatedFormDataSet };

			case "clearAllFields":
				return { ...formData, fields: [] };

			case "setTitle":
				formData.title = action.title;
				return formData;

			case "addNewOption":
				let updatedFormDataField: FormDetails = { ...formData };
				updatedFormDataField.fields = updatedFormDataField.fields.map(
					(field) => {
						if (
							field.field_id === action.fieldId &&
							field.kind === "options"
						) {
							return {
								...field,
								...{
									options: [
										...field.options,
										{
											option_id: getRandomID(),
											label: "",
											selected: false,
										},
									],
								},
							};
						}
						return field;
					}
				);
				return updatedFormDataField;

			case "removeOption":
				let updatedFormDataRemove: FormDetails = { ...formData };
				updatedFormDataRemove.fields = updatedFormDataRemove.fields.map(
					(field) => {
						if (
							field.field_id === action.fieldId &&
							field.kind === "options"
						) {
							return {
								...field,
								...{
									options: field.options.filter(
										(option) =>
											option.option_id !== action.optionId
									),
								},
							};
						}
						return field;
					}
				);
				return updatedFormDataRemove;

			case "setOptionLabel":
				let updatedFormDatOptLbl: FormDetails = { ...formData };
				updatedFormDatOptLbl.fields = updatedFormDatOptLbl.fields.map(
					(field) => {
						if (
							field.field_id === action.fieldId &&
							field.kind === "options"
						) {
							return {
								...field,
								...{
									options: field.options.map((option) => {
										if (
											option.option_id === action.optionId
										) {
											return {
												...option,
												...{ label: action.label },
											};
										}
										return option;
									}),
								},
							};
						}
						return field;
					}
				);
				return updatedFormDatOptLbl;
		}
	}

	function newFieldReducer(newFieldData: NewField, action: NewFieldAction) {
		switch (action.type) {
			case "setNewFieldDetail":
				if (action.changeType === "type")
					return { ...newFieldData, type: action.changeValue };
				else return { ...newFieldData, label: action.changeValue };
		}
	}

	const [formData, formDataDispacher] = useReducer(formDataReducer, {
		form_id: 0,
		title: "",
		fields: [],
	});

	useEffectOnlyOnce(() => {
		async function fetchData() {
			let newFormData = await fetchFormData(props.formID);
			if (props.formID === -1) navigate(`/forms/${newFormData.form_id}`);
			formDataDispacher({ type: "setFormData", form: newFormData });
		}
		fetchData();
	});

	useEffect(() => {
		setTimeout(async () => {
			if (formData.form_id !== 0) {
				await updateFormAndFetch(formData);
			}
		}, 5000);
	}, [formData, props.formID]);

	return (
		<div className="p-6 mx-auto bg-white shadow-lg rounded-xl items-center">
			<input
				type="text"
				defaultValue={formData?.title}
				className="py-2 px-4 pb-2 w-full text-center text-xl items-center font-semibold border-2 border-gray-200 rounded-lg"
				onChange={(e) => {
					formDataDispacher({
						type: "setTitle",
						title: e.target.value,
					});
				}}
			/>
			<div className="pb-4"></div>
			<div className="px-4 w-full">
				{formData?.fields.map((field) => (
					<Field
						field={field}
						removeField={(field_id: number) =>
							formDataDispacher({
								type: "removeField",
								field_id,
							})
						}
						setFieldValue={(field_id: number, fieldValue: string) =>
							formDataDispacher({
								type: "setFieldValue",
								fieldId: field_id,
								fieldValue,
							})
						}
						key={field.field_id}
						addNewOption={(fieldId: number) =>
							formDataDispacher({
								type: "addNewOption",
								fieldId,
							})
						}
						removeOption={(field_id: number, option_id: number) =>
							formDataDispacher({
								type: "removeOption",
								fieldId: field_id,
								optionId: option_id,
							})
						}
						setOptionValue={(
							fieldId: number,
							optionId: number,
							label: string
						) =>
							formDataDispacher({
								type: "setOptionLabel",
								fieldId,
								optionId,
								label,
							})
						}
					/>
				))}
				<AddField
					addField={() => {
						formDataDispacher({
							type: "addField",
							newFieldData,
						});
					}}
					newFieldData={newFieldData}
					setNewFieldDetail={(
						changeType: "label" | "type",
						changeValue: string
					) =>
						newFieldDispacher({
							type: "setNewFieldDetail",
							changeType,
							changeValue,
						})
					}
				/>
				<div className="p-2"></div>
				<input
					type="button"
					onClick={async (e) => {
						await updateFormAndFetch(formData);
						(e.target as HTMLInputElement).value = "Saved!";
						setTimeout(() => {
							(e.target as HTMLInputElement).value = "Save";
						}, 1000);
					}}
					value="Save"
					className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<input
					type="button"
					value="Clear"
					onClick={(e) => {
						formDataDispacher({ type: "clearAllFields" });
						(e.target as HTMLInputElement).value = "Cleared!";
						setTimeout(() => {
							(e.target as HTMLInputElement).value = "Clear";
						}, 1000);
					}}
					className="cursor-pointer w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
				/>
				<div className="p-1"></div>
				<Link
					href="/forms"
					onClick={async () => {
						await updateFormAndFetch(formData);
					}}
					className="text-center block cursor-pointer w-full bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg"
				>
					Close
				</Link>
			</div>
		</div>
	);
}

export default Form;
