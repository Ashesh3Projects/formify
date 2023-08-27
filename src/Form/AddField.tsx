import React from "react";
import { NewField } from "../types";

function AddField(props: {
	newFieldData: NewField;
	setNewFieldDetail: Function;
	addField: Function;
}) {
	return (
		<div className="flex gap-2 border-2 border-gray-200 rounded-lg p-2 my-2">
			<input
				type="text"
				value={props.newFieldData.label}
				onChange={(e) =>
					props.setNewFieldDetail("label", e.target.value)
				}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						props.addField();
					}
				}}
				className="border-2 border-gray-200 rounded-lg p-2 w-full"
			/>
			<select
				className="border-2 border-gray-200 rounded-lg p-2 w-full"
				onChange={(e) =>
					props.setNewFieldDetail("type", e.target.value)
				}
			>
				<option value="text">Text</option>
				<option value="textarea">Textarea</option>
				<option value="number">Number</option>
				<option value="email">Email</option>
				<option value="password">Password</option>
				<option value="date">Date</option>
				<option value="time">Time</option>
				<option value="checkbox">Checkbox</option>
				<option value="radio">Radio</option>
				<option value="select">Select</option>
				<option value="multi-select">Multiple Select</option>
				<option value="rating">Rating</option>
			</select>
			<input
				type="button"
				value="Add Question"
				onClick={() => {
					props.addField();
				}}
				className="cursor-pointer w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
			/>
		</div>
	);
}

export default AddField;
