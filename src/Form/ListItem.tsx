import { Link } from "raviger";
import React from "react";
import { FormDetails } from "../types";

function FormListItem(props: { form: FormDetails; deleteForm: Function }) {
	return (
		<div
			className="flex flex-row py-2 px-2 items-center justify-center gap-2 border-2 rounded-lg"
			key={props.form.form_id}
		>
			<div className="pb-2 w-full text-center text-xl items-center flex justify-center">
				{props.form.title}
			</div>
			<Link
				title="Fill Form"
				href={`/quiz/${props.form.form_id}`}
				className="flex justify-center items-center cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
			>
				&#10148;
			</Link>
			<Link
				title="Submission Results"
				href={`/quiz/${props.form.form_id}/results`}
				className="cursor-pointer bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
			>
				&#x2633;
			</Link>
			<Link
				title="Edit Form"
				href={`/forms/${props.form.form_id}`}
				className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
			>
				&#9881;
			</Link>

			<input
				title="Delete Form"
				type="button"
				value="&#10006;"
				onClick={() => {
					props.deleteForm(props.form.form_id);
				}}
				className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
			/>
		</div>
	);
}

export default FormListItem;
