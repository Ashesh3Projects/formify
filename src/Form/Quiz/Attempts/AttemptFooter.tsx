import { Link } from "raviger";
import React from "react";

function AttemptFooter() {
	return (
		<Link
			type="button"
			href="/forms"
			className="cursor-pointer flex bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
		>
			Back
		</Link>
	);
}

export default AttemptFooter;
