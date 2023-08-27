import { Link } from "raviger";
import React from "react";
import { FormDetails, FormField } from "../../types";

function QuizFooter(props: {
	formID: number;
	qIndex: number;
	currentQuestion: FormField;
	formData?: FormDetails;
	setFieldValue: Function;
	submitQuiz: Function;
}) {
	return (
		<>
			{props.currentQuestion && (
				<div className="flex justify-between w-full gap-16">
					{Number(props.qIndex) === 0 && (
						<Link href={`/forms`} className="w-full">
							<button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
								Cancel
							</button>
						</Link>
					)}
					{Number(props.qIndex) > 0 && (
						<Link
							href={`/quiz/${props.formID}?qIndex=${
								Number(props.qIndex) - 1
							}`}
							className="w-full"
						>
							<button className="w-full bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
								Previous
							</button>
						</Link>
					)}
					{Number(props.qIndex) <
						(props.formData?.fields.length || 1) - 1 && (
						<Link
							href={`/quiz/${props.formID}?qIndex=${
								Number(props.qIndex) + 1
							}`}
							className="w-full"
						>
							<button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
								Next
							</button>
						</Link>
					)}
					{Number(props.qIndex) ===
						(props.formData?.fields.length || 1) - 1 && (
						<Link
							href={"#"}
							onClick={() => {
								props.submitQuiz();
							}}
							className="w-full"
						>
							<button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
								Submit
							</button>
						</Link>
					)}
				</div>
			)}
		</>
	);
}

export default QuizFooter;
