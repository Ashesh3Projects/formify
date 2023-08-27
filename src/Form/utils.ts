import { EffectCallback, useEffect } from "react";
import { FormDetails } from "../types";

import { saveForm, deleteForm, getAllForms, getFormData, updateFormData } from '../api';

export async function saveFormsLocalStorage(forms: FormDetails[]): Promise<void> {
	for (const form of forms) {
		await saveForm(form);
	}
}

export async function deleteFormAndFetch(formid: number): Promise<FormDetails[]> {
	await deleteForm(formid);
	return await getAllForms();
}

export async function fetchAllForms(): Promise<FormDetails[]> {
	return await getAllForms();
}

export async function fetchFormData(formID: number): Promise<FormDetails> {
	if (formID !== -1)
		return await getFormData(formID);
	else return createForm();
}

export async function updateFormAndFetch(formData?: FormDetails): Promise<void> {
	if (!formData) return;
	await updateFormData(formData);
}

export function getRandomID(): number {
	return Number(new Date()) + Math.floor(Math.random() * 100000);
}

export async function createForm(): Promise<FormDetails> {
	let formDetails: FormDetails = {
		form_id: getRandomID(),
		title: "Untitled Form",
		fields: [
			{
				field_id: getRandomID(),
				label: "Name",
				kind: "input",
				type: "text",
				value: "",
			},
			{
				field_id: getRandomID(),
				label: "Phone",
				kind: "input",
				type: "number",
				value: "",
			},
			{
				field_id: getRandomID(),
				label: "Gender",
				kind: "options",
				type: "radio",
				value: "",
				options: [
					{
						option_id: getRandomID(),
						label: "Male",
						selected: false,
					},
					{
						option_id: getRandomID(),
						label: "Female",
						selected: false,
					},
					{
						option_id: getRandomID(),
						label: "Other",
						selected: false,
					},
				],
			},
			{
				field_id: getRandomID(),
				label: "Rate our Form",
				kind: "rating",
				type: "rating",
			},
		],
	};
	await saveForm(formDetails);
	return formDetails;
}


export function getFormattedDate(date: Date) {
	return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

export function useEffectOnlyOnce(func: EffectCallback) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}
