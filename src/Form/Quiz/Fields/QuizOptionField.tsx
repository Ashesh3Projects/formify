import React from "react";
import { OptionsField } from "../../../types";
import Multiselect from "multiselect-react-dropdown";

export default function QuizOptionField(props: {
	field: OptionsField;
	setFieldValue: Function;
	setFieldValueOption: Function;
	selectedOptions: number[];
	disabled?: boolean;
	selectedValue?: string;
	keyUpAction: Function;
}) {
	return (
		<>
			{((field: OptionsField) => {
				switch (field.type) {
					case "select":
						return (
							<div className="relative inline-block w-full text-gray-700">
								<select
									id={field.label}
									disabled={props.disabled || false}
									value={props.selectedValue || undefined}
									className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
									onChange={(e) => {
										props.setFieldValue(
											field.field_id,
											e.target.value
										);
									}}
								>
									{field.options.map((option, index) => {
										return (
											<option
												key={index}
												value={option.label}
											>
												{option.label}
											</option>
										);
									})}
								</select>
							</div>
						);
					case "checkbox":
						return (
							<div className="flex flex-wrap flex-col">
								{field.options.map((option) => {
									return (
										<div
											className="flex items-center mr-4 mb-2"
											key={option.option_id}
										>
											<input
												type="checkbox"
												disabled={
													props.disabled || false
												}
												className="opacity-0 absolute h-5 w-5"
												value={option.label}
												checked={props.selectedOptions.includes(
													option.option_id
												)}
												id={String(option.option_id)}
												onChange={(e) => {
													props.setFieldValueOption(
														field.field_id,
														option.option_id,
														e.target.checked
													);
												}}
											/>
											<div className="bg-white border-2 rounded-md border-blue-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
												<svg
													className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
													version="1.1"
													viewBox="0 0 17 12"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g
														fill="none"
														fillRule="evenodd"
													>
														<g
															transform="translate(-9 -11)"
															fill="#1F73F1"
															fillRule="nonzero"
														>
															<path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
														</g>
													</g>
												</svg>
											</div>
											<label
												htmlFor={String(
													option.option_id
												)}
												className="select-none"
											>
												{option.label}
											</label>
										</div>
									);
								})}
							</div>
						);
					case "radio":
						return (
							<div className="flex flex-wrap flex-col">
								{field.options.map((option) => {
									return (
										<div
											className="form-check mr-4 mb-2"
											key={option.option_id}
										>
											<input
												className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
												type="radio"
												disabled={
													props.disabled || false
												}
												checked={
													props.selectedValue ===
													option.label
												}
												name={option.label}
												id={String(option.option_id)}
												onChange={(_) => {
													props.setFieldValue(
														field.field_id,
														option.label
													);
												}}
											/>
											<label
												className="form-check-label inline-block text-gray-800"
												htmlFor={String(
													option.option_id
												)}
											>
												{option.label}
											</label>
										</div>
									);
								})}
							</div>
						);
					case "multi-select":
						return (
							<div className="w-full">
								<Multiselect
									disable={props.disabled || false}
									options={field.options.map((option) => {
										return {
											name: option.label,
											id: option.option_id,
										};
									})}
									showCheckbox={true}
									onSelect={(_, option) =>
										props.setFieldValueOption(
											field.field_id,
											option.id,
											true
										)
									}
									onRemove={(_, option) =>
										props.setFieldValueOption(
											field.field_id,
											option.id,
											false
										)
									}
									displayValue="name"
									selectedValues={field.options
										.map((option) => {
											if (
												props.selectedOptions.includes(
													option.option_id
												)
											)
												return {
													name: option.label,
													id: option.option_id,
												};
											return null;
										})
										.filter((option) => option !== null)}
								/>
							</div>
						);

					default:
						return null;
				}
			})(props.field)}
		</>
	);
}
