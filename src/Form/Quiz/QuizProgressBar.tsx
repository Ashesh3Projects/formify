import React from "react";

function QuizProgress(props: { qIndex: number; totalFields: number }) {
	return (
		<div className="w-full bg-gray-200 rounded-full">
			<div
				className="bg-blue-600 text-sm font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-lg"
				style={{
					width: `${Math.round(
						((props.qIndex + 1) / props.totalFields) * 100
					)}%`,
				}}
			>
				{Math.round(((props.qIndex + 1) / props.totalFields) * 100)}%
			</div>
		</div>
	);
}

export default QuizProgress;
