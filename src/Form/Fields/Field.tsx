import React from "react";
import { FormField } from "../../types";
import OptionField from "./OptionField";
import TextField from "./TextField";

function Field(props: {
	field: FormField;
	setFieldValue: Function;
	removeField: Function;
	addNewOption: Function;
	setOptionValue: Function;
	removeOption: Function;
}) {
	return (
		<div key={props.field.field_id} className="pb-3">
			<div className="flex gap-1">
				{((field: FormField) => {
					switch (field.kind) {
						case "input":
						case "textarea":
							return (
								<TextField
									field={field}
									setFieldValue={props.setFieldValue}
									removeField={props.removeField}
								/>
							);
						case "options":
							return (
								<OptionField
									field={field}
									setFieldValue={props.setFieldValue}
									removeField={props.removeField}
									addNewOption={props.addNewOption}
									setOptionValue={props.setOptionValue}
									removeOption={props.removeOption}
								/>
							);

						case "rating":
							return (
								<TextField
									field={field}
									setFieldValue={props.setFieldValue}
									removeField={props.removeField}
								/>
							);
					}
				})(props.field)}
			</div>
		</div>
	);
}

export default Field;
