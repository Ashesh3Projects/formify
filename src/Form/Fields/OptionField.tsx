import React from "react";
import { OptionsField } from "../../types";

export default function OptionField(props: {
	field: OptionsField;
	setFieldValue: Function;
	removeField: Function;
	setOptionValue: Function;
	removeOption: Function;
	addNewOption: Function;
}) {
	return (
		<>
			<div className="flex w-full">
				<div className="flex flex-col w-full justify-between rounded-lg p-2 border-4 gap-2 px-8 pb-5">
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
							onClick={() =>
								props.removeField(props.field.field_id)
							}
							value="Remove"
						/>
					</div>
					<div className="py-1"></div>
					<div className="px-3 rounded-lg p-2 border-4 gap-2 px-8">
						{props.field.options.map((option) => (
							<div
								className="flex gap-2 py-2"
								key={option.option_id}
							>
								<div className="flex justify-center items-center font-bold text-xl">
									&#8614;
								</div>
								<input
									autoComplete="off"
									type="text"
									value={option.label}
									onChange={(e) =>
										props.setOptionValue(
											props.field.field_id,
											option.option_id,
											e.target.value
										)
									}
									className="border-2 border-gray-200 rounded-lg p-2 w-full"
								/>
								<input
									type="button"
									value="Remove"
									className="cursor-pointer font-bold bg-purple-500 hover:bg-purple-700 text-white rounded-lg px-4"
									onClick={() =>
										props.removeOption(
											props.field.field_id,
											option.option_id
										)
									}
								/>
							</div>
						))}
						<div className="flex gap-1">
							<input
								type="button"
								value="Add Choice"
								onClick={() =>
									props.addNewOption(props.field.field_id)
								}
								className="w-full py-2 cursor-pointer font-bold bg-pink-500 hover:bg-pink-700 text-white rounded-lg px-3"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
