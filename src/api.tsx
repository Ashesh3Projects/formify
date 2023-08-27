import { FormDetails } from "./types";

interface LoginData {
	email: string;
	password: string;
}

interface RegistrationData {
	name: string;
	email: string;
	password: string;
}

export async function login(data: LoginData): Promise<string> {
	try {
		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const responseData = await response.json();
		if (!response.ok) {
			throw new Error(responseData.error);
		}
		return responseData.token;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function register(data: RegistrationData): Promise<string> {
	try {
		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const responseData = await response.json();
		if (!response.ok) {
			throw new Error(responseData.error);
		}
		return responseData.token;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

const token = localStorage.getItem("token");

export async function getUserData(): Promise<any> {
	const response = await fetch("/api/user", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const user = await response.json();
	return user;
}

export async function saveForm(formData: FormDetails): Promise<void> {
	await fetch("/api/forms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(formData),
	});
}

export async function deleteForm(formid: number): Promise<void> {
	await fetch(`/api/forms/${formid}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export async function getAllForms(): Promise<FormDetails[]> {
	const response = await fetch("/api/forms", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const forms = await response.json();
	return forms;
}

export async function getFormData(formID: number): Promise<FormDetails> {
	const response = await fetch(`/api/forms/${formID}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const form = await response.json();
	return form;
}

export async function updateFormData(formData: FormDetails): Promise<void> {
	await fetch(`/api/forms/${formData.form_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(formData),
	});
}
