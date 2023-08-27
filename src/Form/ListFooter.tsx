import { Link } from "raviger";
import React, { Fragment } from "react";

function Footer() {
	return (
		<Fragment>
			<Link
				href="/forms/-1"
				className="cursor-pointer flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
			>
				Add Form
			</Link>
			<div className="pb-3"></div>
			<Link
				type="button"
				href="/"
				className="cursor-pointer flex bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg justify-center w-full"
			>
				Back
			</Link>
		</Fragment>
	);
}

export default Footer;
